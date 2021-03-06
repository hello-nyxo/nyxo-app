import React, { FC } from 'react'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { IconBold } from '../iconRegular'

type Props = {
  onPress: () => void
  style: Animated.AnimateStyle<ViewStyle>
}

const InfoButton: FC<Props> = ({ onPress, style }) => (
  <Container style={style}>
    <Touchable onPress={onPress}>
      <IconBold
        width={20}
        height={20}
        fill={colors.darkBlue}
        name="informationCircle"
      />
    </Touchable>
  </Container>
)

export default InfoButton

const Container = styled(Animated.View)`
  position: absolute;
  bottom: 25px;
  right: 35px;
`

const Touchable = styled.TouchableOpacity`
  padding: 5px;
`
