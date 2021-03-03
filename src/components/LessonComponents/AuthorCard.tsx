import React, { FC, memo } from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import { ImageProps } from 'react-native'

type Props = {
  avatarURL?: string
  name?: string
  credentials?: string
}

const AuthorCard: FC<Props> = ({ avatarURL, name, credentials }) => (
  <Card>
    <Avatar
      borderRadius={15}
      source={{ uri: `${avatarURL}?fm=jpg&fl=progressive&w=100` }}
    />
    <Container>
      <Name>{name}</Name>
      <Credentials numberOfLines={2}>{credentials}</Credentials>
    </Container>
  </Card>
)

export default memo(AuthorCard)

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`

const Avatar = styled(FastImage)<ImageProps>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 20px;
`

const Name = styled.Text`
  font-size: 12px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Container = styled.View`
  flex: 1;
`

const Credentials = styled.Text`
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 11px;
`
