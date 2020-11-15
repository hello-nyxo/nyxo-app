import { useNavigation } from '@react-navigation/native'
import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import { IconBold } from '../iconRegular'

interface Props {
  route?: string
}

const GoBack: FC<Props> = ({ route }) => {
  const navigation = useNavigation()

  const handlePress = () => {
    if (route) {
      navigation.navigate(route, {})
    } else {
      navigation.goBack()
    }
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
