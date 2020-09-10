import { getActiveCoaching } from '@selectors/subscription-selectors/SubscriptionSelectors'
import React, { memo, FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../styles/themes'
import { Container } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

const IntroduceCoaching: FC = () => {
  const hasActiveCoaching = useSelector(getActiveCoaching)

  if (hasActiveCoaching) return null

  return (
    <Container>
      <SubTitle>NYXO_COACHING_INTRO</SubTitle>
      <MiniText>WHY_BUY_1</MiniText>
      <MiniText>WHY_BUY_2</MiniText>
    </Container>
  )
}

export default memo(IntroduceCoaching)

const SubTitle = styled(TranslatedText)`
  font-family: ${fonts.bold};
  font-size: 17px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  margin-bottom: 10px;
`

const MiniText = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 13px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  margin-bottom: 10px;
`
