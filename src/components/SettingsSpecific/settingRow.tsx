import React, { FC } from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { constants, fonts } from '@styles/themes'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'

interface Props {
  onPress?: () => void
  icon?: string
  children?: JSX.Element[] | JSX.Element
  badge?: number
}

const SettingRow: FC<Props> = ({ badge, icon, children, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Container>
      <IconContainer>
        <Icon name={`${icon}`} height={25} width={25} />
        {badge ? (
          <Badge>
            <BadgeCount>{badge}</BadgeCount>
          </Badge>
        ) : null}
      </IconContainer>
      <InnerContainer>{children}</InnerContainer>
    </Container>
  </TouchableOpacity>
)

export default SettingRow

const Container = styled.View`
  margin: 0px 20px;
  padding: 20px 0px;
  flex-direction: row;
  border-bottom-width: ${constants.hairlineWidth}px;
  border-bottom-color: ${({ theme }) => theme.HAIRLINE_COLOR};
`

const InnerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`

const Icon = styled(IconBold).attrs(({ theme }) => ({
  fill: theme.PRIMARY_TEXT_COLOR
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
