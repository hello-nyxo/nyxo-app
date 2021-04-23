import CoachingMonthCard from '@components/CoachingMonthCard/CoachingMonthCard'
import BuyCoachingButton from '@components/CoachingSpecific/BuyCoachingButton'
import TranslatedText from '@components/TranslatedText'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { useAppSelector } from '@hooks/redux'
import { useNavigation } from '@react-navigation/native'
import { CoachingScreenNavigationProp } from '@screens/coaching/CoachingView'
import colors from '@styles/colors'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Container, H3, PageTitle } from '../Primitives/Primitives'
import CoachingNotStarted from './CoachingNotStarted'

const CoachingHeader: FC = () => {
  const { data: activeMonth } = useGetActiveCoaching()
  const hasActiveCoaching = useAppSelector(
    (state) => state.subscription.isActive
  )
  const { navigate } = useNavigation<CoachingScreenNavigationProp>()

  const openCoachingSettings = () => {
    navigate('App', {
      screen: 'Settings',
      params: { screen: 'Coaching' }
    })
  }

  return (
    <>
      <PageTitle>Coaching</PageTitle>
      <Container>{!hasActiveCoaching && <BuyCoachingButton />}</Container>
      {activeMonth ? (
        <>
          <CoachingMonthCard actionsEnabled={false} month={activeMonth} />
          <ModifyContainer>
            <ModifyButton onPress={openCoachingSettings}>
              <ButtonText>COACHING.CHANGE</ButtonText>
            </ModifyButton>
          </ModifyContainer>
        </>
      ) : null}
      <CoachingNotStarted />

      <Container>
        <H3>COACHING_WEEKS</H3>
      </Container>
    </>
  )
}

export default CoachingHeader

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
  color: ${colors.darkBlue};
  font-size: 15px;
`
