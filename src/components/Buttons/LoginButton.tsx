import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/core'
import { PrimaryButton } from './PrimaryButton'

const Login: FC = () => {
  const navigation = useNavigation<any>()

  const navigateToLogin = () => {
    navigation.navigate('Auth', { screen: 'Login' })
  }

  return <PrimaryButton title="Sign in" onPress={navigateToLogin} />
}

export default Login
