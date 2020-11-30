import React, { FC } from 'react'
import styled from 'styled-components/native'
import colors from '../../../styles/colors'
import { fonts } from '../../../styles/themes'
import { IconBold } from '../../iconRegular'
import TranslatedText from '../../TranslatedText'

type Props = {
  setTimePeriod: (period: string) => void
  currentTimePeriod: string
}

const SetTimePeriodButtons: FC<Props> = ({
  setTimePeriod,
  currentTimePeriod
}) => {
  const periodButtons = [
    {
      name: 'morning',
      color: colors.morning,
      accentColor: colors.morningAccent,
      setFunction: () => setTimePeriod('morning'),
      icon: 'daySunrise'
    },
    {
      name: 'afternoon',
      color: colors.afternoon,
      accentColor: colors.afternoonAccent,
      setFunction: () => setTimePeriod('afternoon'),
      icon: 'sun'
    },
    {
      name: 'evening',
      color: colors.evening,
      accentColor: colors.eveningAccent,
      setFunction: () => setTimePeriod('evening'),
      icon: 'daySunset'
    }
  ]

  const buttons = periodButtons.map((item) => {
    const active = currentTimePeriod === item.name

    return (
      <ButtonContainer
        active={active}
        accentColor={item.accentColor}
        key={item.name}
        onPress={item.setFunction}>
        <TimeFrame>
          <IconBold
            width={17}
            height={17}
            fill={active ? item.accentColor : colors.gray2}
            name={item.icon}
          />
          <ButtonText
            active={active}
            accentColor={item.accentColor}
            adjustsFontSizeToFit
            numberOfLines={1}>
            {`HABIT.${item.name.toUpperCase()}`}
          </ButtonText>
        </TimeFrame>
      </ButtonContainer>
    )
  })

  return <Container>{buttons}</Container>
}

export default React.memo(SetTimePeriodButtons)

const Container = styled.View`
  flex-direction: row;
  margin: 20px 0px;
`

interface ButtonProps {
  readonly active?: boolean
  readonly accentColor?: string
}

const TimeFrame = styled.View`
  padding: 10px 0px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  flex: 1;
  border-radius: 10px;
  margin: 5px;
  border-width: 2px;
  border-color: ${(props) => (props.active ? props.accentColor : colors.gray2)};
`

const ButtonText = styled(TranslatedText)<ButtonProps>`
  text-align: center;
  font-family: ${fonts.medium};
  color: ${(props: ButtonProps) =>
    props.active ? props.accentColor : colors.gray2};
  font-size: 15px;
  margin-left: 5px;
`
