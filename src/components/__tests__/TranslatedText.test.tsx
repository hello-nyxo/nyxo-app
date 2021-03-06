import React from 'react'
import 'react-native'
import { matchComponentToSnapshot } from '@helpers/snapshot'
import TranslatedText from '../TranslatedText'

describe('<TranslatedText/>', () => {
  it('renders correctly', () => {
    matchComponentToSnapshot(
      <TranslatedText>Bedtime statistics subtitle</TranslatedText>
    )
  })
})
