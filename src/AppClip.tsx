import React, { FC } from 'react'
import styled from 'styled-components/native'
import { getTitle } from '@helpers/time'
import { gql, useQuery } from '@apollo/client'
import { FlatList, RefreshControl } from 'react-native'

const GET_LESSONS = gql`
  query GetLessons($language: String!) {
    coachingWeekCollection(locale: $language) {
      items {
        weekName
        slug
        weekDescription {
          json
        }
        intro
        coverPhoto {
          url
        }
      }
    }
  }
`

export const AppClip: FC = () => {
  const { title } = getTitle()
  const { loading, error, data, refetch } = useQuery(GET_LESSONS, {
    variables: { language: 'en-US' }
  })

  const weeks = data?.coachingWeekCollection?.items || []

  const renderItem = ({ item }) => {
    return (
      <Week>
        <CoverContainer>
          <Cover
            source={{ uri: `${item.coverPhoto.url}?fm=jpg&fl=progressive` }}
          />
        </CoverContainer>
        <Content>
          <Text key={item.id}>{item.weekName}</Text>
          <IntroText key={item.id}>{item.intro}</IntroText>
        </Content>
      </Week>
    )
  }

  return (
    <Container>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} />
        }
        keyExtractor={(item) => item.slug}
        ListHeaderComponent={<Title>{title}</Title>}
        data={weeks}
        renderItem={renderItem}
      />
    </Container>
  )
}

const Container = styled.View`
  height: 100%;
`

const Title = styled.Text`
  margin: 24px 16px 24px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  font-size: 32px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Text = styled.Text`
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 17px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Week = styled.View`
  margin: 8px 16px;
  box-shadow: ${({ theme }) => theme.SHADOW};
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  border-radius: 8px;
`

const CoverContainer = styled.View`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
`

const IntroText = styled.Text`
  margin-top: 8px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`

const Content = styled.View`
  padding: 16px;
`

const Cover = styled.Image`
  width: 100%;
  height: 150px;
`
