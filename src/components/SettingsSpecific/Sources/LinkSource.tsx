import React, { memo } from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../../styles/themes'

interface LinkSourceProps {
  authorize: Function
  sourceName: string
}

const LinkSource = (props: LinkSourceProps) => {
  const { authorize } = props
  const handleLink = () => {
    authorize()
  }
  return (
    <Row>
      <Source>{props.sourceName}</Source>
      <Toggle onValueChange={handleLink} />
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
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Toggle = styled.Switch``
