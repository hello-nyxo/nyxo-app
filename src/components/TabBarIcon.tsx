import React, { memo } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import colors from '../styles/colors'
import { fonts } from '../styles/themes'
import { IconBold } from './iconRegular'

export interface TabBarIconProps {
  focused: boolean
  tintColor: string
  routeName: string
  badgeCount?: number
}

const tabBarIcons = {
  Sleep: 'clockBold',
  Coaching: 'schoolPhysicalBold',
  Feed: 'multiUsers',
  Profile: 'userBold',
  Settings: 'settingsBold'
}

const SCTabBarIcon = ({
  focused,
  tintColor,
  routeName,
  badgeCount
}: TabBarIconProps) => {
  return (
    <View>
      <IconBold
        name={tabBarIcons[routeName]}
        height={20}
        fill={focused ? colors.radiantBlue : colors.gray}
        width={20}
      />
      {!!badgeCount && (
        <Badge>
          <BadgeCount>{badgeCount}</BadgeCount>
        </Badge>
      )}
    </View>
  )
}

export default memo(SCTabBarIcon)

const Badge = styled.View`
  position: absolute;
  top: -3px;
  right: -6px;
  background-color: ${colors.accentRed};
  border-radius: 6px;
  width: 12px;
  height: 12px;
  justify-content: center;
  align-items: center;
`

const BadgeCount = styled.Text`
  color: white;
  font-size: 8px;
  font-family: ${fonts.bold};
  text-align: center;
`
