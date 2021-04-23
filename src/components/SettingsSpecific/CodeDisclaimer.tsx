import React, { memo } from 'react'
import styled from 'styled-components/native'
import { constants, fonts } from '@styles/themes'
import TranslatedText from '../TranslatedText'
import { useAppSelector } from '@hooks/redux'

interface Props {
  linkCode?: string | undefined | null
}

const CodeDisclaimer = ({ linkCode }: Props) => {
  const loggedIn = useAppSelector(({ auth }) => auth.authenticated)

  return (
    <>
      {!loggedIn && !!linkCode ? (
        <Container>
          <Code variables={{ linkCode }}>CODE_FOR_LINKING</Code>
        </Container>
      ) : null}
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
  border-top-color: ${({ theme }) => theme.hairline};
  background-color: ${({ theme }) => theme.bgSecondary};
`

const Code = styled(TranslatedText)`
  font-family: ${({ theme }) => theme.medium};
  font-size: 13px;
  text-align: center;
  color: ${({ theme }) => theme.textPrimary};
`
