import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import EmptyState from '@components/EmptyState'
import EnablePushCheck from '@components/MainScreenSpecific/EnablePushCheck'
import HelpInfo from '@components/MainScreenSpecific/HelpInfo'
import {
  Container,
  H1,
  Row,
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import React from 'react'
import { useSelector } from 'react-redux'
import { getStaticNotificationsCount } from '@selectors/notification-selectors/notification-selectors'
import styled from 'styled-components/native'

const NotificationCenter = () => {
  const notificationCount = useSelector(getStaticNotificationsCount)

  return (
    <SafeAreaView>
      <StyledScrollView>
        <GoBackContainer>
          <GoBack />
        </GoBackContainer>
        <Container>
          <TitleRow>
            <H1>NOTIFICATION_CENTER.TITLE</H1>
            {notificationCount > 0 && (
              <NotificationCount>( {notificationCount} )</NotificationCount>
            )}
          </TitleRow>
        </Container>

        <HelpInfo />
        <EnablePushCheck />
        {notificationCount === 0 && <EmptyState />}
      </StyledScrollView>
    </SafeAreaView>
  )
}

export default NotificationCenter

const NotificationCount = styled.Text`
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 25px;
`

const TitleRow = styled(Row)`
  margin-bottom: 30px;
  align-items: center;
`
