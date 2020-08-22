jest.mock('react-native', () => ({
  StyleSheet: {
    hairlineWidth: 1,
    create: () => ({}),
    flatten(arr: any) {
      return arr.reduce((res: any, item: any) => Object.assign(res, item), {})
    }
  },
  Platform: {
    OS: jest.fn(() => 'android'),
    version: jest.fn(() => 25)
  },
  Dimensions: {
    get: () => {
      return { width: 100, height: 200 }
    }
  },
  I18nManager: {
    isRTL: false
  },
  NativeModules: {
    RNDocumentPicker: () => {},
    RNSentry: () => jest.fn()
  },

  Easing: {
    bezier: () => {}
  },
  View: () => 'View',
  ViewPropTypes: {
    propTypes: {
      style: {}
    }
  },
  Text: () => 'Text',
  TouchableNativeFeedback: () => 'TouchableNativeFeedback',
  TouchableOpacity: () => 'TouchableOpacity',

  TouchableWithoutFeedback: () => 'TouchableWithoutFeedback',
  Animated: {
    View: () => 'Animated.View',
    interpolate: jest.fn(),
    Value: jest.fn().mockImplementation(() => {
      return { interpolate: jest.fn() }
    })
  }
}))
