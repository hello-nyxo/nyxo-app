import React, { FC } from 'react'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { IconBold } from '../iconRegular'

type Props = {
  onPress: () => void
}

const InfoButton: FC<Props> = ({ onPress }) => (
  <Container>
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

const Container = styled.View`
  position: absolute;
  bottom: 25px;
  right: 35px;
`

const Touchable = styled.TouchableOpacity`
  padding: 5px;
`
