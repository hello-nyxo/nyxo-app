import { AppRegistry, SafeAreaView } from 'react-native'
import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { CONFIG } from '@config/Config'
import { AppClip } from './src/AppClip'
import { lightTheme } from './src/styles/themes'

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

const NyxoAppClip = () => (
  <SafeAreaView>
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <AppClip />
      </ThemeProvider>
    </ApolloProvider>
  </SafeAreaView>
)

AppRegistry.registerComponent('AppClip', () => NyxoAppClip)
