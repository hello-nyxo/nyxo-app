/* eslint-disable @typescript-eslint/no-var-requires */
/* Amplify Params - DO NOT EDIT
	API_NYXODEV_GRAPHQLAPIENDPOINTOUTPUT
	API_NYXODEV_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const https = require('https')
const AWS = require('aws-sdk')
const subWeeks = require('date-fns/subWeeks')
const format = require('date-fns/format')
const urlParse = require('url').URL

const appsyncUrl = process.env.API_NYXODEV_GRAPHQLAPIENDPOINTOUTPUT
const region = process.env.REGION
const endpoint = new urlParse(appsyncUrl).hostname.toString()
const apiKey = process.env.API_NYXODEV_GRAPHQLAPIIDOUTPUT

const listSleep = `
	query listNights($userId: ID!, $start: String!, $end: String!) {
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

  const item = {
    input: {
      userId: 'a22113d5-64a4-422e-b290-327f49dd2c4a',
      start: format(subWeeks(new Date(2014, 1, 11), 1), 'yyyy-MM-dd'),
      end: format(new Date(), 'yyyy-MM-dd')
    }
  }

  req.method = 'POST'
  req.path = '/graphql'
  req.headers.host = endpoint
  req.headers['Content-Type'] = 'application/json'
  req.body = JSON.stringify({
    query: listSleep,
    operationName: 'listNights',
    variables: item
  })

  const signer = new AWS.Signers.V4(req, 'appsync', true)
  signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate())

  const data = await new Promise((resolve, reject) => {
    const httpRequest = https.request({ ...req, host: endpoint }, (result) => {
      result.on('data', (responseData) => {
        resolve(JSON.parse(responseData.toString()))
      })
    })

    httpRequest.write(req.body)
    httpRequest.end()
  })

  callback(null, {
    socialJetLag: calculateSocialJetLagScore(),
    duration: calculateDurationScore(),
    efficiency: calculateEfficiencyScore(),
    timing: calculateTimingScore()
  })
}

// EFFICIENCY
const calculateEfficiencyScore = (nights) => {
  return 80
}

// DURATION

const calculateDurationScore = (nights) => {
  return 80
}

// TIMING

const calculateTimingScore = (nights) => {
  return 80
}

// JETLAG

const calculateSocialJetLagScore = (nights) => {
  return 60
}
