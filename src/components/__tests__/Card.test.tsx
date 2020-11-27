import { matchComponentToSnapshot } from '@helpers/snapshot'
import React from 'react'
import { Text } from 'react-native'
import Card from '../Card'

it('Card renders correctly', () => {
  matchComponentToSnapshot(
    <Card>
      <Text>Testi</Text>
    </Card>
  )
})
