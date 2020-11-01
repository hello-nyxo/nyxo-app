import React, { memo } from 'react'
import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { ExampleHabit as ExampleHabitType } from '@typings/CoachingContentState'
import { fonts, StyleProps } from '@styles/themes'
import keyExtractor from '@helpers/KeyExtractor'
import { H3Margin } from '../Primitives/Primitives'
import ExampleHabit from '../HabitCard/ExampleHabit'
import TranslatedText from '../TranslatedText'

const ExampleHabitSection = ({
  habits
}: {
  habits: ExampleHabitType[] | undefined
}) => {
  if (!habits) return null

  const renderHabit = ({
    item: habit,
    index
  }: {
    item: ExampleHabitType
    index: number
  }) => {
    return (
      <ExampleHabit
        key={index}
        title={habit.title}
        period={habit.period}
        description={habit.description}
      />
    )
  }

  return (
    <>
      <H3>EXAMPLE_HABITS</H3>
      <TextSmall>TRY_THIS_HABIT</TextSmall>
      <FlatList
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingVertical: 20 }}
        centerContent
        pagingEnabled
        horizontal
        data={habits}
        renderItem={renderHabit}
      />
    </>
  )
}

export default memo(ExampleHabitSection)

const TextSmall = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  margin: 10px 20px;
`

// EXAMPLE_HABIT_EXPLANATION

const H3 = styled(H3Margin)`
  margin-top: 20px;
`
