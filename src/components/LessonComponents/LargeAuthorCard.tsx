import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'

interface AuthorCardProps {
  avatarURL?: string
  name?: string
  credentials?: string
}

const LargeAuthorCard: FC<AuthorCardProps> = ({
  avatarURL,
  name,
  credentials
}) => (
  <Card>
    <Avatar
      borderRadius={50}
      source={{ uri: `${avatarURL}?fm=jpg&fl=progressive&w=100` }}
    />
    <Info>
      <Name>{name}</Name>
      <Credentials>{credentials}</Credentials>
    </Info>
  </Card>
)

export default LargeAuthorCard

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`

const Info = styled.View`
  flex: 1;
`

const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  overflow: hidden;
  margin-right: 20px;
`

const Name = styled.Text`
  font-family: ${fonts.bold};
  font-size: 17px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Credentials = styled.Text`
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 12px;
`
