import React, { ReactElement } from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components/native'
import { lightTheme } from '@styles/themes'

export function matchComponentToSnapshot(component: ReactElement): void {
  const json = renderer
    .create(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>)
    .toJSON()
  expect(json).toMatchSnapshot()
}
