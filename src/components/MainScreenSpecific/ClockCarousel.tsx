import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import {
  setActiveIndex,
  setSelectedDay
} from '@actions/sleep/sleep-data-actions'
import { WIDTH } from '@helpers/Dimensions'
import keyExtractor from '@helpers/KeyExtractor'
import { getEditMode } from '@selectors/ManualDataSelectors'
import {
  getActiveIndex,
  getWeekReversedSelector
} from '@selectors/SleepDataSelectors'
import SCClock from '../Clock'
import ClockEmpty from '../clock/ClockEmpty'

const ClockCarousel = () => {
  const dispatch = useDispatch()
  const editMode = useSelector(getEditMode)
  const reversed = useSelector(getWeekReversedSelector)
  const activeIndex = useSelector(getActiveIndex)
  const [index, setIndex] = useState(activeIndex)

  useEffect(() => {
    if (
      activeIndex != null &&
      activeIndex >= 0 &&
      reversed.length > 0 &&
      activeIndex !== index
    ) {
      scrollToItem(Math.abs(activeIndex - 6))
      setIndex(activeIndex - 6)
    }
  }, [activeIndex])

  const handleViewableItemsChanged = (info: any) => {
    if (info.viewableItems !== undefined && info.viewableItems.length !== 0) {
      const newIndex = Math.abs(info.viewableItems[0].index - 6)
      dispatch(setActiveIndex(newIndex))

      const day = info.viewableItems[0].item
      dispatch(setSelectedDay(day.date))
    }
  }

  const handleViewableItemsChangedRef = useRef(handleViewableItemsChanged)

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 65,
    minimumViewTime: 100
  }

  const flatListRef: any = useRef(null)

  const scrollToItem = (index: number) => {
    return flatListRef.current.scrollToIndex({
      index,
      animated: true,
      viewPosition: 0.5
    })
  }

  const renderClock = ({ index, item }: any) => {
    return (
      <Animated.View
        style={{
          width: WIDTH,
          height: WIDTH,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        key={index}>
        <SCClock shouldAnimate={false} selectedDay={item} />
      </Animated.View>
    )
  }

  return (
    <Clocks
      scrollEnabled={!editMode}
      ListEmptyComponent={<ClockEmpty />}
      initialNumToRender={1}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: xOffset } } }],
        {
          useNativeDriver: true
        }
      )}
      viewabilityConfig={viewabilityConfig}
      data={reversed}
      renderItem={renderClock}
      horizontal
      getItemLayout={(data: any, index: number) => ({
        index,
        length: WIDTH,
        offset: WIDTH * index
      })}
      keyExtractor={keyExtractor}
      pagingEnabled
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={handleViewableItemsChangedRef.current}
      inverted
    />
  )
}

export default memo(ClockCarousel)

const xOffset = new Animated.Value(0)

const transitionAnimation = (index: number) => ({
  opacity: xOffset.interpolate({
    inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
    outputRange: [1, 1, 1]
  }),
  transform: [
    { perspective: 800 },
    {
      rotateY: xOffset.interpolate({
        inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
        outputRange: [1, 0, 1]
      })
    },
    {
      scale: xOffset.interpolate({
        inputRange: [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH],
        outputRange: [0.9, 1, 0.9]
      })
    }
  ]
})

const Clocks = styled(Animated.FlatList).attrs(() => ({
  contentContainerStyle: {}
}))`
  height: ${WIDTH}px;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`
