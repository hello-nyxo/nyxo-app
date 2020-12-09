import config from 'react-native-ultimate-config'

export const CONFIG = {
  REVENUE_CAT: config.REVENUE_CAT,

  SENTRY_DSN: config.SENTRY_DSN,
  CONTENTFUL_SPACE: config.CONTENTFUL_SPACE,
  CONTENTFUL_SPACE_ACCESS_TOKEN: config.CONTENTFUL_ACCESS_TOKEN,

  FITBIT_CONFIG: {
    bundleId: 'com.fitbit.FitbitMobilet',
    clientId: config.FITBIT_ID,
    clientSecret: '',
    redirectUrl: 'nyxo://callback',
    scopes: ['activity', 'sleep'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
      tokenEndpoint: config.FITBIT_TOKEN_ENDPOINT,
      revocationEndpoint: config.FITBIT_REVOCATION_ENDPOINT
    }
  },

  OURA_CONFIG: {
    bundleId: 'com.ouraring.oura',
    clientId: config.OURA_ID,
    clientSecret: '',
    redirectUrl: 'nyxo://callback',
    scopes: ['personal', 'daily'],
    includeBasicAuth: true,
    additionalParameters: {
      state: 'nyxo'
    },
    serviceConfiguration: {
      authorizationEndpoint: 'https://cloud.ouraring.com/oauth/authorize',
      tokenEndpoint: config.OURA_TOKEN_ENDPOINT
    }
  },

  GOOOGLE_FIT_GONFIG_ANDROID: {
    issuer: 'https://accounts.google.com',
    clientId: config.GOOGLE_FIT_ID_ANDROID,
    redirectUrl: config.GOOGLE_FIT_URL_ANDROID,
    scopes: [
      'openid',
      'profile',
      'https://www.googleapis.com/auth/fitness.activity.read',
      'https://www.googleapis.com/auth/fitness.activity.write',
      'https://www.googleapis.com/auth/fitness.sleep.write',
      'https://www.googleapis.com/auth/fitness.sleep.read'
    ]
  },

  GOOOGLE_FIT_GONFIG_IOS: {
    issuer: 'https://accounts.google.com',
    clientId: config.GOOGLE_FIT_ID_IOS,
    redirectUrl: config.GOOGLE_FIT_URL_IOS,
    scopes: [
      'openid',
      'profile',
      'https://www.googleapis.com/auth/fitness.activity.read',
      'https://www.googleapis.com/auth/fitness.activity.write',
      'https://www.googleapis.com/auth/fitness.sleep.write',
      'https://www.googleapis.com/auth/fitness.sleep.read'
    ]
  },

  WITHINGS_CONFIG: {
    bundleId: 'com.withings.wiScaleNG',
    clientId: config.WITHINGS_ID,
    clientSecret: '',
    redirectUrl: 'nyxo://callback',
    scopes: ['user.activity'],
    serviceConfiguration: {
      authorizationEndpoint:
        'https://account.withings.com/oauth2_user/authorize2',
      tokenEndpoint: config.WITHINGS_TOKEN_ENDPOINT,
      revocationEndpoint: config.WITHINGS_REVOCATION_ENDPOINT
    }
  },

  GARMIN_CONFIG: {
    bundleId: 'com.garmin.connect.mobile',
    redirectUrl: 'nyxo://callback',
    REQUEST_TOKEN_ENDPOINT: config.GARMIN_REQUEST_TOKEN_ENDPOINT,
    ACCESS_TOKEN_ENDPOINT: config.GARMIN_ACCESS_TOKEN_ENDPOINT,
    GET_SLEEP_ENDPOINT: config.GARMIN_GET_SLEEP_ENDPOINT
  },

  POLAR_CONFIG: {
    bundleId: 'com.polar.mobile',
    clientId: config.POLAR_ID,
    clientSecret: '',
    redirectUrl: 'nyxo://callback',
    scopes: ['accesslink.read_all'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://flow.polar.com/oauth2/authorization',
      tokenEndpoint: config.POLAR_TOKEN_ENDPOINT
    }
  },

  LINK_VALIDATION_URL: config.LINK_CODE_URL,

  PRIVACY_LINK: 'https://nyxo.app/privacy/',
  TERMS_LINK: 'https://nyxo.app/terms/',

  MANAGE_IOS:
    'https://buy.itunes.apple.com/WebObjects/MZFinance.woa/wa/manageSubscriptions',
  MANAGE_ANDROID:
    'https://play.google.com/store/account/subscriptions?package=fi.nyxo.app&sku=YOUR_PRODUCT_ID',

  INSTAGRAM_LINK: '',
  FACEBOOK_LINK: '',
  LINKEDIN_LINK: '',
  TWITTER_LINK: '',

  SUBSCRIPTION_ENTITLEMENT_KEY: 'Nyxo Coaching'
}

export default CONFIG
