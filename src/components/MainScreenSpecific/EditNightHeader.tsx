import { SMART_TOP_PADDING } from '@helpers/Dimensions'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { toggleEditMode } from '@reducers/manual-sleep'
import { fonts } from '@styles/themes'
import React, { FC, memo } from 'react'
import styled from 'styled-components/native'
import colors from '@styles/colors'
import { P } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

export const EditNightHeader: FC = () => {
  const dispatch = useAppDispatch()

  const editMode = useAppSelector((state) => state.manualSleep.editMode)
  // const selectedDate = useAppSelector((state) => state.calendar.selectedDay)
  // const startTime = useAppSelector((state) => state.manualSleep.startTime)
  // const endTime = useAppSelector((state) => state.manualSleep.startTime)

  const handleSave = () => {
    // await dispatch(addManualDataToNight(selectedDate, startTime, endTime))
    dispatch(toggleEditMode(false))
  }

  const handleCancel = () => {
    dispatch(toggleEditMode(false))
  }

  if (!editMode) return null

  return (
    <Header>
      <LeftButton onPress={handleCancel}>
        <Text>Cancel</Text>
      </LeftButton>
      <Title>ADD_NIGHT</Title>
      <RightButton onPress={handleSave}>
        <Text>Save</Text>
      </RightButton>
    </Header>
  )
}

export default memo(EditNightHeader)

const Header = styled.View`
  position: absolute;
  background-color: ${({ theme }) => theme.SECONDARY_BACKGROUND_COLOR};
  left: 0px;
  right: 0px;
  top: 0;
  z-index: 30;
  box-shadow: ${({ theme }) => theme.SHADOW};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${SMART_TOP_PADDING}px 20px 0px;
`

const Text = styled(P)`
  color: ${colors.darkBlue};
  font-size: 15px;
  font-family: ${fonts.bold};
`

const LeftButton = styled.TouchableOpacity`
  flex: 1;
`
const RightButton = styled.TouchableOpacity`
  flex: 1;
`

const Title = styled(TranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  text-align: center;
  font-family: ${fonts.medium};
  flex: 1;
`
