import React, { memo } from 'react'
import { View, Text, Dimensions } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import BottomActionSheetHeader from './BottomActionSheetHeader'
import BottomActionSheetContent from './BottomActionSheetContent'

const { height } = Dimensions.get('window')

const BottomActionSheet = () => {
  const renderInner = () => <BottomActionSheetContent />
  const renderHeader = () => <BottomActionSheetHeader />

  return (
    <BottomSheet
      snapPoints={[0, height / 2, '80%']}
      renderContent={renderInner}
      renderHeader={renderHeader}
    />
  )
}

export default memo(BottomActionSheet)
