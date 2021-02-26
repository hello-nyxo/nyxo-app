/* Amplify Params - DO NOT EDIT
	AUTH_NYXODEV_USERPOOLID
Amplify Params - DO NOT EDIT */
const Handlebars = require("handlebars")
const fs = require("fs")
var aws = require("aws-sdk")
var ses = new aws.SES({ region: "eu-central-1" })

exports.handler = (event, context, callback) => {
  const template = fs.readFileSync("./email.html").toString()

  if (event.request.userAttributes.hasOwnProperty("email")) {
    event.response.autoConfirmUser = true
    //  event.response.autoVerifyEmail = true;

    const body = Handlebars.compile(template)({
      email: event.request.userAttributes.email,
    })

    const params = {
      Destination: {
        ToAddresses: [event.request.userAttributes.email],
      },
      Message: {
        Body: {
          Html: {
            Data: body,
          },
        },

        Subject: { Data: "👋 Hello from Nyxo" },
      },
      Source: "Nyxo <welcome@nyxo.fi>",
    }

    ses.sendEmail(params, function (err, data) {
      if (err) {
        console.log(err)
        context.fail(err)
      } else {
        console.log(data)
        context.succeed(event)
      }
    })

    callback(null, event)
  }
}
