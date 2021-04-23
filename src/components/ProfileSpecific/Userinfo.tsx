import React, { memo } from 'react'
import styled from 'styled-components/native'

import { fonts } from '@styles/themes'
import { Container } from '../Primitives/Primitives'
import { useAppSelector } from '@hooks/redux'

const UserInfo = () => {
  const email = useAppSelector(({ auth }) => auth.email)

  return (
    <Container>
      <Email>{email}</Email>
    </Container>
  )
}

export default memo(UserInfo)

const Email = styled.Text`
  font-family: ${fonts.medium};
  font-size: 14px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
