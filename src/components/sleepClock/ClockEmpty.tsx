import { updateCalendar } from '@actions/sleep/sleep-data-actions'
import React from 'react'
import { Button, Dimensions, View } from 'react-native'
import { useDispatch } from 'react-redux'
import TranslatedText from '../TranslatedText'

const { width } = Dimensions.get('window')

const ClockEmpty = () => {
  const dispatch = useDispatch()

  const updateData = async () => {
    dispatch(updateCalendar())
  }

  return (
    <View
      style={{
        width,
        transform: [{ scaleX: -1 }],
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <TranslatedText>ClockNotLoading</TranslatedText>
      <Button onPress={updateData} title="Reload data" />
    </View>
  )
}

export default ClockEmpty
