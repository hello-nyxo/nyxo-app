import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import { useNavigation } from '@react-navigation/native'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { Container, P } from '../Primitives/Primitives'

const perks = [
  {
    text: 'WHY_SIGNUP.BACKUP'
  },
  {
    text: 'WHY_SIGNUP.SAVE_COACHING_PROGRESS'
  },
  {
    text: 'WHY_SIGNUP.ACCESS_FROM_COMPUTER'
  },
  {
    text: 'WHY_SIGNUP.SHARE'
  }
]

const ProfileSignup: FC = () => {
  const navigation = useNavigation()

  const navigate = () => {
    navigation.navigate('Auth', { screen: 'Register' })
  }
  const navigateToSignIn = () => {
    navigation.navigate('Auth', { screen: 'Login' })
  }

  return (
    <SignupContainer>
      <Info>WHY_REGISTER</Info>

      <PerksList>
        {perks.map((perk) => (
          <Perk key={perk.text}>
            <Icon name="checkMark" height={15} width={15} />
            <PerkText>{perk.text}</PerkText>
          </Perk>
        ))}
      </PerksList>
      <PrimaryButton title="CREATE_ACCOUNT_BUTTON" onPress={navigate} />
      <LoginButton onPress={navigateToSignIn}>MOVE_TO_SIGNIN</LoginButton>
    </SignupContainer>
  )
}

export default ProfileSignup

const Info = styled(P)`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const SignupContainer = styled(Container)`
  margin: 0px 16px;
`
const LoginButton = styled(TranslatedText)`
  margin-top: 30px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  text-align: center;
  font-size: 15px;
  color: ${({ theme }) => theme.accent};
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.accent
}))`
  margin-right: 10px;
`

const PerksList = styled.View`
  margin: 16px 32px 32px 0px;
  flex: 1;
`

const Perk = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`

const PerkText = styled(TranslatedText)`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 15px;
`
