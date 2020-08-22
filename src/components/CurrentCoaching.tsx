import React, { memo } from 'react'
import { SafeAreaView, View, Text } from 'react-native '
import BottomSheet from 'reanimated-bottom-sheet'

const CurrentCoaching = () => {
  const renderInner = () => {
    return <View />
  }

  const renderHeader = () => {
    return <View />
  }

  return (
    <SafeAreaView>
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <BottomSheet
          snapPoints={[450, 300, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
        />
      </View>
    </SafeAreaView>
  )
}

export default memo(CurrentCoaching)
