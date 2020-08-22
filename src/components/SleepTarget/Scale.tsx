import * as _ from 'lodash'
import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import Separator from './Separator'

export const ROW_HEIGHT = 100
const separators = {
  7: 'Adults (26-64)',
  8: 'Younger adults (18-25)',
  9: 'Teenagers (14-17)',
  10: 'School age children (6-13)',
  12: 'Preschoolers (3-5',
  14: 'Toddlers (1-2 years)',
  15: 'Infants (4-11 months)',
  17: 'Newborns (0-3 months)'
}

// Newborns (0-3 months): Sleep range narrowed to 14-17 hours each day (previously it was 12-18)
// Infants (4-11 months): Sleep range widened two hours to 12-15 hours (previously it was 14-15)
// Toddlers (1-2 years): Sleep range widened by one hour to 11-14 hours (previously it was 12-14)
// Preschoolers (3-5): Sleep range widened by one hour to 10-13 hours (previously it was 11-13)
// School age children (6-13): Sleep range widened by one hour to 9-11 hours (previously it was 10-11)
// Teenagers (14-17): Sleep range widened by one hour to 8-10 hours (previously it was 8.5-9.5)
// Younger adults (18-25): Sleep range is 7-9 hours (new age category)
// Adults (26-64): Sleep range did not change and remains 7-9 hours
// Older adults (65+): Sleep range is 7-8 hours (new age category)

export default class Scale extends React.PureComponent {
  render() {
    const { from, to } = this.props
    const range = to - from + 1
    return (
      <View>
        {_.times(range, Number)
          .map((v, index) => {
            const BMI = from + index
            const label = separators[BMI]
            const opening = !!separators[BMI - 1]
            return (
              <React.Fragment key={v}>
                <View style={styles.row}>
                  <Text style={styles.value}>{`${BMI}`}</Text>
                  {label && (
                    <Text
                      style={[
                        styles.label,
                        { alignSelf: opening ? 'flex-end' : 'flex-start' }
                      ]}>
                      {label}
                    </Text>
                  )}
                </View>
                {opening && label && <Separator />}
              </React.Fragment>
            )
          })
          .reverse()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  value: {
    color: 'white',
    opacity: 0.95,
    fontSize: 20
  },
  label: {
    color: 'white',
    opacity: 0.8,
    fontSize: 16
  }
})
