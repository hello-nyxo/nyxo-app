import { P } from 'components/Primitives/Primitives'
import TranslatedText from 'components/TranslatedText'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import colors from 'styles/colors'
import { useNavigation } from '@react-navigation/core'
import ROUTE from 'config/routes/Routes'
import { IconBold } from 'components/iconRegular'
import { useSelector, useDispatch } from 'react-redux'
import { getDataOnboardingCompleted } from '@selectors/OnboardingSelectors'
import { markDataOnboardingCompleted } from '@actions/onboarding/onboarding-actions'

const InitializeSource: FC<{}> = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()
  const onboardingCompleted = useSelector(getDataOnboardingCompleted)
  const handlePress = () => {
    navigate(ROUTE.SETTINGS, { screen: ROUTE.SOURCE_SETTINGS })
    dispatch(markDataOnboardingCompleted())
  }

  if (onboardingCompleted) return <></>

  return (
    <Container>
      <Title>START.TITLE</Title>
      <P>START.DESC</P>

      <ButtonRow>
        <Button onPress={handlePress}>
          <ButtonText>START.BUTTON</ButtonText>
          <Icon
            fill={colors.radiantBlue}
            height="20"
            width="20"
            name="arrowCircleRight"
          />
        </Button>
      </ButtonRow>
    </Container>
  )
}

export default InitializeSource

const Container = styled.View`
  padding: 20px 20px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background-color: ${colors.evening};
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.SHADOW};
`

const Title = styled(TranslatedText)`
  font-size: 21px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_BOLD};
`

const ButtonRow = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: flex-end;
`

const Button = styled.TouchableOpacity`
  flex-direction: row;
`

const ButtonText = styled(TranslatedText)`
  color: ${colors.radiantBlue};
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 15px;
`

const Icon = styled(IconBold)`
  margin-left: 5px;
`
