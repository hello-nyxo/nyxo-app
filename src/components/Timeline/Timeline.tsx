import Moment from 'moment'
import { extendMoment } from 'moment-range'
import React, { memo } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'
import { getGoToSleepWindowStart } from '@selectors/insight-selectors/Insights'
import { MicroTask } from 'Types/Microtask'
import MicrotaskCard from '../HabitCard/HabitCard'

const moment = extendMoment(Moment)

interface TimeLineArrayObject {
  title: string
  data: any[]
}

interface TimelineObject {
  type: 'task' | 'info'
  time: string
  data: MicroTask | {}
}

const addData = (
  timelineArray: TimeLineArrayObject[],
  data: TimelineObject
): TimeLineArrayObject[] => {
  timelineArray.forEach((section) => {
    if (Moment(section.title).isSame(Moment(data.time), 'hour')) {
      section.data.push({
        type: data.type,
        data: data.data
      })
    }
  })

  return timelineArray
}

export const Timeline = () => {
  const wakeUp = Moment().startOf('day').add(7, 'hours')

  const bedTime = useSelector(getGoToSleepWindowStart)
  const bedTimeHours = Moment(bedTime).hours()
  const bedTimeMinutes = Moment(bedTime).hours()
  const bedTimeCorrected = Moment()
    .startOf('day')
    .add(bedTimeMinutes, 'minutes')
    .add(bedTimeHours, 'hours')
  // 	.toISOString();
  // testData.push({ title: bedTimeCorrected, data: ['U should go sleepsleep'] });
  const buffer = Moment()
    .startOf('day')
    .add(bedTimeMinutes, 'minutes')
    .add(bedTimeHours + 2, 'hours')
  const range = moment.range(wakeUp, buffer)
  const hours = Array.from(range.by('hour', { excludeEnd: true }))
  const generatedData = hours.map((hour) => ({
    title: hour.toString(),
    data: [],
    now: false
  }))

  addData(generatedData, {
    type: 'info',
    time: wakeUp.toISOString(),
    data: {
      title: 'Good morning!',
      text: `Today you woke up ${wakeUp.format('HH:mm')} Nice job!`
    }
  })

  addData(generatedData, {
    type: 'info',
    time: bedTimeCorrected.toISOString(),
    data: {
      title: 'Head to bed!',
      text: 'Your optimal bedtime window starts at 22:00'
    }
  })

  generatedData.push({ title: Moment().toISOString(), now: true, data: [] })

  const sortData = generatedData.sort(
    (a, b) => new Date(a.title) - new Date(b.title)
  )

  const renderSectionHeader = ({ index, section }: any) => {
    if (section.now) {
      return (
        <View
          style={{
            zIndex: 20,
            height: 1,
            left: 30,
            width: '100%',
            backgroundColor: 'red',
            position: 'absolute'
          }}
          key={index}>
          <View
            style={{
              position: 'absolute',
              left: -5,
              top: -5,
              backgroundColor: 'red',
              height: 10,
              width: 10,
              borderRadius: 10
            }}
          />
        </View>
      )
    }
    return (
      <View
        key={index}
        style={{
          minHeight: 60,
          borderTopColor: colors.gray2,
          borderTopWidth: StyleSheet.hairlineWidth,
          flexDirection: 'row'
          // backgroundColor: colors.radiantBlueTransparent,
        }}>
        <View
          style={{
            paddingVertical: 5,
            borderRightWidth: 2,
            borderRightColor: 'black',
            width: 30
          }}>
          <Text
            style={{
              textAlign: 'right',
              marginRight: 10,
              color: colors.gray2,
              fontFamily: fonts.bold,
              fontSize: 13
            }}>
            {Moment(section.title).format('H')}
          </Text>
        </View>
      </View>
    )
  }

  const renderItem = ({ item, index, section }: any) => (
    <View
      key={index}
      style={{
        // backgroundColor: colors.radiantBlueTransparent,
        marginTop: -20,
        flexDirection: 'row',
        paddingVertical: 10,
        marginLeft: 28,
        borderLeftWidth: 2,
        borderLeftColor: 'black'
      }}>
      <View style={{ marginLeft: 20, flex: 1 }}>
        {item.type === 'task' ? (
          <MicrotaskCard
            toggleDelete={() => {}}
            editModeOn={false}
            task={item}
          />
        ) : (
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              padding: 20,
              marginRight: 5
            }}>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: colors.eveningAccent,
                fontSize: 17
              }}>
              {item.data.title}
            </Text>
            <Text
              style={{
                fontFamily: fonts.bold,
                color: colors.gray2,
                fontSize: 15
              }}>
              {item.data.text}
            </Text>
          </View>
        )}

        {/* <View
						style={{
							backgroundColor: colors.evening,
							borderRadius: 5,
							minHeight: 50,
							flex: 1,
							padding: 10,
						}}>
						<Text
							style={{
								fontFamily: fonts.bold,
								color: colors.eveningAccent,
								fontSize: 17,
							}}>
							{item}
						</Text>
						<Text
							style={{
								fontSize: 15,
								marginTop: 5,
								fontFamily: fonts.regular,
								color: colors.eveningAccent,
							}}>
							Brush your teeth babe
						</Text>
					</View> */}
      </View>
    </View>
  )

  return (
    <View style={{ marginHorizontal: 20 }}>
      <Text style={{ fontFamily: fonts.bold, fontSize: 21, marginBottom: 5 }}>
        Timeline
      </Text>
      <Text
        style={{ fontFamily: fonts.medium, fontSize: 15, marginBottom: 10 }}>
        What's happening today
      </Text>
      <SectionList
        stickySectionHeadersEnabled
        renderItem={renderItem}
        sections={sortData}
        renderSectionHeader={renderSectionHeader}
      />
    </View>
  )
}

export default memo(Timeline)
