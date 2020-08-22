import React from 'react'
import { View } from 'react-native'
import { PrimaryButton } from '../../components/Buttons/PrimaryButton'
import { P, Row, SafeAreaView } from '../../components/Primitives/Primitives'

interface LoginOrRegisterProps {
  navigation: {}
}

const LoginOrRegister = (props: LoginOrRegisterProps) => {
  return (
    <SafeAreaView forceInset={{ bottom: 'never' }}>
      <View>
        <P>NOT_LOGGED_IN_DISCLAIMER</P>
        <Row>
          <PrimaryButton
            title="Sign in"
            onPress={() => props.navigation.navigate('SignIn')}
          />
          <PrimaryButton
            title="Register"
            onPress={() => props.navigation.navigate('Register')}
          />
        </Row>
      </View>
    </SafeAreaView>
  )
}

export default LoginOrRegister
