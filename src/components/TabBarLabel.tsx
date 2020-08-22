import * as React from 'react'
import styled from 'styled-components/native'
import translate from '../config/i18n'
import colors from '../styles/colors'
import { fonts, StyleProps } from '../styles/themes'

export interface TabBarLabelProps {
  focused: boolean
  tintColor: string
  children: any
}

const TabBarLabel = (props: TabBarLabelProps) => (
  <Text adjustsFontSizeToFit focused={props.focused} {...props}>
    {translate(props.children)}
  </Text>
)

export default TabBarLabel

interface TextProps extends StyleProps {
  readonly focused?: boolean
}

const Text = styled.Text<TextProps>`
  font-size: 12px;
  text-align: center;
  color: ${(props: TextProps) =>
    props.focused ? colors.radiantBlue : props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${(props: TextProps) =>
    props.focused ? fonts.bold : fonts.medium};
`
