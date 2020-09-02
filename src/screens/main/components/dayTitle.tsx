import React, { memo, useRef, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Transition, Transitioning } from 'react-native-reanimated'
import { useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation'
import Moment from 'moment'
import styled from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import TranslatedText, {
  AnimatedTranslatedText
} from '@components/TranslatedText'
import { getTitle } from '@helpers/time'

import { getSelectedDay } from '@selectors/SleepDataSelectors'
import ScalingButton from '@components/Buttons/ScalingButton'
import IconBold from '@components/iconBold'
import colors from '../../../styles/colors'
import IconButton from '@components/Buttons/IconButton'
import { H1 } from '@components/Primitives/Primitives'
import { fonts, StyleProps } from '../../../styles/themes'

interface DayTitleProps {
  freezeScroll: boolean
}

const DayTitle = (props: DayTitleProps) => {
  const { title, subtitle } = getTitle()
  const navigation = useNavigation()
  const ref: any = useRef()
  const selectedDay = useSelector(getSelectedDay)
  const [show, toggleShow] = useState(true)

  useEffect(() => {
    ref.current ? ref.current.animateNextTransition() : null
    toggleShow(!show)
  }, [props.freezeScroll])

  const onPress = () => {
    navigation.navigate('Detail', {
      selectedDay,
      title: Moment(selectedDay ? selectedDay.date : new Date())
    })
  }

  return (
    <Transitioning.View
      ref={ref}
      transition={transition}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20,
        minHeight: 90
      }}>
      {!show ? (
        <>
          <DayTitleContainer>
            <H1>{title}</H1>
            <SubTitle numberOfLines={2}>{subtitle}</SubTitle>
          </DayTitleContainer>

          <IconButton
            icon="statsGraphCircle"
            color={colors.radiantBlue}
            backgroundColor={colors.radiantBlueTransparent}
            analyticsEvent="Pressed open detail page"
            onPress={onPress}
          />
        </>
      ) : (
        <>
          <DayTitleContainer>
            <H1>EDIT_NIGHT</H1>
            <SubTitle numberOfLines={2}>ADD_NIGHT_INSTRUCTIONS</SubTitle>
          </DayTitleContainer>
          <ScalingButton
            analyticsEvent="Pressed open detail page"
            onPress={onPress}>
            <View
              style={{
                padding: 10,
                backgroundColor: colors.radiantBlueTransparent,
                borderRadius: 15
              }}>
              <IconBold
                name="statsGraphCircle"
                width={20}
                height={20}
                fill={colors.radiantBlue}
              />
            </View>
          </ScalingButton>
        </>
      )}
    </Transitioning.View>
  )
}

export default memo(DayTitle)

const transition = (
  <Transition.Sequence>
    <Transition.In type="fade" durationMs={250} interpolation="easeInOut" />
    <Transition.Out type="fade" durationMs={250} interpolation="easeInOut" />
  </Transition.Sequence>
)

const DayTitleContainer = styled.View`
  margin: 0px 20px;
  flex: 1;
`

const SubTitle = styled(AnimatedTranslatedText)`
  font-size: 15;
  font-family: ${fonts.medium};
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  margin: 2px 10px;
`
