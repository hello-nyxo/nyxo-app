import {
  addManualDataToNight,
  toggleEditMode
} from '@actions/manual-sleep/manual-sleep-actions'
import {
  getEditMode,
  getEndTime,
  getStartTime
} from '@selectors/ManualDataSelectors'
import { getSelectedDay } from '@selectors/SleepDataSelectors'
import React, { memo, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/native'
import { SMART_TOP_PADDING } from @helpers/Dimensions'
import colors from '../../styles/colors'
import { fonts, StyleProps } from '../../styles/themes'
import { P } from '../Primitives/Primitives'
import TranslatedText from '../TranslatedText'

export const EditNightHeader: FC = () => {
  const dispatch = useDispatch()

  const editMode = useSelector(getEditMode)
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
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
  left: 0px;
  right: 0px;
  top: 0;
  z-index: 30;
  box-shadow: ${(props: StyleProps) => props.theme.SHADOW};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${SMART_TOP_PADDING}px 20px 0px;
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
