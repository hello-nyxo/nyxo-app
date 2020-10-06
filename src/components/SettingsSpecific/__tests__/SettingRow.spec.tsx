import 'react-native'
import 'jest-styled-components'
import React from 'react'
import { matchComponentToSnapshot } from '@helpers/snapshot'
import SettingRow from '../settingRow'

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(),
  isIphoneX: () => true
}))

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
