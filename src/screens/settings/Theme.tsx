import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import { H2, Switch } from '@components/Primitives/Primitives'
import TranslatedText from '@components/TranslatedText'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { toggleUseSystemTheme, toggleTheme } from '@reducers/theme'

export const ThemeScreen: FC = () => {
  const { followSystemTheme, theme } = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  const setFollowSystemTheme = () => {
    dispatch(toggleUseSystemTheme(!followSystemTheme))
  }

  const setTheme = () => {
    dispatch(toggleTheme(theme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <Container>
      <ScrollView>
        <GoBackContainer>
          <GoBack />
        </GoBackContainer>
        <H2>THEME.TITLE</H2>

        <Row>
          <Label>THEME.FOLLOW_SYSTEM_THEME</Label>
          <Switch
            onValueChange={setFollowSystemTheme}
            value={followSystemTheme}
          />
        </Row>
        <Row>
          <Label>THEME.DARK</Label>
          <Switch
            disabled={followSystemTheme}
            onValueChange={setTheme}
            value={theme === 'dark'}
          />
        </Row>
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

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 16px 0px;
`

const Label = styled(TranslatedText)`
  flex: 1;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 15px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
