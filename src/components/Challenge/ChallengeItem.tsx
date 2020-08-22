import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'
import { Challenge } from '../../Types/ChallengeState'
import ScalingButton from '../Buttons/ScalingButton'
import { IconBold } from '../iconRegular'

const { width } = Dimensions.get('window')

const ChallengeItem = ({ challenge }: { challenge: Challenge }) => {
  const onPress = () => {}

  return (
    <ScalingButton onPress={onPress} analyticsEvent={challenge.titleEN}>
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          marginVertical: 5,
          width: width - 20,
          padding: 10,
          alignItems: 'center',
          borderRadius: 15,
          backgroundColor: 'rgba(245,245,251,1)'
        }}>
        <View
          style={{
            width: 45,
            height: 45,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.radiantBlueTransparent,
            marginRight: 10
          }}>
          <IconBold
            name="trophyStar"
            height={20}
            width={20}
            fill={colors.radiantBlue}
          />
        </View>
        <View style={{ width: 200 }}>
          <Text style={{ fontFamily: fonts.bold, fontSize: 17 }}>
            {challenge.titleFI}
          </Text>
          {/* <Text
					numberOfLines={2}
					adjustsFontSizeToFit={true}
					style={{ fontFamily: fonts.medium, marginTop: 5, fontSize: 12 }}>
					{challenge.descFI}
				</Text> */}
        </View>
      </View>
    </ScalingButton>
  )
}

export default React.memo(ChallengeItem)
