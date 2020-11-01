import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import styled from 'styled-components/native'
import { StyleProps } from '@styles/themes'
import { IconBold } from '../iconRegular'

interface Props {
  route?: string
}

const GoBack = ({ route }: Props) => {
  const navigation = useNavigation()

  const handlePress = () => {
    route ? navigation.navigate(route, {}) : navigation.goBack()
  }

  return (
    <Container onPress={handlePress}>
      <Background>
        <Icon name="arrowLineLeft" height={20} width={20} />
      </Background>
    </Container>
  )
}

export default memo(GoBack)

const Container = styled.TouchableOpacity`
  padding: 20px 0px;
`

export const Spacer = styled.View`
  flex: 2;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
}))``

const Background = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  padding: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  overflow: hidden;
  max-width: 40px;
  max-height: 40px;
  box-shadow: ${({ theme }) => theme.SHADOW};
`

export const GoBackContainer = styled.View`
  padding: 0px 20px;
`
