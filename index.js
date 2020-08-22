import React from 'react'
import { AppRegistry } from 'react-native'
import 'react-native-gesture-handler'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import App from './src/App'
import { persistor, store } from './src/store'
import 'react-native-get-random-values'

const Index = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

AppRegistry.registerComponent('Nyxo', () => Index)
