import {
  documentToReactComponents,
  Options
} from '@contentful/rich-text-react-renderer'
import {
  Block,
  BLOCKS,
  Document,
  Inline,
  INLINES,
  MARKS
} from '@contentful/rich-text-types'
import { WIDTH } from '@helpers/Dimensions'
import { AssetBlock } from '@typings/contentful'
import React, { FC, ReactNode, useLayoutEffect, useState } from 'react'
import { Image, Linking } from 'react-native'
import styled from 'styled-components/native'
import { constants, fonts } from '../styles/themes'
import { IconBold } from './iconRegular'

const HyperLink = ({
  href,
  children
}: {
  href: string
  children: ReactNode
}) => {
  const onPress = () => {
    Linking.openURL(href)
  }

  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <Link onPress={onPress}>{children}</Link>
}

const getContentType = (
  node: Inline
): { type: string; path: string; title: string } => {
  switch (node.data.target.sys.contentType.sys.id) {
    case 'habit': {
      const path = node?.data?.target?.fields?.slug
      const name = node?.data?.target?.fields?.title
      return { type: 'habit', path: `/habit/${path}`, title: name }
    }
    case 'lesson': {
      const path = node?.data?.target?.fields?.slug
      const name = node?.data?.target?.fields?.lessonName
      return { type: 'lesson', path: `/lesson/${path}`, title: name }
    }
    default:
      return { type: 'unknown', path: '', title: '' }
  }
}

const defaultInline: (type: string, node: Inline) => ReactNode = (
  _,
  node: Inline
) => {
  const contentType = getContentType(node)

  return <Underline>{contentType.title}</Underline>
}

interface Props {
  content?: Document
  assets?: {
    block: AssetBlock[]
  }
}

const RichText: FC<Props> = ({ content, assets }) => {
  if (!content) return null

  console.log(assets)

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: function bold(text: ReactNode) {
        return <Bold>{text}</Bold>
      },
      [MARKS.ITALIC]: function italic(text: ReactNode) {
        return <Italic>{text}</Italic>
      },
      [MARKS.UNDERLINE]: function underline(text: ReactNode) {
        return <Underline>{text}</Underline>
      },
      [MARKS.CODE]: function code(text: ReactNode) {
        return <Code>{text}</Code>
      }
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: function paragraph(
        _: Block | Inline,
        children: ReactNode
      ) {
        return <Paragraph>{children}</Paragraph>
      },
      [BLOCKS.UL_LIST]: function ulList(
        node: Block | Inline,
        children: ReactNode
      ) {
        return <List node={node}>{children}</List>
      },
      [BLOCKS.OL_LIST]: function olList(
        node: Block | Inline,
        children: ReactNode
      ) {
        return <List node={node}>{children}</List>
      },
      [BLOCKS.EMBEDDED_ASSET]: function embeddedAsset(node: Block | Inline) {
        return <ImageBlock type="" assets={assets} node={node} />
      },
      [BLOCKS.HR]: function hr(_: Block | Inline) {
        return <Line />
      },
      [BLOCKS.LIST_ITEM]: function listItem(
        _: Block | Inline,
        children: ReactNode
      ) {
        return <ListItemText>{children}</ListItemText>
      },
      [BLOCKS.HEADING_1]: function h1(_: Block | Inline, children: ReactNode) {
        return <H1>{children}</H1>
      },
      [BLOCKS.HEADING_2]: function h2(_: Block | Inline, children: ReactNode) {
        return <H2>{children}</H2>
      },
      [BLOCKS.HEADING_3]: function h3(_: Block | Inline, children: ReactNode) {
        return <H3>{children}</H3>
      },
      [BLOCKS.HEADING_4]: function h4(_: Block | Inline, children: ReactNode) {
        return <H4>{children}</H4>
      },
      [BLOCKS.HEADING_5]: function h5(_: Block | Inline, children: ReactNode) {
        return <H5>{children}</H5>
      },
      [BLOCKS.HEADING_6]: function h5(_: Block | Inline, children: ReactNode) {
        return <H6>{children}</H6>
      },
      [BLOCKS.QUOTE]: function quote(_: Block | Inline, children: ReactNode) {
        return <BlockQuote>{children}</BlockQuote>
      },
      [INLINES.HYPERLINK]: function hyperlink(
        node: Block | Inline,
        children: ReactNode
      ) {
        return <HyperLink href={node?.data?.uri}>{children}</HyperLink>
      },
      [INLINES.EMBEDDED_ENTRY]: (node: Block | Inline) =>
        defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline)
    }
  }

  const components = documentToReactComponents(content, options)

  return <Container>{components}</Container>
}

export default RichText

const Container = styled.View``

const Bold = styled.Text`
  font-size: 15px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`
Bold.displayName = 'Bold'

const Italic = styled.Text`
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  font-style: italic;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

Italic.displayName = 'Italic'

const Underline = styled.Text`
  text-decoration: underline;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Code = styled.Text`
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Paragraph = styled.Text`
  font-size: 15px;
  line-height: 25px;
  margin-bottom: 20px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const H1 = styled.Text`
  font-family: ${fonts.bold};
  font-size: 28px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 20px;
`

const H2 = styled.Text`
  font-family: ${fonts.bold};
  font-size: 25px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 20px;
`

const H3 = styled.Text`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 20px;
`

const H4 = styled.Text`
  font-family: ${fonts.bold};
  font-size: 20px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 20px;
`

const H5 = styled.Text`
  font-family: ${fonts.bold};
  font-size: 18px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 20px;
`

const H6 = styled.Text`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-bottom: 20px;
`

const Line = styled.View`
  width: 100%;
  height: ${constants.hairlineWidth}px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Link = styled(Paragraph)`
  color: ${({ theme }) => theme.accent};
`

const List = ({
  node: { nodeType },
  children
}: {
  node: Block | Inline
  children: ReactNode[] | ReactNode
}) => {
  const ordered = nodeType === 'ordered-list'

  if (!Array.isArray(children)) return null

  const mapped = children?.map((child, index: number) => (
    <ListItemContainer ordered={ordered} key={`${index}`}>
      {ordered ? <Number>{index + 1}.</Number> : <Dot />}
      <ListItemText>{child}</ListItemText>
    </ListItemContainer>
  ))

  return <Container>{mapped}</Container>
}

const Number = styled.Text`
  font-size: 15px;
  line-height: 25px;
  font-family: ${fonts.bold};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Dot = styled(IconBold).attrs(({ theme }) => ({
  height: '8',
  name: 'circle',
  width: '8',
  fill: theme.PRIMARY_TEXT_COLOR
}))``

const ListItemContainer = styled.View`
  flex-direction: row;
  align-items: ${({ ordered }: { ordered: boolean }) =>
    ordered ? 'flex-start' : 'center'};
  margin-bottom: 15px;
`

const ListItemText = styled.Text`
  margin-left: 10px;
  font-size: 15px;
  flex: 1;
  line-height: 25px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const BlockQuote = styled.View`
  padding-left: 10px;
  border-left-color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  border-left-width: 2px;
`

type ImageProps = {
  type: string
  node: Block | Inline
  assets?: {
    block: AssetBlock[]
  }
}

const ImageBlock: FC<ImageProps> = ({ node, assets }) => {
  const img = assets?.block.find((i) => i.sys.id === node.data.target.sys.id)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    Image.getSize(
      `${img?.url}?fm=jpg&fl=progressive&w=${WIDTH * 2}`,
      (width, height) => setDimensions({ width, height }),
      () => null
    )
  }, [img?.url])

  return (
    <ImageContainer>
      <Img
        resizeMode="contain"
        width={dimensions.width / 2}
        height={dimensions.height / 2}
        source={{ uri: `${img?.url}?fm=jpg&fl=progressive&w=${WIDTH * 2}` }}
      />
      <ImageTitle>{img?.title}</ImageTitle>
      <ImageDescription>{img?.description}</ImageDescription>
    </ImageContainer>
  )
}

const ImageContainer = styled.View`
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  margin: 30px -20px;
  padding: 0px 0px 20px;
  flex: 1;
`
const ImageTitle = styled.Text`
  margin: 10px 20px;
  font-family: ${({ theme }) => theme.FONT_BOLD};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 17px;
`

const ImageDescription = styled.Text`
  margin: 0px 20px;
  font-family: ${({ theme }) => theme.FONT_MEDIUM};
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  font-size: 14px;
`

const Img = styled.Image`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`
