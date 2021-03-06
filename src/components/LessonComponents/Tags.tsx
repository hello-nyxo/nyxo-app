import React, { FC } from 'react'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import { IconBold } from '@components/iconRegular'

type Props = {
  tags?: string[]
}

const Tags: FC<Props> = ({ tags }) => {
  return (
    <Container>
      {tags && tags?.length > 0 && (
        <>
          <TagIcon />
          {tags?.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </>
      )}
    </Container>
  )
}

export default Tags

const Container = styled.View`
  margin: 10px 20px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`

const TagIcon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR,
  height: 12,
  width: 12,
  name: 'tag'
}))`
  margin-right: 10px;
`

const Tag = styled.Text`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  padding: 5px;
  border-radius: 5px;
  margin: 0px 5px 5px 0px;
  text-transform: uppercase;
  font-size: 12px;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
`
