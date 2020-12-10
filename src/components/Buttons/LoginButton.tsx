import React, { FC } from 'react'
import { useNavigation } from '@react-navigation/core'
import { PrimaryButton } from './PrimaryButton'
import ROUTE from '../../config/routes/Routes'

const Login: FC = () => {
  const navigation = useNavigation()

  const navigateToLogin = () => {
    navigation.navigate(ROUTE.AUTH, { screen: ROUTE.LOGIN })
  }

  return <PrimaryButton title="Sign in" onPress={navigateToLogin} />
}

export default Login
