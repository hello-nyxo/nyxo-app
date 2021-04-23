import LessonListItem from '@components/LessonComponents/LessonListItem'
import SectionHeader from '@components/LessonComponents/SectionHeader'
import keyExtractor from '@helpers/KeyExtractor'
import { useGetActiveCoaching } from '@hooks/coaching/useCoaching'
import { getWeek, useWeek } from '@hooks/coaching/useWeek'
import { LessonCollectionItem } from '@typings/contentful'
import groupBy from 'lodash/groupBy'
import React, { FC, ReactElement } from 'react'
import { ListRenderItem, SectionList } from 'react-native'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { Document } from '@contentful/rich-text-types'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)

type Section = {
  title: string
  description: {
    json: Document
  }
}

type RenderSectionHeader = ({
  section: { header }
}: {
  section: { header: Section }
}) => React.ReactElement | null

type Props = {
  slug?: string
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
  slug,
  refreshControl,
  ...rest
}) => {
  const { data } = useGetActiveCoaching()
  const { data: weekData } = useWeek(slug ?? 'introduction')
  const week = getWeek(weekData)

  const withData = week?.lessonsCollection.items.map((lesson) => ({
    ...lesson,
    completed: !!data?.lessons?.find((lssn) => lesson.slug === lssn)
  }))

  const groupedLessons = groupBy(withData, (lesson) => lesson.section?.title)
  const sectionData = withData?.map((item) => ({
    title: item.section?.title,
    description: item.section?.description,
    order: item.section?.order
  }))

  const sections = Object.entries(groupedLessons).map((group) => ({
    header: { ...sectionData?.find((item) => item.title === group[0]) },
    data: group[1]
  }))

  const renderCard: ListRenderItem<LessonCollectionItem> = ({ item }) => (
    <LessonListItem key={item?.slug} locked={locked} lesson={item} />
  )

  const renderSectionHeader: RenderSectionHeader = ({ section }) => (
    <SectionHeader
      key={`${section.header.title}`}
      description={section.header.description?.json}
      title={`${section.header.title}`}
    />
  )

  return (
    <StyledSectionList
      scrollEventThrottle={16}
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
      {...rest}
    />
  )
}

export default LessonList

const StyledSectionList = styled(AnimatedSectionList).attrs(({ theme }) => ({
  style: {
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR
  }
}))``

const Spacer = styled.View`
  height: 100px;
`
