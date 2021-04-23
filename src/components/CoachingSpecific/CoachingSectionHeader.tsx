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
  background-color: ${({ theme }) => theme.bgPrimary};
  padding: 30px 20px 20px;
`

const SectionTitle = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.bold};
  font-size: 22px;
  color: ${({ theme }) => theme.textPrimary};
`

const Subtitle = styled(TranslatedText)`
  margin-top: 5px;
  font-family: ${({ theme }) => theme.medium};
  font-size: 13px;
  color: ${({ theme }) => theme.textSecondary};
`
