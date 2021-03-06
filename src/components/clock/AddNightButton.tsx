import React, { FC } from 'react'
import styled from 'styled-components/native'
import { IconBold } from '@components/iconRegular'
import Animated from 'react-native-reanimated'
import { ViewStyle } from 'react-native'

type Props = {
  onPress: () => void
  style: Animated.AnimateStyle<ViewStyle>
}

const AddNightButton: FC<Props> = ({ onPress, style }) => (
  <Container style={style}>
    <Touchable onPress={onPress}>
      <ThemedIcon width={20} height={20} name="doubleBedAdd" />
    </Touchable>
  </Container>
)

export default AddNightButton

const Container = styled(Animated.View)`
  position: absolute;
  bottom: 25px;
  left: 35px;
`

const Touchable = styled.TouchableOpacity`
  padding: 5px;
`

const ThemedIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.accent
}))``
