import React, { FC } from 'react'
import SvgIcon from './SvgIcon'

interface Props {
  fill: string
  fillRule?: string
  height: number | string
  name: string
  stroke?: string
  strokeWidth?: number | string
  style?: any
  width: number | string
  viewBox?: string
  focused?: boolean
}

export const IconRegular: FC<Props> = ({ stroke, focused, name, ...rest }) => {
  if (focused) {
    return <SvgIcon {...rest} name={name} stroke={stroke} viewBox="0 0 24 24" />
  }
  return <SvgIcon {...rest} fill="none" viewBox="0 0 24 24" />
}

export const IconBold: FC<Props> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" />
)

export const IconLight = (props: Props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" />
)
