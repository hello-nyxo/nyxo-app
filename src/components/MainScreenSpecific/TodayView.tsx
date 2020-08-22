import React, { memo } from 'react'
import styled from 'styled-components/native'
import { useSelector } from 'react-redux'
import { H2, P, Container, Bordered } from '../Primitives/Primitives'
import { getCurrentDaySuggestOtherSource } from '../../store/Selectors/SmartActionsSelectors'
import { getTitle } from '../../helpers/time'

export const TodayView = () => {
  const { title } = getTitle()
  const suggestion = useSelector(getCurrentDaySuggestOtherSource)
  return (
    <Container>
      <Bordered>
        <H2>{title}</H2>
        <Text>{suggestion || 'ALL_GOOD'}</Text>
      </Bordered>
    </Container>
  )
}

export default memo(TodayView)

const Text = styled(P)`
  min-height: 60px;
  margin-bottom: 10px;
`
