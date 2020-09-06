import Inforow from '@components/InfoRow'
import {
  H3,
  P,
  PageTitle,
  SafeAreaView
} from '@components/Primitives/Primitives'
import UserInfo from '@components/ProfileSpecific/Userinfo'
import SignupBottomButton from '@components/Signup/SignupBottomButton'
import TopInfo from '@components/TopInfo'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import React, { memo, FC } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { StyleProps } from '../../styles/themes'
import { useGetUser } from '@hooks/user/useUser'
import { Text } from 'react-native'

const ProfileScreen: FC = () => {
  const { data } = useGetUser()

  const nickname = data?.nickname
  const coaching = data?.activeCoaching

  console.log(coaching)

  const renderSectionHeader = ({ section }: any) => (
    <SectionHeaderContainer>
      <H3>{section.title}</H3>
      <P>{section.subtitle}</P>
    </SectionHeaderContainer>
  )

  const renderItem = ({ item }: any) => (
    <Inforow title={item.title} figure={item.figure} />
  )

  return (
    <SafeAreaView>
      <TopInfo />
      <ProfileHeader nickname={nickname} />
    </SafeAreaView>
  )
}

type Props = {
  nickname?: string | null
}

const ProfileHeader: FC<Props> = ({ nickname }) => {
  const loggedIn = useSelector(getAuthState)
  return (
    <Container>
      <PageTitle {...(nickname && { as: Text })}>
        {nickname ?? 'Profile'}
      </PageTitle>
      {loggedIn && <UserInfo />}
      {!loggedIn && <SignupBottomButton />}
      {/* <ChronotypeBox /> */}
    </Container>
  )
}

export default memo(ProfileScreen)

const Container = styled.View`
  margin-bottom: 20px;
  min-height: 300px;
`

const SectionHeaderContainer = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  margin: 0px 20px 20px;
  padding-top: 20px;
`
