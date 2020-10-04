import React, { FC } from 'react'
import styled from 'styled-components/native'
import TranslatedText from '@components/TranslatedText'
import TextButton from '@components/Buttons/TextButton'
import { displayMessageComposer } from 'react-native-intercom'

const QuestionCard: FC = () => {
  const openChat = () => {
    displayMessageComposer()
  }

  return (
    <Container>
      <Title>QUESTION.TITLE</Title>
      <Text>QUESTION.TEXT</Text>
      <TextButton onPress={openChat}>QUESTION.OPEN_CHAT</TextButton>
    </Container>
  )
}

export default QuestionCard

const Container = styled.View`
  padding: 24px 16px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  width: 100%;
  border-radius: 7px;
  box-shadow: ${({ theme }) => theme.SHADOW};
`

const Title = styled(TranslatedText)`
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 15px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 16px;
`

const Text = styled(TranslatedText)`
  text-align: center;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  margin-bottom: 16px;
`
