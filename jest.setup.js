/* eslint-env jest */
// Native module mocks so the app tree can render under Jest.

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const inset = {top: 0, right: 0, bottom: 0, left: 0};
  const frame = {x: 0, y: 0, width: 390, height: 844};
  const SafeAreaInsetsContext = React.createContext(inset);
  const SafeAreaFrameContext = React.createContext(frame);
  const Passthrough = ({children}) => children;
  return {
    SafeAreaProvider: Passthrough,
    SafeAreaView: Passthrough,
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    SafeAreaConsumer: SafeAreaInsetsContext.Consumer,
    useSafeAreaInsets: () => inset,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: {insets: inset, frame},
  };
});
