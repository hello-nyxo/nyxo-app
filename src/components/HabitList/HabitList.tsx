import { useAppDispatch } from '@hooks/redux'
import { useNavigation } from '@react-navigation/native'
import { toggleNewHabitModal } from '@reducers/modal'
import { getHabitSections } from '@selectors/habit-selectors/habit-selectors'
import { fonts } from '@styles/themes'
import { Habit } from '@typings/State/habit-state'
import React, { FC, memo, ReactElement } from 'react'
import { SectionList, SectionListRenderItem } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'
import colors from '../../styles/colors'
import HabitCard from '../HabitCard/HabitCard'
import { IconBold } from '../iconRegular'
import { H3 } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

type Props = {
  refreshControl?: ReactElement
  footer?: ReactElement
  header?: ReactElement
}

const HabitList: FC<Props> = ({ refreshControl, footer, header }) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const sections = useAppSelector(getHabitSections)

  const renderItem: SectionListRenderItem<Habit, unknown> = ({
    item,
    index
  }) => <HabitCard key={index} habit={item} />

  const goToHabits = () => {
    navigation.navigate('Habits')
  }

  const toggleModal = () => {
    dispatch(toggleNewHabitModal(true))
  }

  return (
    <List
      refreshControl={refreshControl}
      ListHeaderComponent={() => (
        <Fill>
          {header}
          <TitleRow>
            <TitleContainer>
              <H3>HABIT.HABIT_TITLE</H3>
            </TitleContainer>
            <NewHabitButton onPress={toggleModal}>
              <IconBold
                width={20}
                height={20}
                name="circleAdd"
                fill={colors.darkBlue}
              />
            </NewHabitButton>
          </TitleRow>
        </Fill>
      )}
      keyExtractor={(item) => item.title}
      sections={sections}
      renderItem={renderItem}
      ListFooterComponent={() => (
        <FooterRow>
          <TouchableOpacity onPress={goToHabits}>
            <ShowAllText>SEE_ALL</ShowAllText>
          </TouchableOpacity>
          {footer}
        </FooterRow>
      )}
    />
  )
}

export default memo(HabitList)

const List = styled(SectionList as new () => SectionList<Habit>).attrs(
  ({ theme }) => ({
    contentContainerStyle: {
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR
    }
  })
)`
  background-color: ${colors.darkBlue};
`

const Fill = styled.View`
  background-color: ${({ theme }) => theme.PRIMARY_BACKGROUND_COLOR};
  width: 100%;
`

const TitleRow = styled.View`
  margin-top: 30px;
  padding: 0px 20px;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const NewHabitButton = styled.TouchableOpacity`
  padding: 3px;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
`

const ShowAllText = styled(TranslatedText)`
  font-family: ${fonts.bold};
  color: ${colors.darkBlue};
`

const FooterRow = styled.View`
  margin-top: 20px;
  margin-bottom: 60px;
  padding: 0px 20px;
  flex-direction: row;
  justify-content: flex-end;
`

const TitleContainer = styled.View`
  flex: 1;
`
