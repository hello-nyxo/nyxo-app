import 'react-native'
import 'jest-styled-components'
import React from 'react'
import { matchComponentToSnapshot } from @helpers/snapshot'
import SettingRow from '../settingRow'

describe('<SettingRow />', () => {
  it('should render correctly', () => {
    matchComponentToSnapshot(
      <SettingRow
        analyticsEvent="__test__ analyticsEvent"
        onPress={jest.fn()}
        icon="__test__ icon"
        children={null}
        badge={2}
      />
    )
  })
})
