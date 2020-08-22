import * as React from 'react'
import 'react-native'
import * as renderer from 'react-test-renderer'
import { IconBold } from '../iconRegular'

it('IconBold Renders correctly', () => {
  const rendered = renderer
    .create(
      <IconBold height={20} width={20} name="taskListEdit" fill="black" />
    )
    .toJSON()
  expect(rendered).toMatchSnapshot()
})
