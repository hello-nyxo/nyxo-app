import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import {
  addManualDataToNight,
  toggleEditMode
} from '../../actions/manual-sleep/manual-sleep-actions'
import { SMART_TOP_PADDING } from '../../helpers/Dimensions'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'
import {
  getEditMode,
  getEndTime,
  getStartTime
} from '../../store/Selectors/ManualDataSelectors'
import { getSelectedDay } from '../../store/Selectors/SleepDataSelectors'
import { P } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

export const EditNightHeader = () => {
  const editMode = useSelector(getEditMode)
  const dispatch = useDispatch()
  const currentDay = useSelector(getSelectedDay)
  const startTime = useSelector(getStartTime)
  const endTime = useSelector(getEndTime)

  const handleSave = async () => {
    await dispatch(addManualDataToNight(currentDay.date, startTime, endTime))
    await dispatch(toggleEditMode())
  }

  const handleCancel = async () => {
    await dispatch(toggleEditMode())
  }

  if (!editMode) return null
  return (
    <Header>
      {editMode ? (
        <>
          <LeftButton onPress={handleCancel}>
            <Text>Cancel</Text>
          </LeftButton>
          <Title>ADD_NIGHT</Title>
          <RightButton onPress={handleSave}>
            <Text>Save</Text>
          </RightButton>
        </>
      ) : null}
    </Header>
  )
}

export default memo(EditNightHeader)

const Header = styled.View`
  position: absolute;
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  left: 0px;
  right: 0px;
  top: ${SMART_TOP_PADDING}px;
  height: 80px;
  z-index: 30;
  box-shadow: ${(props: StyleProps) => props.theme.SHADOW};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 0px;
`

const Text = styled(P)`
  color: ${colors.radiantBlue};
  font-size: 15px;
  font-family: ${fonts.bold};
`

const LeftButton = styled.TouchableOpacity``
const RightButton = styled.TouchableOpacity``

const Title = styled(TranslatedText)`
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
`
