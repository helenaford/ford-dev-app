module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  root: true,
  extends: [
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:prettier/recommended',
    'eslint-config-prettier',
    '@react-native-community',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
    // overwrite defaults
    'react/forbid-prop-types': 0, // allow object prop-type while data shape is unknown
    'import/no-cycle': 0,
    camelcase: 0,
    'no-return-await': 0,
    'no-case-declarations': 0,
    'react/no-array-index-key': 0,
  },
};
