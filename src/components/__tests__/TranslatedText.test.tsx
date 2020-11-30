import 'react-native'
import React from 'react'
import { matchComponentToSnapshot } from '@helpers/snapshot'
import TranslatedText from '../TranslatedText'

jest.mock('moment', () => ({
  format: () => '2018–01–30T12:34:56+00:00',
  locale: () => 'fi'
}))

describe('<TranslatedText/>', () => {
  it('it renders correctly', () => {
    matchComponentToSnapshot(
      <TranslatedText>Bedtime statistics subtitle</TranslatedText>
    )
  })
})
