module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
   plugins: [
      '@babel/plugin-proposal-export-default-from',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
    ],
};
