import React from 'react'
import styled from 'styled-components/native'
import { IconBold } from 'components/iconRegular'
import { useNavigation } from '@react-navigation/core'
import ROUTE from 'config/routes/Routes'
import colors from 'styles/colors'
import { getStaticNotificationsCount } from 'store/Selectors/notification-selectors/notification-selectors'
import { useSelector } from 'react-redux'

const NotificationCenterLink = () => {
  const { navigate } = useNavigation()
  const notificationCount = useSelector(getStaticNotificationsCount)

  const handlePress = () => {
    navigate(ROUTE.NOTIFICATION_CENTER, {})
  }

  return (
    <Container>
      <Button onPress={handlePress}>
        <IconBold name="alarmBell" fill="black" height="25" width="25" />
        {notificationCount > 0 && (
          <NotificationCountContainer>
            <NotificationCount adjustsFontSizeToFit>
              {notificationCount}
            </NotificationCount>
          </NotificationCountContainer>
        )}
      </Button>
    </Container>
  )
}

export default NotificationCenterLink

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin: 0px 20px;
`

const Button = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 10px;
  border-radius: 50px;
`

const NotificationCountContainer = styled.View`
  top: 0;
  right: 0;
  position: absolute;
  background-color: ${colors.radiantBlue};
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
