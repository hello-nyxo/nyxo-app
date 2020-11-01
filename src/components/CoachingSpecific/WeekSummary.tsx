import React, { memo } from 'react'
import { View } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import ViewOverflow from 'react-native-view-overflow'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'
import { Container, H2 } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

const WeekSummary = () => {
  const requirements = [
    { requirement: 'Complete at least 4 lessons', completed: false },
    { requirement: 'Create at least 2 Actions', completed: true },
    { requirement: 'Survive through the week', completed: true }
  ].map((item, index) => {
    return (
      <ListItem key={index}>
        <ListItemTitle>{item.requirement}</ListItemTitle>
        {item.completed ? (
          <Icon
            fill={colors.radiantBlue}
            height={20}
            width={20}
            name="circleCheck"
          />
        ) : (
          <IncompleteIcon />
        )}
      </ListItem>
    )
  })

  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <H2>Week Summary</H2>
        <AnimatedCircularProgress
          size={50}
          width={5}
          rotation={0}
          lineCap="round"
          fill={50}
          tintColor={colors.radiantBlue}
          backgroundColor="green">
          {(fill: number) => <Percentage>{`${Math.round(fill)}%`}</Percentage>}
        </AnimatedCircularProgress>
      </View>
      <List>{requirements}</List>
    </Container>
  )
}

export default memo(WeekSummary)

const List = styled.View`
  margin-right: 25px;
`

const Icon = styled(IconBold)`
  position: absolute;
  right: -10;
  bottom: 0;
  background-color: transparent;
`

const ListItem = styled.View`
  border-right-width: 2;
  border-right-color: purple;
  flex-direction: row;
  padding-top: 30px;
  align-items: center;
`

const ListItemTitle = styled(TranslatedText)`
  font-family: ${fonts.medium};
  font-size: 15;
  color: black;
`

const Percentage = styled.Text`
  font-size: 10;
  font-family: ${fonts.bold};
  color: ${colors.radiantBlue};
`

const IncompleteIcon = styled(ViewOverflow)`
  height: 20;
  width: 20;
  border-radius: 30px;
  position: absolute;
  right: -10;
  bottom: 0;
  background-color: green;
`
