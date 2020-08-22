import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../../styles/themes'
import { PrimaryButton } from '../../Buttons/PrimaryButton'
import { P } from '../../Primitives/Primitives'
import TranslatedText from '../../TranslatedText'

interface Props {
  scrollNext: Function
}

const HealthKit = (props: Props) => {
  const dispatch = useDispatch()

  const connectSource = async () => {
    // TODO
    await props.scrollNext()
  }

  return (
    <Container>
      <Title>WELCOME_TITLE</Title>
      <P>WELCOME_PERMISSIONS_IOS</P>
      <PrimaryButton onPress={connectSource} title="WELCOME_BUTTON_IOS" />
    </Container>
  )
}

export default memo(HealthKit)

const Title = styled(TranslatedText)<StyleProps>`
  text-align: center;
  font-size: 28px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`
