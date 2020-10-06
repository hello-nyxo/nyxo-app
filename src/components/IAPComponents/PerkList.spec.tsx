import 'react-native'
import React from 'react'
import { matchComponentToSnapshot } from '@helpers/snapshot'
import PerkList from './PerkList'

jest.mock('react-native-iphone-x-helper', () => ({
  getStatusBarHeight: jest.fn(),
  ifIphoneX: jest.fn(),
  isIphoneX: jest.fn()
}))

describe('<PerkList/>', () => {
  it('it renders correctly', () => {
    matchComponentToSnapshot(<PerkList />)
  })
})
