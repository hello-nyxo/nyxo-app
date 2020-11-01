import { useNavigation } from '@react-navigation/native'
import { toggleNewHabitModal } from '@actions/modal/modal-actions'
import React, { memo, ReactElement } from 'react'
import { SectionList } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { getHabitSections } from '@selectors/habit-selectors/habit-selectors'
import styled from 'styled-components/native'
import { getEditMode } from '@selectors/ManualDataSelectors'
import { fonts, StyleProps } from '@styles/themes'
import HabitCard from '../HabitCard/HabitCard'
import { H3 } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'
import colors from '../../styles/colors'
import { IconBold } from '../iconRegular'

type Props = {
  refreshControl?: ReactElement
  footer?: ReactElement
  header?: ReactElement
}

const HabitList = (props: Props) => {
  const editMode = useSelector(getEditMode)
  const { refreshControl, footer, header } = props
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const sections = useSelector(getHabitSections)

  const renderItem = ({ item, index }: any) => {
    return <HabitCard key={index} habit={item} />
  }

  const goToHabits = () => {
    navigation.navigate('Habits')
  }

  const toggleModal = () => {
    dispatch(toggleNewHabitModal())
  }

  const keyExtractor = (item: any, index: number) => {
    return `habit_${item.title}_${index}`
  }

  return (
    <List
      scrollEnabled={!editMode}
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
                fill={colors.radiantBlue}
              />
            </NewHabitButton>
          </TitleRow>
        </Fill>
      )}
      keyExtractor={keyExtractor}
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

const List = styled(SectionList).attrs((props: StyleProps) => ({
  contentContainerStyle: {
    backgroundColor: props.theme.PRIMARY_BACKGROUND_COLOR
  }
}))`
  background-color: ${colors.radiantBlue};
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
  color: ${colors.radiantBlue};
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
