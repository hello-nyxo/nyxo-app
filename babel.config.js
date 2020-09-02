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
        root: ['./src/'],
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
          '@reducers': './src/store/Reducers',
          '@selectors': './src/store/Selectors',
          '@components': './src/components',
          '@helpers/*': './src/helpers',
          '@graphql/*': './src/graphql'
        }
      }
    ]
  ]
}
