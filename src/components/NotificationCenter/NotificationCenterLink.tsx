import React, { FC } from 'react'
import styled from 'styled-components/native'
import { IconBold } from '@components/iconRegular'
import { useNavigation } from '@react-navigation/core'
import { useAppSelector } from '@hooks/redux'

const NotificationCenterLink: FC = () => {
  const { navigate } = useNavigation()
  const notificationCount = useAppSelector(getStaticNotificationsCount)

  const handlePress = () => {
    navigate('Notifications', {})
  }

  return (
    <Button onPress={handlePress}>
      <IconBold name="alarmBell" fill="black" height="25" width="25" />
      {0 > 0 && (
        <NotificationCountContainer>
          <NotificationCount adjustsFontSizeToFit>{0}</NotificationCount>
        </NotificationCountContainer>
      )}
    </Button>
  )
}

export default NotificationCenterLink

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  width: 50px;
  height: 50px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`

const NotificationCountContainer = styled.View`
  top: 0;
  right: 0;
  position: absolute;
  background-color: ${({ theme }) => theme.accent};
  height: 20px;
  width: 20px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`

const NotificationCount = styled.Text`
  font-size: 9px;
  color: white;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  text-align: center;
`
