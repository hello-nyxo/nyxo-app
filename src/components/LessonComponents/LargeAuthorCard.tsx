import React, { memo } from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '../../styles/themes'
import TranslatedText from '../TranslatedText'

interface AuthorCardProps {
  avatarURL: string
  name: string
  credentials: string
}

const LargeAuthorCard = ({ avatarURL, name, credentials }: AuthorCardProps) => {
  return (
    <Card>
      <Avatar borderRadius={50} source={{ uri: `https:${avatarURL}` }} />
      <View style={{ flex: 1 }}>
        <Name>{name}</Name>
        <Credentials>{credentials}</Credentials>
      </View>
    </Card>
  )
}

export default memo(LargeAuthorCard)

const Card = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
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
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

const Credentials = styled.Text`
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 12px;
`

const Title = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 5px;
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
`
