import { useNavigation } from '@react-navigation/native'
import { groupBy } from 'lodash'
import React, { memo, ReactElement } from 'react'
import { SectionList } from 'react-native'
import Animated from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import {
  CombinedLessonArray,
  getCoachingLessonsForCurrentWeek,
  getCoachingLessonsForWeek
} from '@selectors/coaching-selectors/coaching-selectors'
import styled from 'styled-components/native'
import LessonListItem from '@components/LessonComponents/LessonListItem'
import SectionFooter from '@components/LessonComponents/SectionFooter'
import SectionHeader from '@components/LessonComponents/SectionHeader'
import Separator from '@components/LessonComponents/Separator'
import keyExtractor from '@helpers/KeyExtractor'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import { StyleProps } from '../../styles/themes'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

interface LessonProps {
  useCurrentWeek: boolean
  locked?: boolean
  header?: ReactElement
  footer?: ReactElement
  onScroll?: Function
  refreshControl?: ReactElement
}

const LessonList = (props: LessonProps) => {
  const {
    useCurrentWeek,
    locked,
    header,
    footer,
    onScroll,
    refreshControl
  } = props
  const hasActiveCoaching = useSelector(getActiveCoaching)
  const lessonsSelectedWeek: CombinedLessonArray = useSelector(
    getCoachingLessonsForWeek
  )
  const lessonsCurrentWeek: CombinedLessonArray = useSelector(
    getCoachingLessonsForCurrentWeek
  )

  const renderCard = ({ item, index }: any) => (
    <LessonListItem key={index} locked={locked} lesson={item} />
  )

  const renderSectionHeader = ({ section, index }: any) => (
    <SectionHeader
      key={index}
      description={section.header.description}
      title={section.header.title}
    />
  )
  const renderSectionFooter = ({ section, index }: any) => (
    <SectionFooter
      key={index}
      description={section.header.description}
      title={section.header.title}
    />
  )

  const renderItemSeparatorComponent = () => <Separator />

  const lessons: CombinedLessonArray = useCurrentWeek
    ? lessonsCurrentWeek
    : lessonsSelectedWeek

  const groupedLessons = groupBy(lessons, (lesson) => lesson.section?.title)
  const sectionData = lessons.map((item) => ({
    title: item.section?.title,
    description: item.section?.description,
    order: item.section?.order
  }))

  if (!sectionData) {
    return null
  }

  const sections = Object.entries(groupedLessons).map((group) => {
    return {
      header: { ...sectionData.find((item) => item.title === group[0]) },
      data: group[1]
    }
  })

  return (
    <StyledSectionList
      onScroll={onScroll}
      refreshControl={refreshControl}
      ListHeaderComponent={header}
      stickySectionHeadersEnabled={false}
      ItemSeparatorComponent={renderItemSeparatorComponent}
      ListFooterComponent={
        <>
          {footer}
          <Spacer />
        </>
      }
      keyExtractor={keyExtractor}
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderCard}
    />
  )
}

export default memo(LessonList)

const StyledSectionList = styled(AnimatedSectionList).attrs(
  (props: StyleProps) => ({
    contentContainerStyle: {}
  })
)``

const Spacer = styled.View`
  height: 100px;
`
