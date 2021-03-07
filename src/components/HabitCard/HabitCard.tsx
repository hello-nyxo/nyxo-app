import {
  archiveHabit as archiveHabitThunk,
  deleteHabitById,
  draftEditHabit,
  markTodayHabitAsCompleted
} from '@actions/habit/habit-actions'
import { isCompletedToday } from '@helpers/habits'
import { useAppDispatch } from '@hooks/redux'
import { fonts } from '@styles/themes'
import { Habit } from '@typings/state/habit-state'
import React, { FC, useRef } from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Animated, { interpolate } from 'react-native-reanimated'
import { toggleEditHabitModal } from '@reducers/modal'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'
import ActionComplete from './ActionComplete'
import { getIcon } from './TopRow'

export const cardHeight = 100

type Props = {
  habit: Habit
}

const HabitCard: FC<Props> = (props) => {
  const ref = useRef<Swipeable>(null)
  const dispatch = useAppDispatch()
  const { habit } = props
  const {
    habit: { period, dayStreak = 0 }
  } = props
  const { color } = getIcon(period)

  const completed = isCompletedToday(habit)

  const toggleCompleted = () => {
    dispatch(markTodayHabitAsCompleted(habit))
    close()
  }

  const editHabit = () => {
    dispatch(draftEditHabit(habit))
    dispatch(toggleEditHabitModal())
  }

  const deleteHabit = () => {
    dispatch(deleteHabitById(habit))
    close()
  }
  const archiveHabit = () => {
    dispatch(archiveHabitThunk(habit))
    close()
  }

  const close = () => {
    // eslint-disable-next-line no-unused-expressions
    ref?.current?.close()
  }

  const renderLeftActions = (
    progress: Animated.Value<number>,
    dragX: Animated.Value<number>
  ) => {
    const animation = interpolate(dragX, {
      inputRange: [0, 100],
      outputRange: [0, 1]
    })
    return (
      <>
        <ActionComplete
          animation={animation}
          direction="LEFT"
          icon="archive"
          buttonText="HABIT.ARCHIVE"
          action={archiveHabit}
        />
        <ActionComplete
          animation={animation}
          direction="LEFT"
          icon="bin"
          buttonText="HABIT.DELETE"
          action={deleteHabit}
        />
      </>
    )
  }

  const renderRightActions = (
    progress: Animated.Value<number>,
    dragX: Animated.Value<number>
  ) => {
    const animation = interpolate(dragX, {
      inputRange: [-150, 0],
      outputRange: [1, 0]
    })

    return (
      <>
        <ActionComplete
          animation={animation}
          direction="RIGHT"
          icon="checkMark"
          buttonText="HABIT.COMPLETE"
          action={toggleCompleted}
        />
      </>
    )
  }

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <BorderlessButton onPress={editHabit}>
        <Card>
          <PeriodBarIndicator backgroundColor={color} />

          <MiddleSector>
            <PeriodIndicator accent={color}>
              {`HABIT.EVERY_${period.toUpperCase()}`}
            </PeriodIndicator>
            <Separator />
            <TitleHolder completedToday={completed}>{habit.title}</TitleHolder>
            <Separator />
            <DayStreakContainer>
              <IconBold width={12} height={12} name="flame" fill="#adadad" />
              <DayStreak>{dayStreak}</DayStreak>
            </DayStreakContainer>
          </MiddleSector>

          <CheckIconHolder>
            {completed && (
              <IconBold
                width={15}
                height={15}
                name="checkMark"
                fill={colors.darkBlue}
              />
            )}
          </CheckIconHolder>
        </Card>
      </BorderlessButton>
    </Swipeable>
  )
}

export default HabitCard

const Card = styled.View`
  margin: 8px 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};

  box-shadow: 1px 3px 2px rgba(32, 33, 37, 0.2);
  flex-direction: row;
  elevation: 8;
`

type PeriodProps = {
  backgroundColor: string
}

const PeriodBarIndicator = styled.View<PeriodProps>`
  flex-direction: column;
  width: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`

const MiddleSector = styled.View`
  flex-direction: column;
  padding: 6px 10px;
  flex: 1;
`

interface TimeProps {
  accent: string
}

const PeriodIndicator = styled(TranslatedText)<TimeProps>`
  font-size: 11px;
  text-transform: uppercase;
  color: ${({ accent }) => accent};
  font-family: ${fonts.medium};
`

interface TitleHolderProps {
  completedToday: boolean
}

const TitleHolder = styled.Text<TitleHolderProps>`
  font-family: ${fonts.medium};
  font-size: 15px;
  text-decoration: ${({ completedToday }) =>
    completedToday ? 'line-through' : 'none'};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const DayStreakContainer = styled.View`
  flex-direction: row;
  align-items: center;
`

const DayStreak = styled.Text`
  margin-left: 5px;
  font-size: 12px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Separator = styled.View`
  height: 5px;
`

const CheckIconHolder = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
`
