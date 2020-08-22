import { useNavigation } from '@react-navigation/core'
import {
  handleHabitsFromCloudWhenLoggingIn,
  toggleMergingDialog
} from '@actions/habit/habit-actions'
import { WIDTH } from 'helpers/Dimensions'
import React, { memo, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthState } from 'store/Selectors/auth-selectors/auth-selectors'
import { getMergingDialogDisplayed } from 'store/Selectors/habit-selectors/habit-selectors'
import { getUsername } from 'store/Selectors/UserSelectors'
import styled from 'styled-components/native'
import ROUTE from 'config/routes/Routes'
import TranslatedText from 'components/TranslatedText'
import translate from '../../../config/i18n'
import { fonts, StyleProps } from '../../../styles/themes'

const MergingDialog = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const mergeDialogDisplayed = useSelector(getMergingDialogDisplayed)

  const [enableIndicator, setEnableIndicator] = useState(false)
  const username = useSelector(getUsername) as string
  const loggedIn = useSelector(getAuthState)

  if (!mergeDialogDisplayed) return null

  const close = () => {
    dispatch(toggleMergingDialog(false))
    navigation.navigate(ROUTE.SLEEP, {})
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

        <ActivityIndicator
          animating={enableIndicator}
          size="large"
          style={{ marginTop: enableIndicator ? 15 : 0 }}
        />
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
  background-color: ${(props: StyleProps) =>
    props.theme.SECONDARY_BACKGROUND_COLOR};
`

const Description = styled(TranslatedText)`
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
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
  color: ${(props: StyleProps) => props.theme.PRIMARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
`

const DisagreeText = styled(TranslatedText)`
  color: ${(props: StyleProps) => props.theme.SECONDARY_TEXT_COLOR};
  font-size: 15px;
  font-family: ${fonts.medium};
`
