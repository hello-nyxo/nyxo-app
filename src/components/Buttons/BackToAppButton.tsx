import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import TranslatedText from '../TranslatedText'

const BackToAppButton = () => {
  const navigation = useNavigation()

  const getBackToApp = () => {
    navigation.navigate('Sleep')
  }

  return (
    <Container>
      <Button onPress={getBackToApp}>
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
  color: ${colors.radiantBlue};
`
