import Analytics from 'appcenter-analytics'
import React, { memo } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import { constants, fonts, StyleProps } from '../../styles/themes'
import { IconBold } from '../iconRegular'

interface Props {
  analyticsEvent: string
  onPress: Function
  icon: string
  children: any
  badge?: number
}

const SettingRow = (props: Props) => {
  const onPress = () => {
    Analytics.trackEvent(props.analyticsEvent)
    props.onPress()
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <Container>
        <IconContainer>
          <Icon name={props.icon} height={25} width={25} />
          {props.badge ? (
            <Badge>
              <BadgeCount>{props.badge}</BadgeCount>
            </Badge>
          ) : null}
        </IconContainer>
        <InnerContainer>{props.children}</InnerContainer>
      </Container>
    </TouchableOpacity>
  )
}

export default memo(SettingRow)

const Container = styled.View<StyleProps>`
  margin: 0px 20px;
  padding: 20px 0px;
  flex-direction: row;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${(props: StyleProps) => props.theme.HAIRLINE_COLOR};
`

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`

const Icon = styled(IconBold).attrs((props: StyleProps) => ({
  fill: props.theme.PRIMARY_TEXT_COLOR
}))``

const IconContainer = styled.View`
  margin-right: 20px;
`

const Badge = styled.View`
  position: absolute;
  right: -5px;
  top: -3px;
  height: 15px;
  width: 15px;
  border-radius: 15px;
  background-color: ${colors.accentRed};
  align-items: center;
  justify-content: center;
`

const BadgeCount = styled.Text`
  color: white;
  text-align: center;
  font-family: ${fonts.bold};
  font-size: 10px;
`
