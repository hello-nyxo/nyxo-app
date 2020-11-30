import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import { fonts } from '../../../styles/themes'

type Props = {
  authorize: () => void
  sourceName: string
}

const LinkSource: FC<Props> = ({ authorize, sourceName }) => {
  const handleLink = () => {
    authorize()
  }
  return (
    <Row>
      <Source>{sourceName}</Source>
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
