module.exports = {
  resolver: {
    sourceExts: ['tsx', 'ts', 'js'],
  },
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer'),
  },
};
