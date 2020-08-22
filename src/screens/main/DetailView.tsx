import Moment from 'moment'
import React, { memo } from 'react'
import { FlatList } from 'react-native'
import Animated from 'react-native-reanimated'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import BackButton from '../../components/Buttons/backButton'
// import HeartRateChart from '../../components/Charts/HeartRateChart';
// import MapView, { Marker } from 'react-native-maps';
import SleepTimeChart from '../../components/Charts/sleepTimeChart'
import SampleRow from '../../components/DetailView/SampleRow'
// import HeartRateChart from '../../components/Charts/HeartRateChart';
import EmptyState from '../../components/EmptyState'
import { Container, H2 } from '../../components/Primitives/Primitives'
import TinyCard from '../../components/TinyCard'
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT } from '../../helpers/Dimensions'
import { getTimeInString, toNightTime } from '../../helpers/time'
import { colorPairs } from '../../styles/colors'
import { Night } from '../../Types/Sleepdata'

const yOffset = new Animated.Value(0)

const headerHeight = () => {
  return {
    height: yOffset.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolateRight: Animated.Extrapolate.CLAMP
    })
  }
}

interface DetailViewProps {
  navigation: any
}

const DetailView = (props: DetailViewProps) => {
  const { navigation } = props
  const currentDay = navigation.getParam('selectedDay', '')
  // const heartRateData = navigation.getParam('heartRateData', '');
  const dispatch = useDispatch()

  const renderNightDataItems = () => {
    const noData =
      currentDay && currentDay.night && currentDay.night.length !== 0

    return currentDay.night.map((sample: Night, index: number) => (
      <SampleRow
        key={index}
        source={sample.source}
        durationString={sample.durationString}
        value={sample.value}
      />
    ))
  }

  const getFallAsleep = () => {
    const { bedStart } = currentDay
    const { sleepStart } = currentDay
    if (bedStart || sleepStart) {
      const startTime = sleepStart || bedStart
      return Moment(startTime).format('HH:mm')
    }
    return '-'
  }

  const getWakeUp = () => {
    const { bedEnd } = currentDay
    const { sleepEnd } = currentDay
    if (bedEnd || sleepEnd) {
      const startTime = bedEnd || sleepEnd
      return Moment(startTime).format('HH:mm')
    }
    return '-'
  }

  const renderUnfilteredNightDataItems = () => {
    const noData =
      currentDay &&
      currentDay.unfilteredNight &&
      currentDay.unfilteredNight.length !== 0

    return noData ? (
      currentDay.unfilteredNight.map((sample: Night, index: number) => (
        <SampleRow
          key={index}
          source={sample.source}
          durationString={sample.durationString}
          value={sample.value}
        />
      ))
    ) : (
      <EmptyState />
    )
  }

  const renderRow = ({ item, index }: any) => {
    return (
      <SampleRow
        key={index}
        source={item.source}
        durationString={item.durationString}
        value={item.value}
      />
    )
  }

  const cardsData = [
    {
      title: 'Fell asleep',
      figure: getFallAsleep(),
      iconColor: colorPairs.fallAsleep,
      iconBg: colorPairs.fallAsleepBg,
      icon: 'daySunset'
    },
    {
      title: 'Wake up',
      figure: getWakeUp(),
      iconColor: colorPairs.wakeUp,
      iconBg: colorPairs.wakeUpBg,
      icon: 'daySunrise'
    },
    {
      title: 'Time in bed',
      figure: getTimeInString(currentDay.inBedDuration),
      iconColor: colorPairs.inBed,
      iconBg: colorPairs.inBedBg,
      icon: 'bedDoubleBold'
    },

    {
      title: 'Time asleep',
      figure: getTimeInString(currentDay.asleepDuration),
      iconColor: colorPairs.asleep,
      iconBg: colorPairs.asleepBg,
      icon: 'bedDoubleBold'
    }
    // {
    // 	title: 'Bedtime',
    // 	figure: '600',
    // 	iconColor: colorPairs.sleepWindow,
    // 	iconBg: colorPairs.sleepWindowBg,
    // 	icon: 'bedWindow',
    // },

    // {
    // 	title: 'Social Jetlag',
    // 	figure: '600',
    // 	iconColor: colorPairs.inBed,
    // 	iconBg: colorPairs.inBedBg,
    // 	icon: 'scale',
    // },
  ]

  const includeSample = () => {
    // await dispatch
  }

  const ItemSeparatorComponent = () => {
    return <Separator />
  }

  const cards = cardsData.map((item, index) => (
    <TinyCard
      key={index}
      title={item.title}
      figure={item.figure}
      iconColor={item.iconColor}
      iconBg={item.iconBg}
      icon={item.icon}
    />
  ))
  return (
    <Container>
      <Header style={headerHeight()}>
        <BackButtonContainer>
          <BackButton />
        </BackButtonContainer>
        <Title>{toNightTime(currentDay.date)}</Title>
        <SubTitle />
      </Header>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: yOffset } } }
        ])}>
        <CardContainer>{cards}</CardContainer>

        <H2>Analysis samples</H2>
        <FlatList
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={<EmptyState />}
          data={currentDay.night}
          renderItem={renderRow}
        />
        <H2>All data samples</H2>
        <FlatList
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={<EmptyState />}
          data={currentDay.unfilteredNight}
          renderItem={renderRow}
        />
        {/* <Text style={styles.titleH2}>Notes</Text> */}

        <SleepTimeChart />
      </Animated.ScrollView>
    </Container>
  )
}

export default memo(DetailView)

const Header = styled(Animated.View)``

const BackButtonContainer = styled.View``

const Title = styled.Text``

const SubTitle = styled.Text``

const CardContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  padding: 20px;
  margin: 200px 0px 20px;
`
