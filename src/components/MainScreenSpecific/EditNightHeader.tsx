import {
  addManualDataToNight,
  toggleEditMode
} from '@actions/manual-sleep/manual-sleep-actions'
import { SMART_TOP_PADDING } from '@helpers/Dimensions'
import { getSelectedDate } from '@selectors/calendar-selectors'
import {
  getEditMode,
  getEndTime,
  getStartTime
} from '@selectors/ManualDataSelectors'
import React, { FC, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { fonts } from '@styles/themes'
import colors from '../../styles/colors'
import { P } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

export const EditNightHeader: FC = () => {
  const dispatch = useDispatch()

  const editMode = useSelector(getEditMode)
  const selectedDate = useSelector(getSelectedDate)
  const startTime = useSelector(getStartTime)
  const endTime = useSelector(getEndTime)

  const handleSave = async () => {
    await dispatch(addManualDataToNight(selectedDate, startTime, endTime))
    await dispatch(toggleEditMode())
  }

  const handleCancel = async () => {
    await dispatch(toggleEditMode())
  }

  if (!editMode) return null

  return (
    <Header>
      {editMode && (
        <>
          <LeftButton onPress={handleCancel}>
            <Text>Cancel</Text>
          </LeftButton>
          <Title>ADD_NIGHT</Title>
          <RightButton onPress={handleSave}>
            <Text>Save</Text>
          </RightButton>
        </>
      )}
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

const LeftButton = styled.TouchableOpacity``
const RightButton = styled.TouchableOpacity``

const Title = styled(TranslatedText)`
  color: ${({ theme }) => theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
`
