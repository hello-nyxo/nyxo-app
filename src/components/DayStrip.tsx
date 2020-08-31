import { default as Moment, default as moment } from 'moment'
import React, { memo } from 'react'
import { SectionList, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { setActiveIndex } from '../actions/sleep/sleep-data-actions'
import { WIDTH } from '../helpers/Dimensions'
import keyExtractor from '../helpers/KeyExtractor'
import { fonts, StyleProps } from '../styles/themes'
import {
  getActiveIndex,
  getWeekSelector
} from '../store/Selectors/SleepDataSelectors'
import { Day } from '../Types/Sleepdata'
import NightRating from './sleepClock/NightRating'

const dayWidth = WIDTH / 7
const spacerHeight = 7
const cardMargin = 5

const DayStrip = () => {
  const days: Day[] = useSelector(getWeekSelector)
  const activeIndex = useSelector(getActiveIndex)
  const dispatch = useDispatch()

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isToday = moment(item.date).isSame(new Date(), 'day')
    const handleOnPress = () => {
      dispatch(setActiveIndex(index))
    }

    return (
      <Container>
        <Segment
          today={isToday}
          active={index === activeIndex}
          key={index}
          onPress={handleOnPress}>
          <DateText active={index === activeIndex}>
            {Moment(item.date).format('ddd')}
          </DateText>
          <DateNumber active={index === activeIndex}>
            {Moment(item.date).format('DD')}
          </DateNumber>
        </Segment>

        <Spacer />
        <NightRatingHolder>
          <NightRating day={item} height={15} width={15} unClickable={true} />
        </NightRatingHolder>
      </Container>
    )
  }

  const snapOffets: number[] = days.map(
    (item, index) => index * (dayWidth + cardMargin * 2)
  )

  const renderSectionHeader = ({ index, section }: any) => {
    return (
      <View style={{ position: 'absolute', top: -20 }}>
        <Text>{section.title}</Text>
      </View>
    )
  }

  return (
    <Segments
      stickySectionHeadersEnabled
      sections={[{ title: 'November', data: days }]}
      snapToOffsets={snapOffets}
      getItemLayout={(data, index) => ({
        index,
        length: dayWidth,
        offset: (dayWidth + cardMargin) * index
      })}
      snapToAlignment="center"
      snapToEnd={false}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      horizontal
    />
  )
}

export default memo(DayStrip)

const Container = styled.View`
  flex-direction: column;
`

const Segments = styled(SectionList)`
  margin: 20px 0px;
  padding: 10px 0px;
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
  text-align: center;
`

const DateNumber = styled.Text<SegmentProps>`
  font-size: 15px;
  font-weight: bold;
  font-family: ${fonts.bold};
  text-align: center;
  color: ${(props: SegmentProps) =>
    props.active
      ? props.theme.PRIMARY_BACKGROUND_COLOR
      : props.theme.SECONDARY_TEXT_COLOR};
`

const Spacer = styled.View`
  height: ${spacerHeight}px;
`
const NightRatingHolder = styled.View`
  justify-content: center;
  align-items: center;
`
