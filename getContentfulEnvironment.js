/* eslint-disable func-names */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import config from 'react-native-ultimate-config'

const contentfulManagement = require('contentful-management')

module.exports = function () {
  const contentfulClient = contentfulManagement.createClient({
    accessToken: config.CONTENTFUL_ACCESS_TOKEN
  })

  return contentfulClient
    .getSpace(config.CONTENTFUL_SPACE)
    .then((space) => space.getEnvironment('master'))
}
