import React, { memo } from 'react'
import styled from 'styled-components/native'
import { constants, fonts, StyleProps } from '@styles/themes'

const data = [
  {
    efficiency: 0.7,
    duration: 1,
    bedtime: 0.9,
    jetlag: 0.67,
    consistency: 0.8
  },
  {
    efficiency: 0.6,
    duration: 0.9,
    bedtime: 0.8,
    jetlag: 0.7,
    consistency: 0.6
  }
]

const ProfileChart = () => {
  return (
    <PhotoContainer>
      <Image resizeMode="contain" source={require('../../assets/chart.png')} />
      <Explanation />
      {/* <Svg height={300} width={300}></Svg> */}
    </PhotoContainer>
  )
}

export default memo(ProfileChart)

const PhotoContainer = styled.View`
  margin: 0px 20px 20px;
  height: 300px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom-color: ${(props: StyleProps) => props.theme.HAIRLINE_COLOR};
  border-bottom-width: ${constants.hairlineWidth}px;
`

const Image = styled.Image`
  flex: 1;
  z-index: 0;
  width: 100%;
  height: 100%;
`

const Explanation = styled.Text`
  font-family: ${fonts.medium};
`
