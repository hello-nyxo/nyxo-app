import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getEmail, getIntercomId } from '@selectors/UserSelectors'
import { fonts, StyleProps } from '@styles/themes'
import { Container } from '../Primitives/Primitives'

const UserInfo = () => {
  const email = useSelector(getEmail)
  const intercomId = useSelector(getIntercomId)

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
