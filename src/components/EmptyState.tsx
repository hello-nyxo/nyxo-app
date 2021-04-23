import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import { IconBold } from './iconRegular'
import TranslatedText from './TranslatedText'

interface Props {
  text?: string
}

const EmptyState: FC<Props> = ({ text }) => {
  return (
    <Container>
      <Icon name="smileyDisappointed" height={50} width={50} />
      <Text>{text || 'EmptyState'}</Text>
    </Container>
  )
}

export default memo(EmptyState)

const Container = styled.View`
  margin: 40px 0px;
  padding: 0px 20px;
  flex-direction: column;
  align-items: center;
`

const Text = styled(TranslatedText)`
  margin-top: 10px;
  font-size: 17px;
  text-align: center;
  font-family: ${({ theme }) => theme.bold};
  color: ${({ theme }) => theme.textSecondary};
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.textSecondary
}))``
