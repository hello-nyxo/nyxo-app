module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
    [
      'babel-plugin-inline-import',
      {
        extensions: ['.svg']
      }
    ],
    [
      'module-resolver',
      {
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          '@actions': './src/store/actions',
          '@assets': './assets',
          '@reducers': './src/store/reducers',
          '@selectors': './src/store/selectors',
          '@initial-states': './src/store/initial-states',
          '@components': './src/components',
          '@helpers': './src/helpers/',
          '@graphql': './src/graphql/',
          '@screens': './src/screens/',
          '@views': './src/views/',
          '@data-fetching': './src/data-fetching',
          '@hooks': './src/hooks',
          '@typings': './src/typings',
          '@types': './src/Types',
          '@config': './src/config',
          '@styles': './src/styles',
          '@API': './src/API',
          'persist-queries': './src/store/persist-queries'
        }
      }
    ]
  ]
}
