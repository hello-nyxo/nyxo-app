import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import { SafeAreaView } from '@components/Primitives/Primitives'

import { SourceSettingsView } from '@views/SourceView'
import React, { memo } from 'react'
import { ScrollView } from 'react-native'

const SetSourceScreen = () => (
  <SafeAreaView>
    <ScrollView>
      <GoBackContainer>
        <GoBack route="SettingsScreen" />
      </GoBackContainer>
      <SourceSettingsView />
    </ScrollView>
  </SafeAreaView>
)

export default memo(SetSourceScreen)
