import ROUTE from '@config/routes/Routes'
import React, { FC } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import colors from '../styles/colors'
import { fonts } from '../styles/themes'
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
  badgeCount?: number
}

const tabBarIcons = {
  [ROUTE.JOURNAL]: 'clockBold',
  [ROUTE.COACHING]: 'schoolPhysicalBold',
  [ROUTE.HABITS]: 'checklist',
  [ROUTE.PROFILE]: 'userBold',
  [ROUTE.SETTINGS]: 'settingsBold'
}

const TabBarIcon: FC<TabBarIconProps> = ({
  focused,
  routeName,
  badgeCount
}: TabBarIconProps) => {
  return (
    <View>
      <IconBold
        name={tabBarIcons[routeName]}
        height={20}
        fill={focused ? colors.darkBlue : colors.gray}
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

export default TabBarIcon

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
