import LessonListItem from '@components/LessonComponents/LessonListItem'
import SectionHeader from '@components/LessonComponents/SectionHeader'
import Separator from '@components/LessonComponents/Separator'
import keyExtractor from '@helpers/KeyExtractor'
import {
  CombinedLessonArray,
  getCoachingLessonsForCurrentWeek,
  getCoachingLessonsForWeek,
  CombinedLesson
} from '@selectors/coaching-selectors/coaching-selectors'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import { useGetActiveCoaching } from 'hooks/coaching/useCoaching'
import { groupBy } from 'lodash'
import React, { FC, memo, ReactElement } from 'react'
import { SectionList, ListRenderItem } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { Section } from 'Types/CoachingContentState'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

type Props = {
  useCurrentWeek: boolean
  locked?: boolean
  header?: ReactElement
  footer?: ReactElement
  onScroll?: () => void
  refreshControl?: ReactElement
}

const LessonList: FC<Props> = ({
  useCurrentWeek,
  locked,
  header,
  footer,
  onScroll,
  refreshControl
}) => {
  const { data } = useGetActiveCoaching()

  console.log(data?.activeCoaching)

  const lessonsSelectedWeek: CombinedLessonArray = useSelector(
    getCoachingLessonsForWeek
  )
  const lessonsCurrentWeek: CombinedLessonArray = useSelector(
    getCoachingLessonsForCurrentWeek
  )

  const renderCard: ListRenderItem<CombinedLesson> = ({ item }) => (
    <LessonListItem key={item.slug} locked={locked} lesson={item} />
  )

  const renderSectionHeader = ({
    section
  }: {
    section: { header: Section }
  }) => (
    <SectionHeader
      key={`${section.header.title}`}
      description={section.header.description}
      title={`${section.header.title}`}
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

const StyledSectionList = styled(AnimatedSectionList).attrs(() => ({
  contentContainerStyle: {}
}))``

const Spacer = styled.View`
  height: 100px;
`
