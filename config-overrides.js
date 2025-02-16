import { override, addBabelPlugin, addWebpackAlias } from 'customize-cra';
import path from 'path';

module.exports = override(
  addBabelPlugin(['@babel/plugin-proposal-nullish-coalescing-operator']),
  addBabelPlugin(['@babel/plugin-proposal-optional-chaining']),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@hooks': path.resolve(__dirname, 'src/hooks'),
    '@utils': path.resolve(__dirname, 'src/utils'),
    '@services': path.resolve(__dirname, 'src/services'),
    '@types': path.resolve(__dirname, 'src/types'),
    '@store': path.resolve(__dirname, 'src/store'),
  })
);