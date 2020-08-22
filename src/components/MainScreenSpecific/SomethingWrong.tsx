import React from 'react'
import { SafeAreaView } from 'react-native'
import EmptyState from '../EmptyState'
import { PrimaryButton } from '../Buttons/PrimaryButton'

const SomethingWrong = ({ refresh }: { refresh: Function }) => {
  return (
    <SafeAreaView>
      <EmptyState />
      <PrimaryButton title="Refresh" onPress={refresh} />
    </SafeAreaView>
  )
}

export default SomethingWrong
