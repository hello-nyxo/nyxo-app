import React, { memo } from 'react'
import styled from 'styled-components/native'
import TranslatedText from '../../TranslatedText'
import { fonts } from '../../../styles/themes'
import { IconBold } from '../../iconRegular'
import colors from '../../../styles/colors'

type Props = {
  dayStreak: number
  longestDayStreak: number
}

const HabitModalStreak = ({ dayStreak, longestDayStreak }: Props) => (
  <>
    <Container>
      <Row>
        <IndicatorText>HABIT.CURRENT_STREAK</IndicatorText>
        <StreakHolder>
          <StreakText>{dayStreak}</StreakText>
          <IconBold
            name="flame"
            width={22}
            height={22}
            fill={colors.accentRed}
          />
        </StreakHolder>
      </Row>
      <Separator />
      <Row>
        <IndicatorText>HABIT.LONGEST_STREAK</IndicatorText>
        <StreakHolder>
          <StreakText>{longestDayStreak}</StreakText>
          <IconBold
            name="flame"
            width={22}
            height={22}
            fill={colors.darkBlue}
          />
        </StreakHolder>
      </Row>
    </Container>

    <HairlineContainer>
      <Hairline />
    </HairlineContainer>
  </>
)

export default memo(HabitModalStreak)

const Container = styled.View`
  padding: 0px 20px;
  margin-top: 30px;
`

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const IndicatorText = styled(TranslatedText)`
  font-family: ${fonts.bold};
  font-size: 15px;
  color: ${({ theme }) => theme.SECONDARY_TEXT_COLOR};
  opacity: 0.5;
`

const StreakHolder = styled.View`
  flex-direction: row;
  align-items: center;
`

const StreakText = styled.Text`
  font-family: ${fonts.bold};
  font-size: 17px;
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  margin-right: 10px;
`

const Separator = styled.View`
  height: 30px;
`

const HairlineContainer = styled.View`
  padding: 0px 68px;
  margin-top: 30px;
  flex-direction: row;
  justify-content: center;
`
const Hairline = styled.View`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.HAIRLINE_COLOR};
`
