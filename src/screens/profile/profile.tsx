import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import {
  deviationBedTime,
  deviationSleep,
  getAsleepNights,
  getAverageBedTime,
  getAverageSleepTime,
  getBedTimeNights,
  getLongestBedTime,
  getLongestSleepTime,
  getNightsWithOver8HoursBedTime,
  getNightsWithOver8HoursSleep,
  getShortestBedTime,
  getShortestSleepTime
} from '@selectors/SleepDataSelectors'
import React, { memo } from 'react'
import { SectionList } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import Inforow from '../../components/InfoRow'
import {
  H3,
  P,
  PageTitle,
  SafeAreaView
} from '../../components/Primitives/Primitives'
import UserInfo from '../../components/ProfileSpecific/Userinfo'
import SignupBottomButton from '../../components/Signup/SignupBottomButton'
import TopInfo from '../../components/TopInfo'
import keyExtractor from '../../helpers/KeyExtractor'
import { minutesToHoursString } from '../../helpers/time'
import { StyleProps } from '../../styles/themes'

const ProfileScreen = () => {
  const nights = useSelector(getBedTimeNights)
  const average = useSelector(getAverageBedTime)
  const deviation = useSelector(deviationBedTime)
  const shortestNight = useSelector(getShortestBedTime)
  const longestNight = useSelector(getLongestBedTime)
  const over8 = useSelector(getNightsWithOver8HoursBedTime)

  const nightsSleep = useSelector(getAsleepNights)
  const averageSleep = useSelector(getAverageSleepTime)
  const deviationAsleep = useSelector(deviationSleep)
  const shortestNightSleep = useSelector(getShortestSleepTime)
  const longestNightSleep = useSelector(getLongestSleepTime)
  const over8Sleep = useSelector(getNightsWithOver8HoursSleep)

  const sections = [
    {
      title: 'Bedtime statistics',
      subtitle: 'Bedtime statistics subtitle',
      data: [
        { title: 'Tracked nights', figure: nights.length.toString() },
        {
          title: 'Bedtime average',
          figure: minutesToHoursString(average, true)
        },
        {
          title: 'Bedtime deviation',
          figure: minutesToHoursString(deviation, true)
        },
        {
          title: 'Shortest night',
          figure: minutesToHoursString(shortestNight, true)
        },
        {
          title: 'Longest night',
          figure: minutesToHoursString(longestNight, true)
        },
        { title: 'Nights with over 8 hours', figure: over8.length.toString() }
      ]
    },
    {
      title: 'Sleeptime statistics',
      subtitle: 'Sleeptime statistics subtitle',
      data: [
        { title: 'Tracked nights', figure: nightsSleep.length.toString() },
        {
          title: 'Bedtime average',
          figure: minutesToHoursString(averageSleep, true)
        },
        {
          title: 'Bedtime deviation',
          figure: minutesToHoursString(deviationAsleep, true)
        },
        {
          title: 'Shortest night',
          figure: minutesToHoursString(shortestNightSleep, true)
        },
        {
          title: 'Longest night',
          figure: minutesToHoursString(longestNightSleep, true)
        },
        {
          title: 'Nights with over 8 hours',
          figure: over8Sleep.length.toString()
        }
      ]
    }
  ]

  const renderSectionHeader = ({ section }: any) => (
    <SectionHeaderContainer>
      <H3>{section.title}</H3>
      <P>{section.subtitle}</P>
    </SectionHeaderContainer>
  )

  const renderItem = ({ item }: any) => (
    <Inforow title={item.title} figure={item.figure} />
  )

  return (
    <SafeAreaView>
      <TopInfo />

      <SectionList
        ListHeaderComponent={<ProfileHeader />}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

const ProfileHeader = () => {
  const loggedIn = useSelector(getAuthState)
  return (
    <Container>
      <PageTitle>Profile</PageTitle>
      {loggedIn && <UserInfo />}
      {!loggedIn && <SignupBottomButton />}
      {/* <ChronotypeBox /> */}
    </Container>
  )
}

export default memo(ProfileScreen)

const Container = styled.View`
  margin-bottom: 20px;
  min-height: 300px;
`

const SectionHeaderContainer = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
  margin: 0px 20px 20px;
  padding-top: 20px;
`
