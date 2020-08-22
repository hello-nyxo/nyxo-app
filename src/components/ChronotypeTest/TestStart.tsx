import React, { memo } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { fonts } from '../../styles/themes'
import { PrimaryButton } from '../Buttons/PrimaryButton'
import { Container } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

interface Props {
  start: Function
}

const TestStart = (props: Props) => {
  const startTest = () => {
    props.start()
  }

  return (
    <Page>
      <Container>
        <Title>CHRONOTYPE</Title>
        <Intro>CHRONOTYPE_INTRO</Intro>
        <PrimaryButton white onPress={startTest} title="START_TEST" />
      </Container>
    </Page>
  )
}

export default memo(TestStart)

const { width } = Dimensions.get('window')

const Page = styled.View`
  width: ${width}px;
  flex: 1;
`

const Intro = styled(TranslatedText)`
  font-size: 17px;
  font-family: ${fonts.medium};
  line-height: 30;
  color: white;
`

const Title = styled(TranslatedText)`
  font-family: ${fonts.bold};
  color: white;
  font-size: 30px;
  margin-bottom: 20px;
`
