import { setSelectedDay } from '@actions/sleep/sleep-data-actions'
import { getAllDays, getSelectedDay } from '@selectors/SleepDataSelectors'
import moment from 'moment'
import React, { FC } from 'react'
import { FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { Day } from 'Types/Sleepdata'
import { WIDTH } from '@helpers/Dimensions'
import keyExtractor from '@helpers/KeyExtractor'
import { fonts, StyleProps } from '../styles/themes'

const dayWidth = WIDTH / 7
const cardMargin = 5

const DayStrip: FC = () => {
  const days = useSelector(getAllDays)
  const dispatch = useDispatch()
  const { date } = useSelector(getSelectedDay)
  const renderItem = ({ item }: { item: Day }) => {
    const isToday = moment(item.date).isSame(new Date(), 'day')

    const handleOnPress = () => {
      dispatch(setSelectedDay(item.date))
    }

    return (
      <Segment
        key={item.date}
        today={isToday}
        active={item.date === date}
        onPress={handleOnPress}>
        <DateText active={item.date === date}>
          {moment(item.date).format('ddd')}
        </DateText>
        <DateNumber active={item.date === date}>
          {moment(item.date).format('DD.MM.')}
        </DateNumber>
      </Segment>
    )
  }

  const snapOffets: number[] = days.map((_, index) => index * 30)

  return (
    <Segments
      data={days}
      decelerationRate="fast"
      snapToStart
      snapToOffsets={snapOffets}
      getItemLayout={(_, index) => ({
        index,
        length: dayWidth,
        offset: (dayWidth + cardMargin) * index
      })}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      horizontal
    />
  )
}

export default DayStrip

const Segments = styled(FlatList)`
  width: ${WIDTH}px;
  height: ${dayWidth + 30}px;
  margin: 20px 0px;
`

interface SegmentProps extends StyleProps {
  readonly active?: boolean
  readonly today?: boolean
}

const Segment = styled.TouchableOpacity<SegmentProps>`
  width: ${dayWidth}px;
  height: ${dayWidth}px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 5;
  margin-top: 30px;
  border-radius: 5px;
  background-color: ${(props: SegmentProps) =>
    props.active
      ? props.theme.PRIMARY_TEXT_COLOR
      : props.theme.PRIMARY_BACKGROUND_COLOR};
`

const DateText = styled.Text<SegmentProps>`
  font-size: 12px;
  color: ${(props: SegmentProps) =>
    props.active
      ? props.theme.PRIMARY_BACKGROUND_COLOR
      : props.theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.bold};
  margin-bottom: 5px;
  text-transform: uppercase;
  text-align: center;
`

const DateNumber = styled.Text<SegmentProps>`
  font-size: 13px;
  font-family: ${fonts.medium};
  text-align: center;
  color: ${(props: SegmentProps) =>
    props.active
      ? props.theme.PRIMARY_BACKGROUND_COLOR
      : props.theme.SECONDARY_TEXT_COLOR};
`
