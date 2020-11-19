import { fonts } from '@styles/themes'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { IconBold } from '../iconRegular'
import TranslatedText from '../TranslatedText'

const slides = [
  {
    title: 'PURCHASE_COACHING_SLIDE_TITLE_1',
    text: 'PURCHASE_COACHING_SLIDE_TEXT_1'
  },
  {
    title: 'PURCHASE_COACHING_SLIDE_TITLE_2',
    text: 'PURCHASE_COACHING_SLIDE_TEXT_2'
  },
  {
    title: 'PURCHASE_COACHING_SLIDE_TITLE_3',
    text: 'PURCHASE_COACHING_SLIDE_TEXT_3'
  }
]

const PerkList: FC = () => {
  return (
    <PerksList>
      {slides.map((perk) => (
        <Perk key={perk.title}>
          <Icon name="checkMark" height={15} width={15} />
          <PerkText>{perk.text}</PerkText>
        </Perk>
      ))}
    </PerksList>
  )
}

export default PerkList

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.SECONDARY_TEXT_COLOR
}))`
  margin-right: 10px;
`

const PerksList = styled.View`
  margin: 30px;
  padding: 0px 10px;
`

const Perk = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`

const PerkText = styled(TranslatedText)`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${fonts.medium};
  font-size: 15px;
`
