import React from 'react'
import styled from 'styled-components/native'
import { StyleProps } from '@styles/themes'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { H3, P } from '../Primitives/Primitives'

interface Props {
  refresh: Function
}

const RefreshCoaching = (props: Props) => {
  const refresh = () => {
    props.refresh()
  }

  return (
    <Card>
      <H3M>COACHING_MISSING</H3M>
      <PM>REFRESH_COACHING_INFO</PM>
      <PrimaryButton title="REFRESH_COACHING" onPress={refresh} />
    </Card>
  )
}

export default RefreshCoaching

const Card = styled.View`
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  width: 250px;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
`

const H3M = styled(H3)`
  margin-bottom: 30px;
`

const PM = styled(P)`
  margin-bottom: 30px;
`
