# This file contains the required structure for .env file to work.

## Revenue Cat
- Set up your Revenue Cat account and retrieve the public SDK key. More information at: https://docs.revenuecat.com/docs/getting-started

```
REVENUE_CAT={PUBLIC_SDK_KEY}
```

## Sentry
- Set up your Sentry account and retrieve your Sentry DSN. More information at: https://docs.sentry.io/platforms/react-native/

```
SENTRY_DSN={YOUR_SENTRY_DSN}
```

## Contentful
- You don't have to manage this part as we provide our testing account, which includes contents and lessons. More information at: https://www.contentful.com/`

```
CONTENTFUL_SPACE=2bj8pq0ood89
CONTENTFUL_ACCESS_TOKEN=7yCg2oVBg-kQAhPrNTI0935HDiUJ7FYlUyIwM3Tspgg
```

## Fitbit, Withings, Oura, Google Fit, Garmin, Polar
- Set up your developer accounts at mentioned sleep-tracking companies and get your according client ID. We're using react-native-app-auth to handle oauth2 authorization, therefore, you should have a token endpoint, as well as a revocation endpoint (if possible) in order to properly handle requests. Our suggestion is to use AWS Lambda & Gateway API.

Find more information about how to use Fitbit API at: https://dev.fitbit.com/build/reference/web-api/

```
FITBIT_ID={CLIENT_ID}
FITBIT_TOKEN_ENDPOINT={YOUR_SETUP_ENDPOINT}
FITBIT_REVOCATION_ENDPOINT={YOUR_SETUP_ENDPOINT}
```

### Withings
Find more information about how to use Withings API at: https://developer.withings.com/oauth2/

```
WITHINGS_ID={CLIENT_ID}
WITHINGS_TOKEN_ENDPOINT={YOUR_SETUP_ENDPOINT}
WITHINGS_REVOCATION_ENDPOINT={YOUR_SETUP_ENDPOINT}
```

### Oura
Find more information about how to Oura at: https://cloud.ouraring.com/docs/. Notice: Oura doesn't provide revocation so there is none REVOCATION_ENDPOINT required

```
OURA_ID={CLIENT_ID}
OURA_TOKEN_ENDPOINT={YOUR_SETUP_ENDPOINT}
```

### Google Fit
Find more information about how to Google Fit at: https://developers.google.com/fit

```
GOOGLE_FIT_URL_ANDROID={YOUR_PROVIDED_ANDROID_URL}
GOOGLE_FIT_ID_ANDROID={YOUR_PROVIDED_ANDROID_ID}

GOOGLE_FIT_URL_IOS={YOUR_PROVIDED_IOS_URL}
GOOGLE_FIT_ID_IOS={YOUR_PROVIDED_IOS_ID}
```

### Garmin
Find more information about how to use Garmin API at: https://developer.garmin.com/. Notice: Garmin is using Oauth 1.0 and you should let Garmin review and accept your registered account as developer in order to access their internal API docs.

```
GARMIN_ID={CLIENT_ID}
GARMIN_REQUEST_TOKEN_ENDPOINT={YOUR_SETUP_ENDPOINT_FOR_AUTHENTICATION_GATE}
GARMIN_ACCESS_TOKEN_ENDPOINT={YOUR_SETUP_ENDPOINT_FOR_ACCESS_TOKEN}
GARMIN_GET_SLEEP_ENDPOINT={YOUR_SETUP_ENDPOINT_FOR_GET_SLEEP_DATA}
```

### Polar
Find more information about how to Polar at: https://www.polar.com/accesslink-api/#polar-accesslink-api. Notice: Polar doesn't provide revocation.

```
POLAR_ID={CLIENT_ID}
POLAR_TOKEN_ENDPOINT={YOUR_SETUP_ENDPOINT}
```

### Intercom 
- We're using Intercom to provide our chat service to our clients. Thus, you should get yourself a Intercom developer account to achive according iOS/Android sdk keys and an app Id

```
INTERCOM_KEY_IOS={YOUR_PROVIDED_IOS_SDK_KEY}
INTERCOM_KEY_ANDROID={YOUR_PROVIDED_ANDROID_SDK_KEY}
INTERCOM_ID={YOUR_APP_ID}
```
