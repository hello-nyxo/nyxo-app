import React from 'react'
import styled from 'styled-components/native'
import { fonts, StyleProps } from '@styles/themes'

interface Props {
  title: string
  description: any
}

const SectionFooter = (props: Props) => {
  const { description } = props

  if (!description) return null

  return <Footer />
}

export default SectionFooter

const Footer = styled.View`
  padding: 0px 20px;
`

const tagsStyles = {
  p: { fontSize: 20, fontFamily: fonts.domine },
  h3: { fontSize: 22, fontFamily: fonts.bold, color: 'red' }
}

// const rends = {
//   renderers: {
//     li: (_htmlAttribs, _children, _convertedCSSStyles, passProps) => (
//       <Li>{_children}</Li>
//     )
//   }
// };

const Text = styled.Text``

const Li = styled.View`
  margin: 0px;
`

const Number = styled.Text`
  margin-right: 5px;
  font-size: 12px;
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
`

// const ol = (htmlAttribs, children, convertedCSSStyles, passProps = {}) => {
//   const style = _constructStyles({
//     tagName: "ul",
//     htmlAttribs,
//     passProps,
//     styleSet: "VIEW"
//   });
//   const {
//     allowFontScaling,
//     rawChildren,
//     nodeIndex,
//     key,
//     baseFontStyle,
//     listsPrefixesRenderers
//   } = passProps;
//   const baseFontSize = baseFontStyle.fontSize || 14;

//   children =
//     children &&
//     children.map((child: ReactElementLike, index: number) => {
//       const rawChild = rawChildren[index];
//       let prefix = false;
//       const rendererArgs = [
//         htmlAttribs,
//         children,
//         convertedCSSStyles,
//         {
//           ...passProps,
//           index
//         }
//       ];

//       if (rawChild) {
//         if (rawChild.parentTag === "ul" && rawChild.tagName === "li") {
//           prefix =
//             listsPrefixesRenderers && listsPrefixesRenderers.ul ? (
//               listsPrefixesRenderers.ul(...rendererArgs)
//             ) : (
//               <View
//                 style={{
//                   marginRight: 10,
//                   width: baseFontSize / 2.8,
//                   height: baseFontSize / 2.8,
//                   marginTop: baseFontSize / 2,
//                   borderRadius: baseFontSize / 2.8,
//                   backgroundColor: "black"
//                 }}
//               />
//             );
//         } else if (rawChild.parentTag === "ol" && rawChild.tagName === "li") {
//           prefix =
//             listsPrefixesRenderers && listsPrefixesRenderers.ol ? (
//               listsPrefixesRenderers.ol(...rendererArgs)
//             ) : (
//               <Text
//                 allowFontScaling={allowFontScaling}
//                 style={{ marginRight: 5, fontSize: baseFontSize }}>
//                 {index + 1})
//               </Text>
//             );
//         }
//       }
//       return (
//         <View
//           key={`list-${nodeIndex}-${index}-${key}`}
//           style={{ flexDirection: "row", marginBottom: 10 }}>
//           {prefix}
//           <View style={{ flex: 1 }}>{child}</View>
//         </View>
//       );
//     });
//   return (
//     <View style={style} key={key}>
//       {children}
//     </View>
//   );
// };

const ListContainer = styled.View``
