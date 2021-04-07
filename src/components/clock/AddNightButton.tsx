import React, { FC } from 'react'
import styled from 'styled-components/native'
import { IconBold } from '@components/iconRegular'

type Props = {
  onPress: () => void
}

const AddNightButton: FC<Props> = ({ onPress }) => (
  <Container>
    <Touchable onPress={onPress}>
      <ThemedIcon width={20} height={20} name="doubleBedAdd" />
    </Touchable>
  </Container>
)

export default AddNightButton

const Container = styled.View`
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
