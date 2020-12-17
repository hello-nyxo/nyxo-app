import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { IconBold } from '@components/iconRegular'
import { Animated } from 'react-native'

type Props = {
  hide: boolean
  onPress: () => void
}

const AddNightButton: FC<Props> = ({ hide, onPress }) => {
  const animationValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (hide) {
      animationValue.setValue(1)
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true
      }).start()
    } else {
      animationValue.setValue(0)
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 150,
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
          name="doubleBedAdd"
        />
      </Touchable>
    </Container>
  )
}

export default AddNightButton

const Container = styled(Animated.View)`
  position: absolute;
  bottom: 25px;
  left: 35px;
`

const Touchable = styled.TouchableOpacity`
  padding: 5px;
`
