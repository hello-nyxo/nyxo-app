module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    node: true,
    'react-native/react-native': true
  },
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:jest/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'prettier'
  ],
  plugins: [
    'react',
    'jest',
    'jsx-a11y',
    'react-native',
    '@typescript-eslint',
    'prettier',
    'unused-imports'
  ],
  ignorePatterns: ['node_modules/', 'aws-exports.js'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    semi: [2, 'never'],
    'comma-dangle': 'off',
    'max-len': [
      'error',
      { ignoreComments: true, code: 120, ignoreStrings: true }
    ],
    'jest/expect-expect': [
      'error',
      {
        assertFunctionNames: ['matchComponentToSnapshot', 'expect']
      }
    ],
    'no-param-reassign': ['error', { props: false }],
    'prettier/prettier': ['error'],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    'react/jsx-closing-bracket-location': 'off',
    'react/require-default-props': 'off',
    'react-native/no-raw-text': 'off',
    'react-native/no-single-element-style-arrays': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports-ts': 'error',
    'unused-imports/no-unused-vars-ts': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      { multiline: { delimiter: 'none' } }
    ],
    'react/jsx-wrap-multilines': [
      'error',
      { declaration: false, assignment: false }
    ]
  },
  settings: {
    'import/resolver': {
      'babel-module': {}
    },
    'import/ignore': ['react-native'],
    react: {
      version: 'detect'
    }
  }
}
