import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { IconBold } from './iconRegular'

export type TabBarIconProps = {
  focused: boolean
  tintColor: string
  routeName: 'Sleep' | 'Coaching' | 'Habits' | 'Profile' | 'Settings'
}

const tabBarIcons = {
  Sleep: 'clockBold',
  Coaching: 'schoolPhysicalBold',
  Habits: 'checklist',
  Profile: 'userBold',
  Settings: 'settingsBold'
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
