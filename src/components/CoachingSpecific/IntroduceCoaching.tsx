import Card from '@components/Card'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../styles/themes'
import { Container } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

export const IntroduceCoaching: FC = () => {
  return (
    <Container>
      <Card>
        <SubTitle>NYXO_COACHING_INTRO</SubTitle>
        <MiniText>WHY_BUY_1</MiniText>
        <MiniText>WHY_BUY_2</MiniText>
      </Card>
    </Container>
  )
}

const SubTitle = styled(TranslatedText)`
  font-family: ${fonts.bold};
  font-size: 17px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  margin-bottom: 10px;
`

const MiniText = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 15px;
  line-height: 20px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  margin-bottom: 10px;
`
