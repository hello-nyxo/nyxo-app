import { addHabit } from '@actions/habit/habit-actions'
import { CloseModalButton } from '@components/modals/CloseModalButton'
import RichText from '@components/RichText'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { Document } from '@contentful/rich-text-types'
import { WIDTH } from '@helpers/Dimensions'
import { useAppDispatch } from '@hooks/redux'
import { fonts } from '@styles/themes'
import { Period } from '@typings/state/Periods'
import React, { FC, memo, useState } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'
import { Container, StyledModal } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'
import { getIcon } from './TopRow'

export const EXAMPLE_HABIT_WIDTH = WIDTH - 60
export const EXAMPLE_HABIT_MARGIN_LEFT = 20

type Props = {
  title?: string
  period?: string
  description?: Document
}

const ExampleHabit: FC<Props> = ({
  title = 'Custom Habit',
  period = Period.morning,
  description
}) => {
  const dispatch = useAppDispatch()
  const [show, setShow] = useState(false)
  const [habitAdded, setHabitAdded] = useState(false)

  const createHabit = async () => {
    await dispatch(
      addHabit(
        title,
        documentToPlainTextString(description as Document),
        period as Period
      )
    )
    await setHabitAdded(true)
  }

  const toggleModal = () => {
    setShow(!show)
  }

  if (!title || !period || !description) return null
  const { color, icon } = getIcon(period)

  return (
    <>
      <Habit>
        <Row>
          <Icon name={icon} height={20} width={20} fill={color} />
          <TimePeriod>{`HABIT.EVERY_${period.toUpperCase()}`}</TimePeriod>
        </Row>

        <Title>{title}</Title>

        <Buttons>
          <ReadMoreButton onPress={toggleModal}>
            <QuestionIcon name="questionMarkCircle" height={16} width={16} />
            <ReadMore>READ_MORE</ReadMore>
          </ReadMoreButton>

          <AddHabit disabled={habitAdded} onPress={createHabit}>
            <AddHabitText>
              {habitAdded ? 'HABIT_ADDED' : 'ADD_HABIT'}
            </AddHabitText>
          </AddHabit>
        </Buttons>
      </Habit>
      <StyledModal hideModalContentWhileAnimating isVisible={show}>
        <Container>
          <CloseButtonContainer>
            <CloseModalButton closeModal={toggleModal} />
          </CloseButtonContainer>
          <ModalTitle>{title}</ModalTitle>
          <ScrollView>
            <RichText content={description} />
          </ScrollView>
        </Container>
      </StyledModal>
    </>
  )
}

export default memo(ExampleHabit)

const Habit = styled.View`
  padding: 20px;
  margin-left: 20px;
  flex: 1;
  width: ${WIDTH - 60}px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: 1px 1px 15px rgba(32, 33, 37, 0.1);
  border-radius: 5px;
`

const TimePeriod = styled(TranslatedText)`
  font-size: 13px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  margin-left: 10px;
`

const Title = styled.Text`
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 21px;
  margin: 10px 0px;
`

const ModalTitle = styled.Text`
  font-family: ${fonts.bold};
  margin: 30px 0px 40px;
  font-size: 21px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`

const Icon = styled(IconBold)``

const ReadMore = styled(TranslatedText)`
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 15px;
  margin-left: 10px;
`

const ReadMoreButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 10px 0px;
`

const Buttons = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const QuestionIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))``

const AddHabit = styled.TouchableOpacity``

const AddHabitText = styled(TranslatedText)`
  color: ${colors.darkBlue};
  font-family: ${fonts.bold};
  font-size: 15px;
  text-align: right;
`

const CloseButtonContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 16px 0px;
`
