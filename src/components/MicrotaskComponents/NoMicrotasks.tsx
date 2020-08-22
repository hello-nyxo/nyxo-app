import React, { memo } from 'react'
import { View } from 'react-native'
import TranslatedText from '../TranslatedText'

const NoMicrotasks = () => {
  return (
    <View style={{ padding: 20 }}>
      <TranslatedText style={{ color: 'red' }}>
        NoMicrotaskDisclaimer
      </TranslatedText>
    </View>
  )
}

export default memo(NoMicrotasks)
