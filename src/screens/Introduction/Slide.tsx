import * as React from 'react'
import styled from 'styled-components/native'
import TranslatedText from '../../components/TranslatedText'
import { fonts } from '../../styles/themes'

interface SlideProps {
  title: string
  text: string
}

const Slide = (props: SlideProps) => {
  return (
    <>
      <Title>{props.title}</Title>

      <Body>{props.text}</Body>
    </>
  )
}

export default React.memo(Slide)

const Title = styled(TranslatedText)`
  margin: 10px 20px 10px;
  font-size: 25;
  color: black;
  text-align: center;
  font-family: ${fonts.bold};
`

const Body = styled(TranslatedText)`
  color: black;
  text-align: center;
  font-family: ${fonts.medium};
  font-size: 17px;
  margin: 0px 20px;
`
