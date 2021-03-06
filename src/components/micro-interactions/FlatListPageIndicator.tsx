import { WIDTH } from '@helpers/Dimensions'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import Animated, { interpolate } from 'react-native-reanimated'
import styled from 'styled-components/native'

export type Props = {
  data: Array<unknown>
  scrollX: Animated.Value<number>
  style?: ViewStyle
  dotStyle?: ViewStyle
  inActiveDotOpacity?: number
  expandingDotWidth?: number
  width?: number
}

export const ExpandingDot: FC<Props> = ({
  scrollX,
  data,
  dotStyle,
  style,
  inActiveDotOpacity,
  expandingDotWidth,
  width = WIDTH
}) => {
  const defaultProps = {
    inActiveDotOpacity: inActiveDotOpacity || 0.5,
    expandingDotWidth: expandingDotWidth || 20,
    dotWidth: (dotStyle?.width as number) || 10
  }

  return (
    <Container style={style}>
      {data.map((_, index: number) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width
        ]

        const opacity = interpolate(scrollX, {
          inputRange,
          outputRange: [
            defaultProps.inActiveDotOpacity,
            1,
            defaultProps.inActiveDotOpacity
          ],
          extrapolateRight: Animated.Extrapolate.CLAMP,
          extrapolateLeft: Animated.Extrapolate.CLAMP
        })
        const expand = interpolate(scrollX, {
          inputRange,
          outputRange: [
            defaultProps.dotWidth,
            defaultProps.expandingDotWidth,
            defaultProps.dotWidth
          ],
          extrapolateRight: Animated.Extrapolate.CLAMP,
          extrapolateLeft: Animated.Extrapolate.CLAMP
        })

        return (
          <Dot
            // eslint-disable-next-line react/no-array-index-key
            key={`dot-${index}`}
            style={[dotStyle, { width: expand }, { opacity }]}
          />
        )
      })}
    </Container>
  )
}

const Container = styled.View`
  position: absolute;
  bottom: 0px;
  flex-direction: row;
`

const Dot = styled(Animated.View)`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 5px;
  margin: 0px 5px;
`
