import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import { H2 } from '@components/Primitives/Primitives'
import { useAppSelector } from '@hooks/redux'
import React, { FC } from 'react'
import styled from 'styled-components/native'

export const ThemeScreen: FC = () => {
  const { followSystemTheme, theme } = useAppSelector((state) => state.theme)

  return (
    <Container>
      <ScrollView>
        <GoBackContainer>
          <GoBack />
        </GoBackContainer>
        <H2>CONTROL_NOTIFICATIONS</H2>

        <Switch value={followSystemTheme}></Switch>
      </ScrollView>
    </Container>
  )
}

const Container = styled.SafeAreaView`
  padding: 0px 16px;
`

const ScrollView = styled.ScrollView`
  padding: 0px 16px;
`

const Switch = styled.Switch``
