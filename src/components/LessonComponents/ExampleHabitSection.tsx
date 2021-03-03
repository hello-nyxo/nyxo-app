import keyExtractor from '@helpers/KeyExtractor'
import { fonts } from '@styles/themes'
import { HabitCollectionItem } from '@typings/contentful'
import React, { FC } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import ExampleHabit, {
  EXAMPLE_HABIT_MARGIN_LEFT,
  EXAMPLE_HABIT_WIDTH
} from '../HabitCard/ExampleHabit'
import { H3Margin } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

type Props = {
  habits?: HabitCollectionItem[]
}

const ExampleHabitSection: FC<Props> = ({ habits }) => {
  if (!habits) return null

  const contentOffsets = habits.map(
    (_, index) => (EXAMPLE_HABIT_WIDTH + EXAMPLE_HABIT_MARGIN_LEFT) * index
  )
  const renderHabit: ListRenderItem<HabitCollectionItem> = ({
    item: habit
  }) => (
    <ExampleHabit
      key={`${habit?.title}`}
      title={habit?.title}
      period={habit?.period}
      description={habit?.description?.json}
    />
  )

  return (
    <>
      <H3>EXAMPLE_HABITS</H3>
      <TextSmall>TRY_THIS_HABIT</TextSmall>
      <List
        keyExtractor={keyExtractor}
        centerContent
        horizontal
        data={habits}
        renderItem={renderHabit}
        snapToOffsets={contentOffsets}
        decelerationRate="fast"
      />
    </>
  )
}

export default ExampleHabitSection

const List = styled(FlatList as new () => FlatList<HabitCollectionItem>).attrs(
  () => ({
    contentContainerStyle: {
      paddingVertical: 20
    }
  })
)``

const TextSmall = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  margin: 10px 20px;
`

const H3 = styled(H3Margin)`
  margin-top: 20px;
`
