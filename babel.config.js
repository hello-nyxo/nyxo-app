process.env.TAMAGUI_TARGET = 'native';

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tests/lib/tamagui.config.js',
        importsWhitelist: ['constants.js', 'colors.js'],
        logTimings: true,
        disableExtraction: process.env.NODE_ENV === 'development',
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: 'TAMAGUI_TARGET',
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
