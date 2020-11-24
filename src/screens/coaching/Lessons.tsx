import LessonListItem from '@components/LessonComponents/LessonListItem'
import SectionHeader from '@components/LessonComponents/SectionHeader'
import keyExtractor from '@helpers/KeyExtractor'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import {
  CombinedLesson,
  CombinedLessonArray,
  getCoachingLessonsForWeek
} from '@selectors/coaching-selectors/coaching-selectors'
import { Section } from '@typings/CoachingContentState'
import { groupBy } from 'lodash'
import React, { FC, memo, ReactElement } from 'react'
import { ListRenderItem, SectionList } from 'react-native'
import Animated from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

type RenderSectionHeader = ({
  section: { header }
}: {
  section: { header: Section }
}) => React.ReactElement | null

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
  const withData = lessons.map((lesson) => {
    return {
      ...lesson,
      completed: !!data?.lessons?.find((lssn) => lesson.slug === lssn)
    }
  })

  const groupedLessons = groupBy(withData, (lesson) => lesson.section?.title)
  const sectionData = withData.map((item) => ({
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

  const renderCard: ListRenderItem<CombinedLesson> = ({ item }) => (
    <LessonListItem key={item.slug} locked={locked} lesson={item} />
  )

  const renderSectionHeader: RenderSectionHeader = ({ section }) => (
    <SectionHeader
      key={`${section.header.title}`}
      description={section.header.description}
      title={`${section.header.title}`}
    />
  )

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
