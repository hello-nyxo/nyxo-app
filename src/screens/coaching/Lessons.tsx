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
import { listLikedContents } from 'graphql/queries'
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
  locked?: boolean
  header?: ReactElement
  footer?: ReactElement
  onScroll?: () => void
  refreshControl?: ReactElement
}

const LessonList: FC<Props> = ({
  locked,
  header,
  footer,
  onScroll,
  refreshControl
}) => {
  const { data } = useGetActiveCoaching()
  const lessons: CombinedLessonArray = useSelector(getCoachingLessonsForWeek)
  const withData = lessons.map((l) => {
    return {
      ...l,
      completed: true
    }
  })
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

  const groupedLessons = groupBy(lessons, (lesson) => lesson.section?.title)
  const sectionData = lessons.map((item) => ({
    title: item.section?.title,
    description: item.section?.description,
    order: item.section?.order
  }))

  const sections = Object.entries(groupedLessons).map((group) => {
    return {
      header: { ...sectionData.find((item) => item.title === group[0]) },
      data: group[1]
    }
  })

  if (!sectionData) {
    return null
  }

  return (
    <StyledSectionList
      onScroll={onScroll}
      refreshControl={refreshControl}
      ListHeaderComponent={header}
      stickySectionHeadersEnabled={false}
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

const StyledSectionList = styled(AnimatedSectionList).attrs(({ theme }) => ({
  style: {
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR
  }
}))``

const Spacer = styled.View`
  height: 100px;
`
