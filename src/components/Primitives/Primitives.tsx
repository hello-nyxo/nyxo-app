import React, { FC } from 'react'
import {
  FlatList,
  SafeAreaView as RNSafeAreaView,
  StyleSheet
} from 'react-native'
import ReactNativeModal from 'react-native-modal'
import Animated from 'react-native-reanimated'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'
import TranslatedText, { AnimatedTranslatedText } from '../TranslatedText'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Modal = ReactNativeModal as any

interface ContainerProps {
  background?: boolean
}

export const Container = styled.View<ContainerProps>`
  margin-right: 16px;
  margin-left: 16px;
  flex: 1;
  background-color: ${({ theme, background }) =>
    background ? theme.PRIMARY_BACKGROUND_COLOR : 'transparent'};
`

export const Bordered = styled.View`
  border-bottom-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
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
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
`

interface TextProps {
  readonly center?: boolean
  readonly secondary?: boolean
}

export const H1 = styled(TranslatedText)<TextProps>`
  font-size: 34px;
  margin-bottom: 10px;
  margin-top: 5px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${({ theme }) => theme.FONT_BOLD};
`

export const H1N = styled.Text<TextProps>`
  font-size: 34px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const PageTitle = styled(AnimatedTranslatedText)<TextProps>`
  font-size: 34px;
  margin: 40px 20px 20px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.medium};
`

export const H1Animated = styled(AnimatedTranslatedText)<TextProps>`
  font-size: 34px;
  margin-bottom: 10px;
  margin-top: 5px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H2 = styled(TranslatedText)<TextProps>`
  font-size: 28px;
  margin-bottom: 10px;
  margin-top: 5px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H2N = styled.Text<TextProps>`
  font-size: 28px;
  margin-bottom: 10px;
  margin-top: 5px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H3 = styled(TranslatedText)<TextProps>`
  font-size: 22px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H3Margin = styled(H3)`
  margin: 0px 20px;
`

export const H4 = styled(TranslatedText)<TextProps>`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H5 = styled(TranslatedText)<TextProps>`
  font-size: 17px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const H4N = styled.Text<TextProps>`
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
  font-weight: bold;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-family: ${fonts.bold};
`

export const P = styled(TranslatedText)<TextProps>`
  font-size: 15px;
  line-height: 25px;
  font-family: ${fonts.medium};
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme, secondary }) =>
    secondary ? theme.SECONDARY_TEXT_COLOR : theme.PRIMARY_TEXT_COLOR};
`

export const PN = styled.Text<TextProps>`
  font-size: 15px;
  line-height: 25px;
  font-family: ${fonts.medium};
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ theme, secondary }) =>
    secondary ? theme.SECONDARY_TEXT_COLOR : theme.PRIMARY_TEXT_COLOR};
`

export const SafeAreaView = styled(RNSafeAreaView)`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  flex: 1;
`

export const StyledModal = styled(Modal)`
  bottom: 0;
  left: 0;
  justify-content: center;
  flex: 1;
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  margin: 100px 0px 0px 0px;
`

export const StyledScrollView = styled.ScrollView.attrs(({ theme }) => ({
  contentContainerStyle: {
    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR
  }
}))`
  /* background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR}; */
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
        fill={colors.darkBlue}
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
  tintColor: colors.darkBlue
}))``

export const Switch = styled.Switch.attrs(({ theme }) => ({
  trackColor: {
    false: theme.SECONDARY_BACKGROUND_COLOR,
    true: theme.accent
  }
}))``
