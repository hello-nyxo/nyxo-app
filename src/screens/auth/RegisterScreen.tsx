import ROUTE from '@config/routes/Routes'
import { useAppDispatch } from '@hooks/redux'
import { StackNavigationProp } from '@react-navigation/stack'
import { register } from '@reducers/auth'
import { RootStackParamList } from '@typings/navigation/navigation'
import { RegisterView } from '@views/RegisterView'
import React, { FC, memo } from 'react'

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList[ROUTE.AUTH],
  ROUTE.REGISTER
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
    navigation.navigate(ROUTE.LOGIN)
  }

  const back = () => {
    navigation.navigate(ROUTE.APP)
  }

  return <RegisterView goToLogin={goToLogin} register={signup} back={back} />
}

export default memo(Register)
