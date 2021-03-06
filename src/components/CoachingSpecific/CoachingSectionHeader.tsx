import React, { FC, ReactElement } from 'react'
import { SectionListData } from 'react-native'
import styled from 'styled-components/native'
import { Habit } from '@typings/state/habit-state'
import { fonts } from '@styles/themes'
import TranslatedText from '../TranslatedText'

type Props = {
  title: string
  data: SectionListData<Habit>[] | null
  subtitle: string
}
const CoachingSectionHeader: FC<Props> = ({
  data,
  title,
  subtitle
}): null | ReactElement =>
  !data || data.length !== 0 ? (
    <SectionHeader>
      <SectionTitle>{title}</SectionTitle>
      <Subtitle>{subtitle}</Subtitle>
    </SectionHeader>
  ) : null

export default CoachingSectionHeader

const SectionHeader = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  padding: 30px 20px 20px;
`

const SectionTitle = styled(TranslatedText)`
  font-family: ${fonts.bold};
  font-size: 22px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Subtitle = styled(TranslatedText)`
  margin-top: 5px;
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
