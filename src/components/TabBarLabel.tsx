import React, { FC } from 'react'
import styled from 'styled-components/native'
import translate from '../config/i18n'

type Props = {
  focused: boolean
  tintColor: string
  label: string
}

const TabBarLabel: FC<Props> = ({ focused, label }) => (
  <Text adjustsFontSizeToFit focused={focused}>
    {translate(label.toUpperCase())}
  </Text>
)

export default TabBarLabel

interface TextProps {
  readonly focused?: boolean
}

const Text = styled.Text<TextProps>`
  font-size: 12px;
  text-align: center;
  color: ${({ focused, theme }) =>
    focused ? theme.accent : theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
`
