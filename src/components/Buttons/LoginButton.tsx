import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { PrimaryButton } from './PrimaryButton'
import ROUTE from '../../config/routes/Routes'

const Login = () => {
  const navigation = useNavigation()

  const navigateToLogin = () => {
    navigation.navigate('Auth', { screen: ROUTE.LOGIN })
  }

  return <PrimaryButton title="Sign in" onPress={navigateToLogin} />
}

export default Login
