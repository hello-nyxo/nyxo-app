import TranslatedText from '@components/TranslatedText'
import styled from 'styled-components/native'

export const H2 = styled(TranslatedText)`
  font-size: 28px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_REGULAR};
`

export const Body = styled(TranslatedText)`
  font-size: 17px;
  line-height: 22px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_REGULAR};
`

export const Footnote = styled(TranslatedText)`
  font-size: 13px;
  line-height: 18px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_REGULAR};
`
