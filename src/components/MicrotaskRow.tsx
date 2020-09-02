import React, { memo } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import colors from '../styles/colors'
import { fonts } from '../styles/themes'
import { MicroTask } from 'Types/Microtask'
import { IconBold } from './iconRegular'

interface MicroTaskRowProps {
  task: MicroTask
  completedToday: boolean
  markTaskCompletedForTheDay: Function
  deleteMicroTask: Function
  editModeOn: boolean
}

const MicroTaskRow = (props: MicroTaskRowProps) => {
  const completedOn = props.task.days.reduce((acc, cur) => acc + cur)
  const completed = props.completedToday

  const handleMarkCompleted = () => {
    props.markTaskCompletedForTheDay()
  }

  const handleDelete = () => {
    props.deleteMicroTask()
  }

  const renderLeftActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1]
    })
    return (
      <RectButton style={c.leftAction} onPress={() => {}}>
        <Animated.Text
          style={[
            c.actionText,
            {
              transform: [{ translateX: trans }]
            }
          ]}>
          Archive
        </Animated.Text>
      </RectButton>
    )
  }

  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      friction={2}
      leftThreshold={30}
      rightThreshold={40}>
      <View style={c.taskRow}>
        <View style={c.task}>
          <TouchableOpacity
            style={c.markAsCompleted}
            onPress={handleMarkCompleted}>
            {completed ? (
              <IconBold
                name="circleCheck"
                height={20}
                width={20}
                fill={colors.radiantBlue}
              />
            ) : (
              <View style={c.circle} />
            )}
            <Text
              numberOfLines={1}
              ellipsizeMode="middle"
              style={[c.taskName, completed ? c.taskNameCompleted : null]}>
              {props.task.title}
            </Text>
          </TouchableOpacity>
          {props.editModeOn ? (
            <TouchableOpacity style={c.delete} onPress={handleDelete}>
              <IconBold
                name="closeCircle"
                height={20}
                width={20}
                fill={colors.red}
              />
            </TouchableOpacity>
          ) : null}
          <Text style={completed ? c.daysTextCompleted : c.daysText}>
            {completedOn} / {props.task.days.length}
          </Text>
        </View>
        {/* <View style={c.blocks}>{this.renderBlocks(task)}</View> */}
      </View>
    </Swipeable>
  )
}

export default memo(MicroTaskRow)

const c = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#497AFC',
    justifyContent: 'center'
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  taskRow: {
    backgroundColor: 'white'
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  markAsCompleted: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 20
  },
  delete: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  },
  taskName: {
    marginLeft: 10,
    fontSize: 17,
    fontFamily: fonts.medium,
    color: 'black'
  },
  taskNameCompleted: {
    textDecorationLine: 'line-through',
    color: 'black'
  },
  daysText: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: 'black'
  },
  daysTextCompleted: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.radiantBlue
  },
  blocks: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  blockContainer: {
    marginHorizontal: 2,
    flex: 1
  },
  bottomContainer: {
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.radiantBlueTransparent
  }
})
