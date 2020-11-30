import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { resendEmail } from '@actions/auth/auth-actions'
import BackToAppButton from '@components/Buttons/BackToAppButton'
import BottomButton from '@components/Buttons/BottomButton'
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import {
  Container,
  H1,
  P,
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import TopInfo from '@components/TopInfo'
import { getEmail } from '@selectors/UserSelectors'

interface Props {
  navigation: any
}
const ConfirmationScreen: FC<Props> = (props) => {
  const email = useSelector(getEmail)
  const dispatch = useDispatch()

  const confirmUser = async () => {
    await props.navigation.navigate('Login')
  }

  const resendCode = async () => {
    await dispatch(resendEmail(email))
  }

  return (
    <SafeAreaView>
      <TopInfo />
      <StyledScrollView>
        <Container>
          <H1>CONFIRM_ACCOUNT</H1>
          <P>HOW_TO_CONFIRM</P>

          <Spacer>
            <PrimaryButton onPress={resendCode} title="RESEND_EMAIL" />
          </Spacer>
        </Container>

        <Container>
          <P>ALREADY_CONFIRMED</P>
        </Container>

        <BottomButton
          onPress={confirmUser}
          disabled={false}
          title="BACK_TO_SIGNIN"
        />
      </StyledScrollView>
      <BackToAppButton />
    </SafeAreaView>
  )
}

export default ConfirmationScreen

const Spacer = styled.View`
  margin: 30px 0px;
`
