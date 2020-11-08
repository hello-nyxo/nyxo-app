import CoachingMonthCard from '@components/CoachingMonthCard/CoachingMonthCard'
import BuyCoachingButton from '@components/CoachingSpecific/BuyCoachingButton'
import TranslatedText from '@components/TranslatedText'
import ROUTE from '@config/routes/Routes'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { useNavigation } from '@react-navigation/native'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import colors from '@styles/colors'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { Container, H3, PageTitle } from '../Primitives/Primitives'

const CoachingHeader: FC = () => {
  const { data: activeMonth } = useGetActiveCoaching()
  const hasActiveCoaching = useSelector(getActiveCoaching)
  const { navigate } = useNavigation()

  const openCoachingSettings = () => {
    navigate(ROUTE.APP, {
      screen: ROUTE.SETTINGS,
      params: { screen: ROUTE.COACHING_SETTINGS }
    })
  }

  return (
    <>
      <PageTitle>Coaching</PageTitle>
      <Container>{!hasActiveCoaching && <BuyCoachingButton />}</Container>
      {activeMonth ? (
        <>
          <Title>Active Coaching</Title>
          <CoachingMonthCard actionsEnabled={false} month={activeMonth} />
          <ModifyContainer>
            <ModifyButton onPress={openCoachingSettings}>
              <ButtonText>COACHING.CHANGE</ButtonText>
            </ModifyButton>
          </ModifyContainer>
        </>
      ) : null}
      <Container>
        <H3>COACHING_WEEKS</H3>
      </Container>
    </>
  )
}

export default CoachingHeader

const Title = styled.Text`
  margin: 16px 16px 8px;
  text-transform: uppercase;
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_BOLD};
`

const ModifyButton = styled.TouchableOpacity`
  padding: 8px 16px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
`

const ModifyContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

const ButtonText = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${colors.radiantBlue};
  font-size: 15px;
`
