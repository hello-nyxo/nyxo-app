import { register } from '@actions/auth/auth-actions'
import ROUTE from '@config/routes/Routes'
import { RegisterView } from '@views/RegisterView'
import React, { FC, memo } from 'react'
import { useDispatch } from 'react-redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@typings/navigation/navigation'

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTE.APP
>

type Props = {
  navigation: RegisterScreenNavigationProp
}

const Register: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch()
  const signup = async (email: string, password: string) => {
    dispatch(register(email, password, back))
  }

  const goToLogin = () => {
    navigation.navigate(ROUTE.AUTH, { screen: ROUTE.LOGIN })
  }

  const back = () => {
    navigation.navigate(ROUTE.APP)
  }

  return <RegisterView goToLogin={goToLogin} register={signup} back={back} />
}

export default memo(Register)
