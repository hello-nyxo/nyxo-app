import React, { FC, useRef, useEffect } from 'react'
import { FlatList, ListRenderItem, ViewToken } from 'react-native'
import styled from 'styled-components/native'
import { format, sub, startOfDay } from 'date-fns/esm'
import { WIDTH } from '@helpers/Dimensions'
import { useDispatch } from 'react-redux'
import { toggleCalendarModal } from '@actions/modal/modal-actions'
import useCalendar from '@hooks/calendar'
import { isSameDay } from 'date-fns'
import LinearGradient from 'react-native-linear-gradient'

const contentOffset = { x: -WIDTH / 2 / 2, y: 0 }

const CalendarStrip: FC = () => {
  const { selectDate, selectedDate } = useCalendar()
  const flatListRef = useRef<FlatList>(null)
  const dispatch = useDispatch()
  const startDate = new Date()
  const days = Array.from(Array(365 * 3)).map((_, index) =>
    startOfDay(sub(startDate, { days: index }))
  )

  const toggleCalendar = () => {
    dispatch(toggleCalendarModal())
  }

  const offsets = days.map((_, index) => index * (WIDTH / 2))

  const renderItem: ListRenderItem<Date> = ({ item }) => (
    <PressableContainer key={item.toISOString()} onPress={toggleCalendar}>
      <Day>
        <DateContainer>{format(item, 'EEE d. LLL')}</DateContainer>
      </Day>
    </PressableContainer>
  )

  const handleViewableItemsChanged = ({
    viewableItems
  }: {
    viewableItems: Array<ViewToken>
  }) => {
    if (viewableItems.length === 1) {
      const date = viewableItems[0].item
      selectDate(date)
    }
  }

  const handleViewableItemsChangedRef = useRef(handleViewableItemsChanged)

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 85,
    minimumViewTime: 200
  }

  const keyExtractor = (item: Date) => item.toISOString()

  const scrollToItem = (index: number) => {
    // return flatListRef?.current?.scrollToIndex({
    //   index,
    //   animated: true,
    //   viewPosition: 0.5
    // })
  }

  useEffect(() => {
    const index = days.findIndex((date) =>
      isSameDay(date, new Date(selectedDate))
    )
    if (index >= 0) {
      scrollToItem(index)
    }
  }, [selectedDate])

  return (
    <Container>
      <FlatList
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        inverted
        snapToStart
        horizontal
        getItemLayout={(_, index: number) => ({
          index,
          length: WIDTH / 2,
          offset: (WIDTH / 2) * index
        })}
        contentOffset={contentOffset}
        keyExtractor={keyExtractor}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={handleViewableItemsChangedRef.current}
        decelerationRate="fast"
        snapToInterval={WIDTH / 2}
        centerContent
        snapToAlignment="center"
        data={days}
        renderItem={renderItem}
      />
      <Gradient pointerEvents="box-none" />
    </Container>
  )
}

export default CalendarStrip

const Container = styled.View`
  width: ${WIDTH}px;
  height: 30px;
`

const Day = styled.View`
  width: ${WIDTH / 2}px;
`

const DateContainer = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const PressableContainer = styled.TouchableWithoutFeedback`
  background-color: red;
`

const Gradient = styled(LinearGradient).attrs(({ theme }) => ({
  colors:
    theme.mode === 'dark'
      ? [
          'rgba(0,0,0,1)',
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0)',
          'rgba(0,0,0,0)',
          'rgba(0,0,0,1)'
        ]
      : [
          'rgba(246,246,249,1)',
          'rgba(246,246,249,0)',
          'rgba(246,246,249,0)',
          'rgba(246,246,249,0)',
          'rgba(246,246,249,1)'
        ],
  locations: [0, 0.25, 0.5, 0.75, 1],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 }
}))`
  width: ${WIDTH}px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`
