import * as React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import Firebase from 'react-native-firebase'
import Intercom from 'react-native-intercom'
import TranslatedText from '../../../components/TranslatedText'
import colors from '../../../styles/colors'

const Notification = () => {
  const handlePress = () => {
    Platform.OS === 'ios'
      ? Intercom.registerForPush()
      : Firebase.messaging()
          .getToken()
          .then((token: any) => {
            Intercom.sendTokenToIntercom(token)
          })
  }
  return (
    <View
      style={{
        zIndex: 40,
        elevation: 2,
        backgroundColor: colors.evening,
        paddingTop: 20,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowOpacity: 0.1
      }}>
      <TranslatedText
        style={{
          textAlign: 'center',
          fontSize: 21,
          fontWeight: 'bold',
          marginBottom: 10,
          marginHorizontal: 30,
          color: colors.eveningAccent
        }}>
        Nyxo wants to send you notifications
      </TranslatedText>
      <TranslatedText
        style={{
          textAlign: 'center',
          fontSize: 13,
          marginHorizontal: 30,
          color: colors.eveningAccent
        }}>
        NotificationBoxText
      </TranslatedText>
      <View
        style={{
          marginTop: 30,
          flexDirection: 'row',
          borderTopColor: colors.eveningAccent,
          borderTopWidth: StyleSheet.hairlineWidth,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <TouchableOpacity
          style={{
            flex: 1
          }}>
          <TranslatedText
            style={{
              textAlign: 'center',
              fontSize: 17,
              flex: 1,
              marginVertical: 20,
              borderRightWidth: StyleSheet.hairlineWidth,
              borderRightColor: colors.eveningAccent
            }}>
            Don't Allow
          </TranslatedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderLeftColor: colors.eveningAccent,
            flex: 1
          }}
          onPress={handlePress}>
          <TranslatedText
            style={{
              textAlign: 'center',
              fontSize: 17,
              marginVertical: 20,
              color: colors.radiantBlue,
              fontWeight: 'bold'
            }}>
            Allow
          </TranslatedText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Notification
