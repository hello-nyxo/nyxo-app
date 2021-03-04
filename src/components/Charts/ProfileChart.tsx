import React, { memo } from 'react'
import styled from 'styled-components/native'
import { constants, fonts } from '@styles/themes'

const ProfileChart = () => (
  <PhotoContainer>
    <Image resizeMode="contain" source={require('../../assets/chart.png')} />
    <Explanation />
  </PhotoContainer>
)

export default memo(ProfileChart)

const PhotoContainer = styled.View`
  margin: 0px 20px 20px;
  height: 300px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
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
