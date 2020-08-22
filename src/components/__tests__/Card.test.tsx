import React from 'react'
import { Text } from 'react-native'
import * as TestRenderer from 'react-test-renderer'
import Card from '../Card'

it('Card renders correctly', () => {
  const rendered = TestRenderer.create(
    <Card>
      <Text>Testi</Text>
    </Card>
  ).toJSON()
  expect(rendered).toMatchSnapshot()
})
