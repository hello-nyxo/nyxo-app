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

export const IconRegular = (props: Props) => {
  const { stroke, focused, name } = props

  if (focused) {
    return (
      <SvgIcon {...props} name={name} stroke={stroke} viewBox="0 0 24 24" />
    )
  }
  return <SvgIcon {...props} fill="none" viewBox="0 0 24 24" />
}

export const IconBold: FC<Props> = (props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" />
)

export const IconLight = (props: Props) => (
  <SvgIcon {...props} viewBox="0 0 24 24" />
)
