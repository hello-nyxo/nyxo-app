import React, { FC } from 'react'
import styled from 'styled-components/native'
import { AuthorCardCollectionItem } from '@typings/contentful'
import AuthorCard from '../LessonComponents/AuthorCard'
import LargeAuthorCard from '../LessonComponents/LargeAuthorCard'

type Props = {
  authorCards?: AuthorCardCollectionItem[]
}

const AuthorsComponent: FC<Props> = ({ authorCards }) => {
  if (!authorCards) return null

  const mainAuthor = authorCards[0]
  const onlyOneAuthor = authorCards?.length === 1

  const authors = authorCards
    .filter((item) => item.name !== mainAuthor.name)
    .map((item) => (
      <AuthorCard
        key={item.name}
        avatarURL={item?.avatar?.url}
        name={item.name}
        credentials={item.credentials}
      />
    ))

  return (
    <AuthorContainer>
      {mainAuthor ? (
        <LargeAuthorCard
          avatarURL={mainAuthor?.avatar?.url}
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

export default AuthorsComponent

const AuthorContainer = styled.View`
  margin: 30px 20px 20px;
`

const Authors = styled.ScrollView``
