import React, { FC } from 'react'
import styled from 'styled-components/native'
import { IconBold } from '@components/iconRegular'
import TranslatedText from '@components/TranslatedText'
import colors from '@styles/colors'
import { H5, P } from '../Primitives/Primitives'

type Props = {
  title: string
  description: string
  closeFunction: () => void
  agreeFunction: () => void
  buttonText?: string
}

const NotificationCard: FC<Props> = ({
  title,
  description,
  closeFunction,
  agreeFunction,
  buttonText
}) => {
  const handleClose = () => {
    closeFunction()
  }

  const handleAgree = () => {
    agreeFunction()
  }

  return (
    <Container>
      <TitleRow>
        <Title>{`${title}`}</Title>
        <CloseButton onPress={handleClose}>
          <CloseIcon />
        </CloseButton>
      </TitleRow>
      <Description>{`${description}`}</Description>
      {buttonText && (
        <Button onPress={handleAgree}>
          <ButtonText>{buttonText}</ButtonText>
        </Button>
      )}
    </Container>
  )
}

export default NotificationCard

const Container = styled.View`
  margin: 0px 20px 20px;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  box-shadow: ${({ theme }) => theme.SHADOW};
  padding: 20px;
  border-radius: 10px;
  flex: 1;
`

const Title = styled(H5)`
  flex: 1;
`

const Description = styled(P)``

const TitleRow = styled.View`
  flex-direction: row;
  flex: 1;
`

const CloseButton = styled.TouchableOpacity``

const CloseIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR,
  height: 20,
  width: 20,
  name: 'closeCircle'
}))``

const Button = styled.TouchableOpacity``

const ButtonText = styled(TranslatedText)`
  font-size: 15px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${colors.darkBlue};
  text-align: center;
  margin: 20px 0px 0px;
`
