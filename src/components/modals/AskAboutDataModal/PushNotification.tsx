import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components/native'
import { askForPush } from '@actions/NotificationActions'
import { fonts, StyleProps } from '../../../styles/themes'
import { PrimaryButton } from '../../Buttons/PrimaryButton'
import { P } from '../../Primitives/Primitives'
import TranslatedText from '../../TranslatedText'

interface Props {
  scrollNext: Function
}

const PushNotification = (props: Props) => {
  const dispatch = useDispatch()

  const connectSource = async () => {
    await dispatch(askForPush())
    props.scrollNext()
  }

  return (
    <Container>
      <Title>WELCOME_NOTIFICATION_TITLE</Title>
      <P>WELCOME_NOTIFICATION</P>
      <PrimaryButton
        onPress={connectSource}
        title="WELCOME_NOTIFICATION_BUTTON"
      />
    </Container>
  )
}

export default memo(PushNotification)

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
  background-color: transparent;
`
