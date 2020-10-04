import {
  PageTitle,
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import UserInfo from '@components/ProfileSpecific/Userinfo'
import SignupBottomButton from '@components/Signup/SignupBottomButton'
import TopInfo from '@components/TopInfo'
import { useGetUser } from '@hooks/user/useUser'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import Points from '@components/points/Points'
import React, { FC, memo } from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'

const ProfileScreen: FC = () => {
  const { data } = useGetUser()
  const loggedIn = useSelector(getAuthState)

  const nickname = data?.nickname
  const coaching = data?.activeCoaching

  return (
    <SafeAreaView>
      <TopInfo />
      <StyledScrollView>
        <Container>
          <PageTitle {...(nickname && { as: Text })}>
            {nickname ?? 'Profile'}
          </PageTitle>
          {loggedIn && <UserInfo />}
          {!loggedIn && <SignupBottomButton />}
        </Container>
        {loggedIn && <Points sleepPoints={data?.sleepPoints} />}
      </StyledScrollView>
    </SafeAreaView>
  )
}

export default memo(ProfileScreen)

const Container = styled.View`
  margin-bottom: 20px;
`
