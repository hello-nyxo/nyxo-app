import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import React, { FC } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { CONFIG } from '@config/config'
import App from './App'
import { persistor, store } from '@store/store'

const TOKEN = CONFIG.CONTENTFUL_SPACE_ACCESS_TOKEN
const SPACE = CONFIG.CONTENTFUL_SPACE

const client = new ApolloClient({
  uri: `https://graphql.contentful.com/content/v1/spaces/${SPACE}`,
  headers: {
    authorization: `Bearer ${TOKEN}`,
    'Content-Language': 'en-us'
  },
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
