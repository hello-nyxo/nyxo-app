import {
  handleHabitsFromCloudWhenLoggingIn,
  toggleMergingDialog
} from '@actions/habit/habit-actions'
import TranslatedText from '@components/TranslatedText'
import { WIDTH } from '@helpers/Dimensions'
import { useAppDispatch, useAppSelector } from '@hooks/redux'
import { useNavigation } from '@react-navigation/core'
import { getAuthState } from '@selectors/auth-selectors/auth-selectors'
import { getMergingDialogDisplayed } from '@selectors/habit-selectors/habit-selectors'
import React, { memo, useState } from 'react'
import styled from 'styled-components/native'

const MergingDialog = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const mergeDialogDisplayed = useAppSelector(getMergingDialogDisplayed)
  const username = useAppSelector(({ auth }) => auth.email)
  const loggedIn = useAppSelector(getAuthState)

  const [enableIndicator, setEnableIndicator] = useState(false)

  if (!mergeDialogDisplayed) return null

  const close = () => {
    dispatch(toggleMergingDialog(false))
    navigation.navigate('Sleep')
  }

  const disagree = async () => {
    if (loggedIn) {
      await dispatch(handleHabitsFromCloudWhenLoggingIn(username, false))
    }
    close()
  }

  const agree = async () => {
    setEnableIndicator(true)
    if (loggedIn) {
      await dispatch(handleHabitsFromCloudWhenLoggingIn(username, true))
    }
    setEnableIndicator(false)
    close()
  }

  return (
    <OuterContainer>
      <DialogContainer>
        <Description>HABIT.MERGE_DESCRIPTION</Description>
        <OptionRow>
          <Button onPress={disagree}>
            <DisagreeText>HABIT.DENY_MERGE</DisagreeText>
          </Button>
          <Button onPress={agree}>
            <AgreeText>HABIT.ALLOW_MERGE</AgreeText>
          </Button>
        </OptionRow>

        <ActivityIndicator animating={enableIndicator} size="large" />
      </DialogContainer>
    </OuterContainer>
  )
}

export default memo(MergingDialog)

const OuterContainer = styled.View`
  background-color: #00000033;
  justify-content: center;
  align-items: center;
  width: ${WIDTH}px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const DialogContainer = styled.View`
  border-radius: 15px;
  width: ${WIDTH * 0.9}px;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgSecondary};
`

const Description = styled(TranslatedText)`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 15px;
  font-family: ${({ theme }) => theme.medium};
`

const OptionRow = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const Button = styled.TouchableOpacity`
  padding: 15px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

const AgreeText = styled(TranslatedText)`
  color: ${({ theme }) => theme.textPrimary};
  font-size: 15px;
  font-family: ${({ theme }) => theme.medium};
`

const DisagreeText = styled(TranslatedText)`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 15px;
  font-family: ${({ theme }) => theme.medium};
`

const ActivityIndicator = styled.ActivityIndicator`
  margin-top: ${({ animating }) => (animating ? 15 : 0)}px;
`
