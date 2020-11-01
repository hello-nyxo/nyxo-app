import React, { memo } from 'react'
import FastImage from 'react-native-fast-image'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '@styles/themes'

interface AuthorCardProps {
  avatarURL: string
  name: string
  credentials: string
}

const AuthorCard = (props: AuthorCardProps) => {
  return (
    <Card>
      <Avatar borderRadius={15} source={{ uri: `https:${props.avatarURL}` }} />
      <Container>
        <Name>{props.name}</Name>
        <Credentials numberOfLines={2}>{props.credentials}</Credentials>
      </Container>
    </Card>
  )
}

export default memo(AuthorCard)

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`

const Avatar = styled(FastImage)`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 20px;
`

const Name = styled.Text`
  font-size: 12px;
  font-family: ${fonts.bold};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Container = styled.View`
  flex: 1;
`

const Credentials = styled.Text`
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 11px;
`
