import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import colors from '../../styles/colors'
import { fonts } from '../../styles/themes'
import { Day } from 'Types/Sleepdata'
import TranslatedText from '../TranslatedText'

interface NoDataInfoProps {
  clockSize: number
  centerY: number
  centerX: number
  day: Day
  navigation: any
}

const noDataInfo = (props: NoDataInfoProps) => {
  const width = props.clockSize / 2.5
  const height = props.clockSize / 2.5

  if (!props.day.night || props.day.night.length !== 0) {
    return null
  }

  return (
    <View
      style={[
        c.container,
        {
          width,
          height,
          top: props.centerY - height / 2,
          left: props.centerX - width / 2 + 10
        }
      ]}>
      <TranslatedText style={c.text}>NoSleepDataText1</TranslatedText>
      <TranslatedText
        onPress={() => props.navigation.navigate('DataHelp')}
        style={c.link}>
        NoSleepDataText2
      </TranslatedText>
    </View>
  )
}

const c = StyleSheet.create({
  container: {
    textAlign: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    textAlign: 'center',
    color: 'black',
    fontFamily: fonts.medium,
    marginBottom: 5
  },
  link: {
    fontFamily: fonts.medium,
    color: colors.radiantBlue,
    textAlign: 'center'
  }
})

noDataInfo.propTypes = {
  centerX: PropTypes.number.isRequired,
  centerY: PropTypes.number.isRequired,
  clockSize: PropTypes.number.isRequired
}
noDataInfo.defaultProps = {
  centerX: 200,
  centerY: 200,
  clockSize: 400
}

export default withNavigation(memo(noDataInfo))
