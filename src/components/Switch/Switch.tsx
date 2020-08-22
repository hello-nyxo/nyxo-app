import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../styles/themes'

interface Props {
  valueChange: Function
  value: boolean
  title: string
}

const LinkSource = (props: Props) => {
  const { valueChange, title, value } = props

  const handleOnValueChange = (value: boolean) => {
    valueChange(value)
  }

  return (
    <Row>
      <Source>{title}</Source>
      <Toggle onValueChange={handleOnValueChange} value={value} />
    </Row>
  )
}

export default memo(LinkSource)

const Row = styled.View`
  margin: 20px 0px;
  padding: 5px 0px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const Source = styled.Text`
  font-family: ${fonts.bold};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Toggle = styled.Switch``
