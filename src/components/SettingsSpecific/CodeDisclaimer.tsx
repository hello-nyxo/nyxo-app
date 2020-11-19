import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { constants, fonts, StyleProps } from '@styles/themes'
import TranslatedText from '../TranslatedText'

interface Props {
  linkCode?: string
}

const CodeDisclaimer = ({ linkCode }: Props) => {
  const loggedIn = useSelector(getAuthState)

  return (
    <>
      {!loggedIn && linkCode && (
        <Container>
          <Code variables={{ linkCode }}>CODE_FOR_LINKING</Code>
        </Container>
      )}
    </>
  )
}

export default memo(CodeDisclaimer)

const Container = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  border-top-width: ${constants.hairlineWidth};
  border-top-color: ${({ theme }) => theme.HAIRLINE_COLOR};
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
`

const Code = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 13px;
  text-align: center;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
