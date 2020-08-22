import * as React from 'react'
import { View, StyleSheet } from 'react-native'

export default class Overlays extends React.PureComponent {
  render() {
    const { children } = this.props
    return (
      <>
        {React.Children.map(children, (child) => (
          <View style={styles.container} pointerEvents="none">
            {child}
          </View>
        ))}
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
