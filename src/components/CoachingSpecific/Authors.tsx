import React, { memo } from 'react'
import styled from 'styled-components/native'
import { AuthorCard as AuthorCardType } from 'Types/CoachingContentState'
import AuthorCard from '../LessonComponents/AuthorCard'
import LargeAuthorCard from '../LessonComponents/LargeAuthorCard'

const AuthorsComponent = ({
  authorCards
}: {
  authorCards?: AuthorCardType[]
}) => {
  if (!authorCards) return null

  const mainAuthor = authorCards[0]
  const onlyOneAuthor = authorCards?.length === 1

  const authors = authorCards
    .filter((item) => item.name !== mainAuthor.name)
    .map((item, index) => {
      return (
        <AuthorCard
          key={index}
          avatarURL={item.avatar}
          name={item.name}
          credentials={item.credentials}
        />
      )
    })

  return (
    <AuthorContainer>
      {mainAuthor ? (
        <LargeAuthorCard
          avatarURL={mainAuthor.avatar}
          name={mainAuthor.name}
          credentials={mainAuthor.credentials}
        />
      ) : null}
      {!onlyOneAuthor ? (
        <Authors showsHorizontalScrollIndicator={false} horizontal>
          {authors}
        </Authors>
      ) : null}
    </AuthorContainer>
  )
}

export default memo(AuthorsComponent)

const AuthorContainer = styled.View`
  margin: 30px 20px 20px;
`

const Authors = styled.ScrollView``
