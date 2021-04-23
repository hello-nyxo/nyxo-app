import Points from '@components/points/Points'
import {
  PageTitle,
  SafeAreaView,
  StyledScrollView
} from '@components/Primitives/Primitives'
import UserInfo from '@components/ProfileSpecific/Userinfo'
import SignupBottomButton from '@components/Signup/SignupBottomButton'
import { useAppSelector } from '@hooks/redux'
import { useGetUser } from '@hooks/user/useUser'
import React, { FC, memo } from 'react'
import { Text } from 'react-native'
import styled from 'styled-components/native'

const ProfileScreen: FC = () => {
  const { data } = useGetUser()
  const loggedIn = useAppSelector((state) => state.auth.authenticated)
  const nickname = data?.nickname

  return (
    <SafeAreaView>
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
