import React, { memo, useRef, useState } from 'react'
import {
  Dimensions,
  FlatList,
  Platform,
  TouchableOpacity,
  View
} from 'react-native'
import Animated from 'react-native-reanimated'
import { NavigationScreenProp } from 'react-navigation'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import TranslatedText from '@components/TranslatedText'
import colors from '../../styles/colors'
import { StyleProps } from '../../styles/themes'
import HealthKit from './Mockups/HealthKit'
import IPhone from './Mockups/iPhone'
// Mockups for screens
import Notification from './Mockups/Notification'
import SleepBetter from './Mockups/SleepBetter'
import Slide from './Slide'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const slides = [
  {
    key: '1',
    title: 'IntroSlideTitle1',
    text: 'IntroSlideText1',
    mockup: <Notification />,
    button: false
  },
  {
    key: '2',
    title: 'IntroSlideTitle2',
    text: 'IntroSlideText2',
    mockup: <Notification />,
    button: false
  },
  {
    key: '3',
    title: 'IntroSlideTitle3',
    text: 'IntroSlideText3',
    mockup: <Notification />,
    button: true
  },
  {
    key: '4',
    title: 'IntroSlideTitle4',
    text: 'IntroSlideText4',
    mockup: <Notification />,
    button: false
  }
]

interface IntroductionProps {
  nosleepdata: { message: string }
  prepareSleepDataFetching: Function
  complete_introduction: (complete: boolean) => void
  healthKitConnected: boolean
  navigation: NavigationScreenProp<any, any>
}

const { width, height } = Dimensions.get('window')
const halfWidth = width / 2
const xOffset = new Animated.Value(0)

const transitionAnimation = (index: number) => {
  const image2TranslateY = xOffset.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [0.8, 1, 0.8]
  })
  const image2Opacity = xOffset.interpolate({
    inputRange: [(index - 1) * width, index * width, (index + 1) * width],
    outputRange: [0, 1, +0],
    extrapolate: Animated.Extrapolate.CLAMP
  })

  return {
    opacity: image2Opacity,
    transform: [
      { perspective: 800 },
      {
        scale: image2TranslateY
      }
    ]
  }
}

const highlightAnimation1 = (index: number) => {
  const image2TranslateY = xOffset.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  })
  const image2Opacity = xOffset.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  })

  return {
    opacity: image2Opacity,
    transform: [
      { perspective: 800 },
      {
        scale: image2TranslateY
      }
    ]
  }
}

const highlightAnimation2 = (index: number) => {
  const image2TranslateY = xOffset.interpolate({
    inputRange: [width - halfWidth, width, width * 2],
    outputRange: [0, 1, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  })
  const image2Opacity = xOffset.interpolate({
    inputRange: [width - halfWidth, width, width * 2],
    outputRange: [0, 1, +0],
    extrapolate: Animated.Extrapolate.CLAMP
  })

  return {
    opacity: image2Opacity,
    transform: [
      { perspective: 800 },
      {
        scale: image2TranslateY
      }
    ]
  }
}

const highlightAnimation3 = (index: number) => {
  const image2TranslateY = xOffset.interpolate({
    inputRange: [width * 2 - halfWidth, width * 2, width * 3],
    outputRange: [0, 1, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  })
  const image2Opacity = xOffset.interpolate({
    inputRange: [width * 2 - halfWidth, width * 2, width * 3],
    outputRange: [0, 1, +0],
    extrapolate: Animated.Extrapolate.CLAMP
  })

  return {
    opacity: image2Opacity,
    transform: [
      { perspective: 800 },
      {
        scale: image2TranslateY
      }
    ]
  }
}

const highlightAnimation4 = (index: number) => {
  const image2TranslateY = xOffset.interpolate({
    inputRange: [width * 3 - halfWidth, width * 3, width * 4],
    outputRange: [0, 1, 0],
    extrapolate: Animated.Extrapolate.CLAMP
  })
  const image2Opacity = xOffset.interpolate({
    inputRange: [width * 3 - halfWidth, width * 3, width * 4],
    outputRange: [0, 1, +0],
    extrapolate: Animated.Extrapolate.CLAMP
  })

  return {
    opacity: image2Opacity,
    transform: [
      { perspective: 800 },
      {
        scale: image2TranslateY
      }
    ]
  }
}

const Introduction: React.SFC<IntroductionProps> = (props) => {
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 65,
    minimumViewTime: 100
  }

  const dispatch = useDispatch()
  const [slide, setSlide] = useState(0)
  const flatListRef: any = useRef(null)

  const renderItem = ({
    item,
    index
  }: {
    item: { title: string; button: boolean; text: string }
    index: number
  }) => {
    return (
      <SlideContainer key={index} style={transitionAnimation(index)}>
        <Slide title={item.title} text={item.text} />
      </SlideContainer>
    )
  }

  const onDone = () => {
    dispatch(complete_introduction(true))
    props.navigation.navigate(ROUTE.MAIN)
  }

  const onNext = () => {
    const newIndex = slide + 1
    if (newIndex >= slides.length) {
      onDone()
    } else {
      flatListRef.current.getNode().scrollToIndex({
        animated: true,
        index: newIndex
      })
      setSlide(newIndex)
    }
  }

  const onPrev = () => {
    const newIndex = slide - 1
    if (newIndex < 0) {
      return
    }
    flatListRef.current.getNode().scrollToIndex({
      animated: true,
      index: newIndex
    })
    setSlide(newIndex)
  }

  const dotSegments = () => {
    const dots = slides.map((d, i) => {
      const color = slide === i ? colors.radiantBlue : colors.gray
      return <Dot key={i} style={{ backgroundColor: color }} />
    })
    return <DotBox>{dots}</DotBox>
  }

  const renderPreviousComponent = () => {
    if (slide === 0) return <EmptySpace />
    return (
      <TouchableOpacity onPress={() => onPrev()}>
        <PreviousButton>Previous</PreviousButton>
      </TouchableOpacity>
    )
  }

  const renderNextComponent = () => {
    const text = slide + 1 >= slides.length ? 'Done' : 'Next'
    return (
      <TouchableOpacity onPress={() => onNext()}>
        <NextButton>{text}</NextButton>
      </TouchableOpacity>
    )
  }

  const handleViewableItemsChanged = ({
    viewableItems
  }: {
    viewableItems: []
  }) => {
    if (viewableItems !== undefined && viewableItems.length !== 0) {
      setSlide(viewableItems[0]!.index)
    }
  }

  const handleViewableItemsChangedRef = useRef(handleViewableItemsChanged)

  return (
    <SafeAreaView>
      <Animated.View
        style={{
          width,
          height: height * 0.5,
          backgroundColor: colors.afternoonAccent
        }}
      />

      <View
        style={{
          width,
          position: 'absolute',
          zIndex: 2,
          elevation: 2,
          top: 0,
          bottom: height / 2,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
        {Platform.OS === 'ios' ? <IPhone width={width} /> : null}
      </View>
      <View
        style={{
          width,
          position: 'absolute',
          zIndex: 20,
          top: 0,
          elevation: 5,
          bottom: height / 2,
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
        <PopUp style={highlightAnimation2(slide)}>
          <SleepBetter />
        </PopUp>

        <PopUp style={highlightAnimation3(slide)}>
          <HealthKit />
        </PopUp>

        <PopUp style={highlightAnimation4(slide)}>
          <Notification />
        </PopUp>
        {/* End Mockups */}
      </View>
      <AnimatedFlatList
        style={{ zIndex: 10, elevation: 1, height: height / 2 }}
        data={slides}
        extraData={slide}
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={renderItem}
        onViewableItemsChanged={handleViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: xOffset } } }
        ])}
      />
      <Footer>
        {renderPreviousComponent()}
        {dotSegments()}
        {renderNextComponent()}
      </Footer>
    </SafeAreaView>
  )
}

const mapStateToProps = (state: {
  sleepclock: { healthKitEnabled: boolean; nosleepdata: {} }
}) => ({
  healthKitConnected: state.sleepclock.healthKitEnabled,
  nosleepdata: state.sleepclock.nosleepdata
})

export default memo(Introduction)

const Dot = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 3px;
`

const DotBox = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`

const SlideContainer = styled(Animated.View)`
  flex: 1;
  width: ${width}px;
  justify-content: center;
`

const SafeAreaView = styled.SafeAreaView`
  width: ${width}px;
  height: ${height};
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
  flex: 1;
  overflow: hidden;
  justify-content: center;
`

const Footer = styled.View``

const PopUp = styled(Animated.View)`
  position: absolute;
  width: 300px;
  height: 150px;
  z-index: 30;
  align-items: center;
  justify-content: center;
`

const NextButton = styled(TranslatedText)`
  flex: 1;
  text-align: right;
  font-weight: bold;
  color: ${colors.radiantBlue};
  font-size: 15;
`

const PreviousButton = styled(TranslatedText)`
  flex: 1;
  text-align: right;
  font-weight: bold;
  color: ${colors.radiantBlue};
  font-size: 15px;
`

const EmptySpace = styled.View`
  flex: 1;
`
