import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import EnablePushCheck from '@components/MainScreenSpecific/EnablePushCheck'
import HelpInfo from '@components/MainScreenSpecific/HelpInfo'
import {
  Container,
  H1,
  Row,
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import React, { FC } from 'react'

import styled from 'styled-components/native'

const NotificationCenter: FC = () => {
  return (
    <SafeAreaView>
      <StyledScrollView>
        <GoBackContainer>
          <GoBack />
        </GoBackContainer>
        <Container>
          <TitleRow>
            <H1>NOTIFICATION_CENTER.TITLE</H1>
          </TitleRow>
        </Container>

        <HelpInfo />
        <EnablePushCheck />
      </StyledScrollView>
    </SafeAreaView>
  )
}

export default NotificationCenter

const TitleRow = styled(Row)`
  margin-bottom: 30px;
  align-items: center;
`
