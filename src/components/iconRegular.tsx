import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import SvgIcon from './SvgIcon'

interface Props {
  fill: string
  fillRule?: string
  height: number | string
  name?: string
  stroke?: string
  strokeWidth?: number | string
  style?: ViewStyle
  width: number | string
  viewBox?: string
  focused?: boolean
}

export const IconRegular: FC<Props> = ({ stroke, focused, name, ...rest }) => {
  if (focused) {
    return (
      <SvgIcon
        {...rest}
        name={name ?? 'closeCircle'}
        stroke={stroke}
        viewBox="0 0 24 24"
      />
    )
  }
  return <SvgIcon {...rest} fill="none" viewBox="0 0 24 24" />
}

export const IconBold: FC<Props> = ({ name, ...props }) => (
  <SvgIcon {...props} name={name ?? 'closeCircle'} viewBox="0 0 24 24" />
)

export const IconLight: FC<Props> = ({ name, ...props }) => (
  <SvgIcon {...props} name={name ?? 'closeCircle'} viewBox="0 0 24 24" />
)
