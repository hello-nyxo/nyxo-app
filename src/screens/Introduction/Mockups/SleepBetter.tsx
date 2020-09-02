import * as React from 'react'
import { View } from 'react-native'
import IconBold from '@components/iconBold'
import TranslatedText from '@components/TranslatedText'
import colors from '../../../styles/colors'

const SleepBetter = () => {
  return (
    <View
      style={{
        backgroundColor: colors.evening,
        padding: 20,
        borderRadius: 10,
        shadowColor: 'black',
        elevation: 5,
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 5,
        shadowOpacity: 0.1
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20
          }}>
          <IconBold
            fill={colors.eveningAccent}
            name="moonIcon"
            height={30}
            width={30}
          />
          <TranslatedText
            style={{
              textAlign: 'center',
              fontFamily: 'Montserrat-Bold',
              color: colors.eveningAccent,
              fontSize: 21,
              fontWeight: 'bold',
              marginLeft: 10
            }}>
            HeadsUpIntro
          </TranslatedText>
        </View>

        <TranslatedText
          style={{
            textAlign: 'center',
            fontFamily: 'Montserrat-Medium',
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: 10,
            color: colors.eveningAccent,
            marginHorizontal: 30
          }}>
          HeadsUpText
        </TranslatedText>
        {/*
				<View
					style={{
						backgroundColor: colors.radiantBlue,
						borderRadius: 50,
						padding: 15,
						alignItems: 'center',
						shadowColor: colors.radiantBlueShadow,
						shadowOffset: {
							width: 0,
							height: 3,
						},
						shadowRadius: 5,
						shadowOpacity: 0.7,
					}}>
					<TranslatedText
						style={{
							color: 'white',
							textAlign: 'center',
							fontFamily: fonts.medium,
							fontSize: 17,
						}}>
						HeadsUpStart
					</TranslatedText> */}
        {/* </View> */}
      </View>
    </View>
  )
}

export default SleepBetter
