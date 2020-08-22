import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import styled from 'styled-components/native'
import ROUTE from '../../config/routes/Routes'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { Container, P } from '../Primitives/Primitives'

const ProfileSignup = () => {
  const navigation = useNavigation()

  const navigate = () => {
    navigation.navigate('Auth', { screen: ROUTE.REGISTER })
  }

  return (
    <Container style={{ marginVertical: 20 }}>
      <Info>WHY_REGISTER</Info>
      <PrimaryButton title="CREATE_ACCOUNT_BUTTON" onPress={navigate} />
    </Container>
  )
}

export default memo(ProfileSignup)

const Info = styled(P)`
  margin-bottom: 20px;
`
