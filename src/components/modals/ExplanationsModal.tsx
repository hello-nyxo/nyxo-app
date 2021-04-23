import { IconBold } from '@components/iconRegular'
import { CloseModalButton } from '@components/modals/CloseModalButton'
import { H2 } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import getRating from '@helpers/rating'
import { toNightTime } from '@helpers/time'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import colors from '@styles/colors'
import { fonts } from '@styles/themes'
import { format, parseISO } from 'date-fns'
import React, { FC } from 'react'
import RNModal, { ModalProps, ReactNativeModal } from 'react-native-modal'
import styled from 'styled-components/native'

const ExplanationsModal: FC = () => {
  const dispatch = useAppDispatch()
  const isVisible = useAppSelector((state) => state.modal.explanations)
  const inbed = '' //minutesToHoursString(useAppSelector(getInBedDuration))
  const asleep = '' //minutesToHoursString(useAppSelector(getAsleepDuration))
  const rating = 2 // = useAppSelector(getSelectedDayRating)
  const { color, icon } = getRating(rating)
  const date = useAppSelector((state) => state.calendar.selectedDay)
  const formattedDate = toNightTime(date)
  const windowStart = new Date().toISOString() // useAppSelector(getGoToSleepWindowStart)
  const windowEnd = new Date().toISOString() //useAppSelector(getGoToSleepWindowEnd)

  const stats = [
    {
      title: 'STAT.BED',
      explanation: 'STAT.BED_EXPLANATION',
      figure: inbed,
      color: colors.darkBlue
    },
    {
      title: 'STAT.SLEEP',
      explanation: 'STAT.SLEEP_EXPLANATION',
      figure: asleep,
      color: colors.darkBlue
    },
    {
      title: 'STAT.WINDOW',
      explanation: 'STAT.WINDOW_EXPLANATION',
      figure: `${format(parseISO(windowStart), 'HH:mm')} – ${format(
        parseISO(windowEnd),
        'HH:mm'
      )}`,
      color: colors.fallAsleep
    },
    {
      title: 'STAT.RATING',
      explanation: 'STAT.RATING_EXPLANATION',
      figure: <Icon fill={color} name={icon} height={20} width={20} />,
      color
    }
  ]

  const closeModal = () => {
    dispatch(toggleExplanationsModal(false))
  }

  return (
    <StyledModal
      isVisible={isVisible}
      transparent={false}
      onSwipeComplete={closeModal}
      onRequestClose={closeModal}
      presentationStyle="pageSheet"
      hideModalContentWhileAnimating
      animationType="slide">
      <Container>
        <TitleRow>
          <Column>
            <H2>STAT.TITLE</H2>
            <SubTitle variables={{ night: formattedDate }}>STAT.NIGHT</SubTitle>
          </Column>
          <CloseModalButton closeModal={closeModal} />
        </TitleRow>

        {stats.map((item) => (
          <Item key={item.title} color={item.color}>
            <Row>
              <Dot color={item.color} />
              <Column>
                <Title>{item.title}</Title>
                {typeof item.figure === 'string' ? (
                  <Figure>{item.figure}</Figure>
                ) : (
                  item.figure
                )}
              </Column>
            </Row>
            <Row>
              <ExplanationText>{item.explanation}</ExplanationText>
            </Row>
          </Item>
        ))}
      </Container>
    </StyledModal>
  )
}

export default ExplanationsModal

const StyledModal = styled(
  RNModal as new (props: ModalProps) => ReactNativeModal
)`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  flex: 1;
  margin: 0px;
`

const Item = styled.View<DotProps>`
  flex-direction: column;
  border-left-color: ${({ color }) => color || 'black'};
  margin-bottom: 30px;
`

interface DotProps {
  color?: string
}

const Dot = styled.View<DotProps>`
  width: 10px;
  height: 100%;
  border-radius: 5px;
  background-color: ${({ color }) => color || 'black'};
  margin-right: 10px;
`

const Row = styled.View`
  width: 100%;
  flex-direction: row;
`

const ExplanationText = styled(TranslatedText)`
  font-size: 13px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-top: 10px;
  margin-left: 20px;
`

const Column = styled.View`
  flex: 1;
`

const Title = styled(TranslatedText)`
  text-transform: uppercase;
  font-size: 15px;
  margin-bottom: 5px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Figure = styled.Text`
  text-transform: uppercase;
  font-size: 15px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Container = styled.ScrollView`
  flex: 1;
  padding: 16px;
`

const SubTitle = styled(TranslatedText)`
  text-transform: uppercase;
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 80px;
`

const Icon = styled(IconBold).attrs(({ fill, theme }) => ({
  fill: fill || theme.SECONDARY_TEXT_COLOR
}))``
