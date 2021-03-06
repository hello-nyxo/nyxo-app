import ROUTE from '@config/routes/Routes'
import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { IconBold } from './iconRegular'

export type TabBarIconProps = {
  focused: boolean
  tintColor: string
  routeName:
    | ROUTE.JOURNAL
    | ROUTE.COACHING
    | ROUTE.HABITS
    | ROUTE.PROFILE
    | ROUTE.SETTINGS
}

const tabBarIcons = {
  [ROUTE.JOURNAL]: 'clockBold',
  [ROUTE.COACHING]: 'schoolPhysicalBold',
  [ROUTE.HABITS]: 'checklist',
  [ROUTE.PROFILE]: 'userBold',
  [ROUTE.SETTINGS]: 'settingsBold'
}

const TabBarIcon: FC<TabBarIconProps> = ({ focused, routeName }) => {
  return (
    <View>
      <TabIcon
        name={tabBarIcons[routeName]}
        height={20}
        focused={focused}
        width={20}
      />
    </View>
  )
}

export default TabBarIcon

const TabIcon = styled(IconBold).attrs(({ theme, focused }) => ({
  fill: focused ? theme.accent : theme.SECONDARY_TEXT_COLOR
}))``
