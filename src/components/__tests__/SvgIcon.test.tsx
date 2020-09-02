import 'react-native'
import * as React from 'react'
import SvgIcon from '../SvgIcon'
import { matchComponentToSnapshot } from @helpers/snapshot'

describe('<SvgIcon/>', () => {
  it('it renders correctly', () => {
    matchComponentToSnapshot(
      <SvgIcon
        height={20}
        width={20}
        name="taskListEdit"
        fill="black"
        viewBox="0 0 24 24"
      />
    )
  })
})
