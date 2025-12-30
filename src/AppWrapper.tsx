import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink
} from '@apollo/client'
import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import CONFIG from '@config/Config'
import App from './App'
import { persistor, store } from '@store/store'

const TOKEN = CONFIG.CONTENTFUL_SPACE_ACCESS_TOKEN
const SPACE = CONFIG.CONTENTFUL_SPACE

const httpLink = new HttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
  headers: {
    authorization: `Bearer ${TOKEN}`,
    'Content-Language': 'en-us'
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export const AppWrapper: FC = () => {
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
