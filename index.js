import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CONFIG } from '@config/Config'
import App from './src/App'
import { persistor, store } from './src/store'

const TOKEN = CONFIG.CONTENTFUL_SPACE_ACCESS_TOKEN
const SPACE = CONFIG.CONTENTFUL_SPACE

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
  headers: {
    authorization: `Bearer ${TOKEN}`,
    'Content-Language': 'en-us'
  },
  opts: {
    credentials: 'same-origin'
  },
  cache: new InMemoryCache()
})

const Index = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ApolloProvider>
  )
}

AppRegistry.registerComponent('Nyxo', () => Index)
