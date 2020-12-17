import React, { FC, memo, useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { Animated } from 'react-native'
import { IconBold } from '../iconRegular'

type Props = {
  hide: boolean
  onPress: () => void
}

const InfoButton: FC<Props> = ({ hide, onPress }) => {
  const animationValue = useRef(new Animated.Value(0)).current
  useEffect(() => {
    if (hide) {
      animationValue.setValue(1)
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      }).start()
    } else {
      animationValue.setValue(0)
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }).start()
    }
  }, [hide])

  return (
    <Container
      style={{
        opacity: animationValue,
        transform: [{ scale: animationValue }]
      }}>
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
}

export default memo(InfoButton)

const Container = styled(Animated.View)`
  position: absolute;
  bottom: 25px;
  right: 35px;
`

const Touchable = styled.TouchableOpacity`
  padding: 5px;
`
