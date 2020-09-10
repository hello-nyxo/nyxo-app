import React from 'react'
import {
  FlatList,
  SafeAreaView as RNSafeAreaView,
  StyleSheet
} from 'react-native'
import ReactNativeModal from 'react-native-modal'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'
import { IconBold } from '../iconRegular'
import TranslatedText, { AnimatedTranslatedText } from '../TranslatedText'

const Modal = ReactNativeModal as any

interface ContainerProps extends StyleProps {
  background?: boolean
}

export const Container = styled.View<ContainerProps>`
  margin-right: 20px;
  margin-left: 20px;
  flex: 1;
  background-color: ${(props: ContainerProps) =>
    props.background ? props.theme.PRIMARY_BACKGROUND_COLOR : 'transparent'};
`

export const Bordered = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${(props: StyleProps) => props.theme.HAIRLINE_COLOR};
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Column = styled.View`
  flex-direction: column;
`

export const BGContainer = styled.View`
  flex: 1;
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`

interface TextProps extends StyleProps {
  readonly center?: boolean
  readonly secondary?: boolean
}

export const H1 = styled(TranslatedText)<StyleProps & TextProps>`
  font-size: 34px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H1N = styled.Text<StyleProps & TextProps>`
  font-size: 34px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const PageTitle = styled(AnimatedTranslatedText)<StyleProps & TextProps>`
  font-size: 34px;
  margin: 40px 20px 20px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.medium};
`

export const H1Animated = styled(AnimatedTranslatedText)<
  StyleProps & TextProps
>`
  font-size: 34px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H2 = styled(TranslatedText)`
  font-size: 28px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H2N = styled.Text`
  font-size: 28px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: TextProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H3 = styled(TranslatedText)`
  font-size: 22px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H3Margin = styled(H3)`
  margin: 0px 20px;
`

export const H4 = styled(TranslatedText)`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H5 = styled(TranslatedText)`
  font-size: 17px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H4N = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const P = styled(TranslatedText)<TextProps>`
  font-size: 15px;
  line-height: 25px;
  font-family: ${fonts.medium};
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: TextProps) =>
    props.secondary
      ? props.theme.SECONDARY_TEXT_COLOR
      : props.theme.PRIMARY_TEXT_COLOR};
`

export const PN = styled.Text<TextProps>`
  font-size: 15px;
  line-height: 25px;
  font-family: ${fonts.medium};
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: ${(props: TextProps) => (props.center ? 'center' : 'left')};
  color: ${(props: TextProps) =>
    props.secondary
      ? props.theme.SECONDARY_TEXT_COLOR
      : props.theme.PRIMARY_TEXT_COLOR};
`

export const SafeAreaView = styled(RNSafeAreaView)<StyleProps>`
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
  flex: 1;
`

export const StyledModal = styled(Modal)<StyleProps>`
  bottom: 0;
  left: 0;
  justify-content: center;
  flex: 1;
  background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
  margin: 100px 0px 0px 0px;
`

export const StyledScrollView = styled.ScrollView.attrs(
  (props: StyleProps) => ({
    contentContainerStyle: {
      backgroundColor: props.theme.PRIMARY_BACKGROUND_COLOR
    }
  })
)`
  /* background-color: ${(props: StyleProps) =>
    props.theme.PRIMARY_BACKGROUND_COLOR}; */
`

interface CheckBoxProps {
  readonly checked: boolean
  size: number | string
}
export const CheckBox: FC<CheckBoxProps> = ({ checked, size }) => {
  return (
    <CheckBoxContainer>
      <IconBold
        name={checked ? 'circleCheck' : 'circleUncheck'}
        height={size}
        width={size}
        fill={colors.radiantBlue}
      />
    </CheckBoxContainer>
  )
}

const CheckBoxContainer = styled.View`
  padding: 0px;
  margin-right: 10px;
`

export const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

export const ThemedRefreshControl = styled.RefreshControl.attrs(() => ({
  tintColor: colors.radiantBlue
}))``
