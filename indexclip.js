import { AppRegistry, SafeAreaView } from 'react-native'
import React from 'react'
import { ThemeProvider } from 'styled-components/native'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { AppClip } from './src/AppClip'
import { lightTheme } from './src/styles/themes'

const TOKEN = 'dItO0o2BOR53HD0jSFB9HHBw3SfIk8b8Pu9ZwEt09AM'
const SPACE = '2bj8pq0ood89'

const client = new ApolloClient({
  uri: 'https://graphql.contentful.com/content/v1/spaces/2bj8pq0ood89',
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
