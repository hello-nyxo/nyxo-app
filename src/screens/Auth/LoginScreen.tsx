import { login } from '@actions/auth/auth-actions'
import ROUTE from '@config/routes/Routes'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@typings/navigation/navigation'
import LoginView from '@views/LoginView'
import React, { FC, memo } from 'react'
import { useDispatch } from 'react-redux'

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>

type Props = {
  navigation: RegisterScreenNavigationProp
}

const Register: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch()

  const handleLogin = async (email: string, password: string) => {
    dispatch(login(email, password, back))
  }

  const goToRegister = () => {
    navigation.navigate(ROUTE.REGISTER)
  }

  const back = () => {
    navigation.navigate(ROUTE.APP)
  }

  return (
    <LoginView goToRegister={goToRegister} login={handleLogin} back={back} />
  )
}

export default memo(Register)
