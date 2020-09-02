import 'react-native'
import React from 'react'
import TranslatedText from '../TranslatedText'
import { matchComponentToSnapshot } from '@helpers/snapshot'

jest.mock('moment', () => ({
  format: () => '2018–01–30T12:34:56+00:00',
  locale: () => {}
}))

describe('<TranslatedText/>', () => {
  it('it renders correctly', () => {
    matchComponentToSnapshot(
      <TranslatedText>Bedtime statistics subtitle</TranslatedText>
    )
  })
})
