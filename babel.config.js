process.env.TAMAGUI_TARGET = 'native';

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    [
      '@tamagui/babel-plugin',
      {
        components: ['tamagui'],
        config: './tamagui.config.ts',
        importsWhitelist: ['constants.js', 'colors.js'],
        logTimings: true,
        disableExtraction: process.env.NODE_ENV === 'development',
      },
      ,
    ],
    [
      'transform-inline-environment-variables',
      {
        include: 'TAMAGUI_TARGET',
      },
    ],
  ],
};
