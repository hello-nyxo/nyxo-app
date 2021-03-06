import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import Card from '@components/Card'
import TranslatedText from '@components/TranslatedText'
import { canEndCoaching } from '@helpers/coaching/coaching'
import { format } from 'date-fns'
import React, { FC } from 'react'
import styled from 'styled-components/native'

type Props = {
  started?: string | null
  ended?: string | null
  isCurrentlyActive: boolean
  startWeek: () => void
  endWeek: () => void
  isLoading: boolean
  isSuccess: boolean
}

export const WeekActions: FC<Props> = ({
  started,
  ended,
  isCurrentlyActive,
  startWeek,
  endWeek,
  isLoading
}) => {
  const startTime = started ? format(new Date(started), 'dd.MM') : ''
  const endTime = ended ? format(new Date(ended), 'dd.MM') : ''
  const canEnd = canEndCoaching(started, 0) && started && !ended

  const canStart = !isCurrentlyActive && !started

  return (
    <Container>
      <Card>
        <DurationRow>
          {started && (
            <Started variables={{ started: startTime }}>
              WEEK_VIEW.START_DATE
            </Started>
          )}
          {ended && (
            <Ended variables={{ ended: endTime }}>WEEK_VIEW.END_DATE</Ended>
          )}
        </DurationRow>
        {canStart ? (
          <PrimaryButton
            title="WEEK.BEGIN"
            onPress={startWeek}
            loading={isLoading}
          />
        ) : null}

        {canEnd ? (
          <PrimaryButton
            title="WEEK.COMPLETE"
            onPress={endWeek}
            loading={isLoading}
          />
        ) : null}
      </Card>
    </Container>
  )
}

const Container = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  padding: 32px 16px 8px;
  flex: 0;

  height: auto;
`

const DurationRow = styled.View`
  flex-direction: row;
  padding: 10px 0px;
`

const Started = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Ended = styled(TranslatedText)`
  font-size: 13px;
  margin-right: 10px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
