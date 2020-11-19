import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {
  BLOCKS,
  Document,
  Inline,
  INLINES,
  MARKS
} from '@contentful/rich-text-types'
import { WIDTH } from '@helpers/Dimensions'
import React, { ReactNode, useLayoutEffect, useState } from 'react'
import { Image, Linking } from 'react-native'
import styled from 'styled-components/native'
import colors from '../styles/colors'
import { constants, fonts } from '../styles/themes'
import { IconBold } from './iconRegular'

const HyperLink = ({ href, children }: { href: string; children: string }) => {
  const onPress = () => {
    Linking.openURL(href)
  }

  return <Link onPress={onPress}>{children}</Link>
}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: (text: string) => <Italic>{text}</Italic>,
    [MARKS.UNDERLINE]: (text: string) => <Underline>{text}</Underline>,
    [MARKS.CODE]: (text: string) => <Code>{text}</Code>
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: ReactNode, children: string) => (
      <Paragraph>{children}</Paragraph>
    ),
    [BLOCKS.UL_LIST]: (node: ReactNode, children: string) => {
      return <List node={node}>{children}</List>
    },
    [BLOCKS.OL_LIST]: (node: ReactNode, children: string) => {
      return <List node={node}>{children}</List>
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: ReactNode, children: string) => (
      <ImageBlock type="" node={node as Inline}>
        {children}
      </ImageBlock>
    ),
    [BLOCKS.HR]: (node: ReactNode, children: string) => <Line />,
    [BLOCKS.LIST_ITEM]: (node: ReactNode, children: string) => (
      <ListItemText>{children}</ListItemText>
    ),
    [BLOCKS.HEADING_1]: (node: ReactNode, children: string) => (
      <H1>{children}</H1>
    ),
    [BLOCKS.HEADING_2]: (node: ReactNode, children: string) => (
      <H2>{children}</H2>
    ),
    [BLOCKS.HEADING_3]: (node: ReactNode, children: string) => (
      <H3>{children}</H3>
    ),
    [BLOCKS.HEADING_4]: (node: ReactNode, children: string) => (
      <H4>{children}</H4>
    ),
    [BLOCKS.HEADING_5]: (node: ReactNode, children: string) => (
      <H5>{children}</H5>
    ),
    [BLOCKS.HEADING_6]: (node: ReactNode, children: string) => (
      <H6>{children}</H6>
    ),
    [BLOCKS.QUOTE]: (node: ReactNode, children: string) => (
      <BlockQuote>{children}</BlockQuote>
    ),
    [INLINES.HYPERLINK]: (node: ReactNode, children: string) => {
      return <HyperLink href={node?.data?.uri}>{children}</HyperLink>
    },
    [INLINES.EMBEDDED_ENTRY]: (node: ReactNode) =>
      defaultInline(INLINES.EMBEDDED_ENTRY, node as Inline)
  }
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
  type,
  node: Inline
) => {
  const contentType = getContentType(node)

  return <Underline>{contentType.title}</Underline>
}

interface Props {
  content?: Document
}

const RichText = (props: Props) => {
  const { content } = props
  if (!content) return null
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

const Italic = styled.Text`
  font-family: ${fonts.medium};
  font-style: italic;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Underline = styled.Text`
  text-decoration: underline;
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Code = styled.Text`
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const Paragraph = styled.Text`
  font-size: 15px;
  line-height: 25px;
  margin-bottom: 20px;
  font-family: ${fonts.medium};
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
  color: ${colors.darkBlue};
`

const List = ({
  node: { nodeType },
  children
}: {
  node: any
  children: any
}) => {
  const ordered = nodeType === 'ordered-list'
  const mapped = children.map((child: any) => (
    <ListItemContainer ordered={ordered} key={child.key}>
      {ordered ? <Number>{parseInt(child.key) + 1}.</Number> : <Dot />}
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
  font-family: ${fonts.medium};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
`

const BlockQuote = styled.View`
  padding-left: 10px;
  border-left-color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  border-left-width: 2px;
`

type ImageProps = {
  type: string
  node: Inline
}

const ImageBlock = ({ type, node }: ImageProps): ReactNode => {
  const url = `https:${
    node.data.target.fields.file.url
  }?fm=jpg&fl=progressive&w=${WIDTH * 2}`
  const isSvg = node.data.target.fields.file.contentType === 'image/svg+xml'
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  if (isSvg) return null

  useLayoutEffect(() => {
    Image.getSize(
      url,
      (width, height) => setDimensions({ width, height }),
      () => {}
    )
  }, [])

  return (
    <ImageContainer>
      {!isSvg && (
        <Img
          resizeMode="contain"
          width={dimensions.width / 2}
          height={dimensions.height / 2}
          source={{ uri: url }}
        />
      )}
      <ImageTitle>{node.data.target.fields.title}</ImageTitle>
      <ImageDescription>{node.data.target.fields.description}</ImageDescription>
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
