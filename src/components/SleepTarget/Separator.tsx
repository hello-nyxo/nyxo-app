import * as _ from 'lodash'
import * as React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

const dashes = 50
const width = Dimensions.get('window').width / (dashes * 2)

export default class Separator extends React.PureComponent {
  render() {
    return (
      <View style={styles.container}>
        {_.times(dashes).map((v, key) => (
          <View style={styles.dash} {...{ key }} />
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  dash: {
    width,
    backgroundColor: 'white',
    height: 1,
    marginRight: width
  }
})
