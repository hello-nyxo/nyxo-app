import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import { constants, fonts } from '../styles/themes'
import TranslatedText from './TranslatedText'

type Props = {
  title: string
  figure: string
}

const InfoRow: FC<Props> = ({ title, figure }) => {
  return (
    <Row>
      <Title>{title}</Title>
      <Figure>{figure}</Figure>
    </Row>
  )
}

export default memo(InfoRow)

const Row = styled.View`
  padding: 20px 0px;
  margin: 0px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.textSecondary};
`

export const Title = styled(TranslatedText)`
  text-align: center;
  font-size: 17px;
  font-family: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.textPrimary};
`

const Figure = styled.Text`
  text-align: center;
  font-size: 17px;
  font-family: ${({ theme }) => theme.medium};
  color: ${({ theme }) => theme.textPrimary};
`
