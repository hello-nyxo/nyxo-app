import { useAppDispatch } from '@hooks/redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { register } from '@reducers/auth'
import { RootStackParamList } from '@typings/navigation/navigation'
import { RegisterView } from '@views/RegisterView'
import React, { FC, memo } from 'react'

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList['Auth'],
  'Register'
>

type Props = {
  navigation: RegisterScreenNavigationProp
}

const Register: FC<Props> = ({ navigation }) => {
  const dispatch = useAppDispatch()

  const signup = async (email: string, password: string) => {
    dispatch(register({ email, password })).then(() => {
      back()
    })
  }

  const goToLogin = () => {
    navigation.navigate('Login')
  }

  const back = () => {
    navigation.navigate('App')
  }

  return <RegisterView goToLogin={goToLogin} register={signup} back={back} />
}

export default memo(Register)
