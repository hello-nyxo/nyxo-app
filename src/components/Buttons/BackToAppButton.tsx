import { fonts } from '@styles/themes'
import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

type Props = {
  back: () => void
}

const BackToAppButton: FC<Props> = ({ back }) => {
  return (
    <Container>
      <Button onPress={back}>
        <ButtonText>Get back to Nyxo</ButtonText>
      </Button>
    </Container>
  )
}

export default memo(BackToAppButton)

const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

const Container = styled.View`
  margin: 30px;
`

const ButtonText = styled(TranslatedText)`
  font-family: ${fonts.bold};
  font-size: 15px;
  padding: 5px;
  color: ${colors.darkBlue};
`
