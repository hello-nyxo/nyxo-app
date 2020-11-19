import GoBack, { GoBackContainer } from '@components/Buttons/GoBack'
import { SafeAreaView } from '@components/Primitives/Primitives'
import ROUTE from '@config/routes/Routes'
import { SourceSettingsView } from '@views/SourceView'
import React, { memo } from 'react'
import { ScrollView } from 'react-native'

const SetSourceScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <GoBackContainer>
          <GoBack route={ROUTE.SETTINGS} />
        </GoBackContainer>
        <SourceSettingsView />
      </ScrollView>
    </SafeAreaView>
  )
}

export default memo(SetSourceScreen)
