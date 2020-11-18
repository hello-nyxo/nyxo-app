import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '@styles/themes'
import ScalingButton from './ScalingButton'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'

interface BackButtonInterface {
  title?: string
  dark?: boolean
  contentContainerStyle?: any
  route?: string
}

const BackButton = (props: BackButtonInterface) => {
  const navigation = useNavigation()

  const handlePress = () => {
    props.route ? navigation.navigate(props.route, {}) : navigation.goBack()
  }

  return (
    <Container onPress={handlePress} analyticsEvent="Back button">
      <Button>
        <Icon name="chevronLeft" height={20} width={20} />
        {props.title ? <Text dark={props.dark}>{props.title}</Text> : null}
      </Button>
    </Container>
  )
}

export default memo(BackButton)

const Container = styled(ScalingButton)`
  flex: 1;
`

const Button = styled.View`
  flex-direction: row;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``

interface TextProps extends StyleProps {
  readonly dark?: boolean
}
const Text = styled(TranslatedText)<TextProps>`
  margin-left: 5px;
  font-size: 15px;
  font-family: ${fonts.medium};
  color: ${(props: TextProps) => theme.PRIMARY_TEXT_COLOR};
`
