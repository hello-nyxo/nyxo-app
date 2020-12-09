/* eslint-disable @typescript-eslint/no-var-requires */
/* Amplify Params - DO NOT EDIT
	API_NYXODEV_GRAPHQLAPIENDPOINTOUTPUT
	API_NYXODEV_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const https = require("https")
const AWS = require("aws-sdk")
const subWeeks = require("date-fns/subWeeks")
const format = require("date-fns/format")
const urlParse = require("url").URL
import { scaleLinear } from "d3"

const appsyncUrl = process.env.API_NYXODEV_GRAPHQLAPIENDPOINTOUTPUT
const region = "eu-central-1" //process.env.REGION
const endpoint = new urlParse(appsyncUrl).hostname.toString()
const apiKey = process.env.API_NYXODEV_GRAPHQLAPIIDOUTPUT

const listSleep = `
	query listNights($userId: ID!, $start: String!, $end: String!) {
		getUser(id: $userId) {
			primaryDeviceID
		}
		listNights(
			filter: {				
				userId: { eq: $userId }
				startDate: { between: [$start, $end] }
			}
		) {
			items {
				startDate
				sourceId
				totalDuration
				endDate
				value
			}
		}
	}
`

exports.handler = async (event, context, callback) => {
  const req = new AWS.HttpRequest(appsyncUrl, region)

  console.log(event, context)

  const input = {
    userId: event.identity.username,
    start: format(subWeeks(new Date(2014, 1, 11), 1), "yyyy-MM-dd"),
    end: format(new Date(), "yyyy-MM-dd"),
  }

  req.method = "POST"
  req.path = "/graphql"
  req.headers.host = endpoint
  req.headers["Content-Type"] = "application/json"
  req.body = JSON.stringify({
    query: listSleep,
    operationName: "listNights",
    variables: input,
  })

  const signer = new AWS.Signers.V4(req, "appsync", true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

  const { data } = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on("data", (responseData) => {
        resolve(JSON.parse(responseData.toString()))
      })
    })

    httpRequest.write(req.body)
    httpRequest.end()
  })

  const socialJetLag = await calculateSocialJetLagScore(data.listNights.items)

  callback(null, {
    socialJetLag: socialJetLag,
    duration: await calculateDurationScore(),
    efficiency: await calculateEfficiencyScore(),
    timing: await calculateTimingScore(),
  })
}

// EFFICIENCY
const calculateEfficiencyScore = async (nights) => {
  if (nights && nights.length !== 0) {
    return 10
  }
  return 0
}

// DURATION

const calculateDurationScore = async (nights) => {
  if (nights && nights.length !== 0) {
    const durationScale = scaleLinear()
      .domain([0, 359, 360, 480])
      .range([0, 0, 50, 100])
      .clamp(true)

    return 10
  }
  return 0
}

// TIMING

const calculateTimingScore = async (nights) => {
  if (nights && nights.length !== 0) {
    return 10
  }
  return 0
}

// JETLAG

const calculateSocialJetLagScore = async (nights) => {
  if (nights && nights.length !== 0) {
    return 10
  }
  return 0
}
