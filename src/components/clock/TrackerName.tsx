import React, { FC } from 'react'
import { Text } from 'react-native-svg'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'

type Props = {
  x: number
  y: number
}

const TrackerName: FC<Props> = ({ x, y }) => {
  return (
    <ThemedText
      textAnchor="middle"
      fontSize="13"
      fontFamily={fonts.bold}
      fontWeight="500"
      alignmentBaseline="mathematical"
      x={x}
      y={y + 90}>
      Nyxo
    </ThemedText>
  )
}

export default React.memo(TrackerName)

const ThemedText = styled(Text).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))``
