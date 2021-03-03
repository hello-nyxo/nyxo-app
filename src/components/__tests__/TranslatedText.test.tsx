import 'react-native'
import React from 'react'
import { matchComponentToSnapshot } from '@helpers/snapshot'
import TranslatedText from '../TranslatedText'

describe('<TranslatedText/>', () => {
  it('it renders correctly', () => {
    matchComponentToSnapshot(
      <TranslatedText>Bedtime statistics subtitle</TranslatedText>
    )
  })
})
