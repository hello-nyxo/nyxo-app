import Moment from 'moment'
import React, { memo, useRef } from 'react'
import { BorderlessButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import {
  archiveMicrotask,
  deleteMicroTaskById,
  markTodayAsCompleted
} from '@actions/habit/habit-actions'
import { fonts, StyleProps } from '@styles/themes'
import { MicroTask } from '@typings/Microtask'
import TranslatedText from '../TranslatedText'
import ActionComplete from './ActionComplete'
import TopRow from './TopRow'

export const cardHeight = 100

interface Props {
  task: MicroTask
}

const completedToday = (task: MicroTask) => {
  const today = Moment()
  const microTaskStart = Moment(task.date).startOf('day')
  const difference = today.diff(microTaskStart, 'days')
  return task.days[difference] !== 0
}

const HabitCardManage = (props: Props) => {
  const ref: any = useRef()
  const dispatch = useDispatch()
  const period = props.task.period.toLowerCase()
  const completed = completedToday(props.task)
  const daysLeft = props.task.days ? props.task.days.length : 0

  const markCompleted = () => {
    dispatch(markTodayAsCompleted(props.task))
    ref!.current!.close()
  }

  const deleteHabit = () => {
    dispatch(deleteMicroTaskById(props.task.id))
  }

  const archiveHabit = () => {
    dispatch(archiveMicrotask(props.task))
  }

  const renderLeftActions = (progress: any, dragX: any) => {
    const animation = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1]
    })
    return (
      <ActionComplete
        animation={animation}
        direction="LEFT"
        icon="bin"
        buttonText="DELETE_HABIT"
        action={deleteHabit}
      />
    )
  }

  const renderRightActions = (progress: any, dragX: any) => {
    const animation = dragX.interpolate({
      inputRange: [-50, 0],
      outputRange: [1, 0]
    })
    return (
      <ActionComplete
        animation={animation}
        direction="RIGHT"
        icon="archive"
        buttonText="ARCHIVE_HABIT"
        action={archiveHabit}
      />
    )
  }

  return (
    <Swipeable
      ref={ref}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}>
      <BorderlessButton onPress={markCompleted}>
        <Card>
          <TopRow period={period} daysLeft={daysLeft} />
          <ActionRow>
            <Action
              completedToday={completed}
              numberOfLines={2}
              ellipsizeMode="tail">
              {props.task.title}
            </Action>
          </ActionRow>
        </Card>
      </BorderlessButton>
    </Swipeable>
  )
}

export default memo(HabitCardManage)

const Card = styled.View`
  margin: 10px 20px;
  border-radius: 5px;
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  padding: 20px 10px;
  box-shadow: 1px 1px 15px rgba(32, 33, 37, 0.1);
`

export const StreakRow = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`

export const Streak = styled(TranslatedText)`
  margin-left: 10px;
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`

const ActionRow = styled.TouchableOpacity`
  flex: 1;
`

interface ActionProps extends StyleProps {
  completedToday: boolean
}

const Action = styled.Text`
  font-family: ${fonts.medium};
  font-size: 15px;
  text-decoration: ${(props: ActionProps) =>
    props.completedToday ? 'line-through' : 'none'};
  color: ${(props: ActionProps) => props.theme.SECONDARY_TEXT_COLOR};
`
