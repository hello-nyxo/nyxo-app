import React, { memo } from 'react'
import styled from 'styled-components/native'
import TranslatedText from '../../TranslatedText'

const BottomInfo = () => <Text>PLEASE_SELECT_DATE</Text>

export default memo(BottomInfo)

const Text = styled(TranslatedText)`
  align-self: center;
  text-align: center;
  font-family: ${({ theme }) => theme.medium};
  font-size: 15px;
  color: ${({ theme }) => theme.textSecondary};
`
