import * as React from 'react'
import { Image, View } from 'react-native'
import { connect } from 'react-redux'
import { prepareSleepDataFetching } from '@actions/SleepDataActions'
import { PrimaryButton } from '@components/Buttons/PrimaryButton'
import TranslatedText from '@components/TranslatedText'
import colors from '../../../styles/colors'
import { fonts } from '../../../styles/themes'

interface HealthKitProps {
  prepareSleepDataFetching: Function
}

const HealthKit = (props: HealthKitProps) => {
  return (
    <View
      style={{
        zIndex: 40,
        elevation: 6,
        backgroundColor: colors.afternoon,
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 20,
        paddingHorizontal: 30
      }}>
      <View style={{ marginBottom: 20 }}>
        <Image
          resizeMode="contain"
          width={30}
          height={30}
          source={require('../../../assets/healthkitIcon.png')}
        />
      </View>
      <TranslatedText
        style={{
          textAlign: 'center',
          fontSize: 21,
          color: colors.afternoonAccent,
          marginBottom: 20,
          fontFamily: fonts.bold
        }}>
        Allow reading Apple Health
      </TranslatedText>

      <PrimaryButton
        title="Connect HealthKit"
        onPress={() => props.prepareSleepDataFetching()}
      />
    </View>
  )
}

export default connect(null, { prepareSleepDataFetching })(HealthKit)
