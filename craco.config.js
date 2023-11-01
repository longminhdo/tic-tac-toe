/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { DefinePlugin } = require('webpack');

const alias = {
  '@': 'src',
  '@utils': 'src/utils/',
  '@components': 'src/Components',
  '@asset': 'src/asset',
  '@const': 'src/const',
  '@hook': 'src/hook',
  '@service': 'src/service',
  '@modules': 'src/modules',
  '@normalizrSchemas': 'src/normalizrSchemas',
  '@reducer': 'src/reducers',
};

Object.keys(alias).forEach((k) => {
  alias[k] = path.resolve(__dirname, alias[k]);
});

module.exports = {
  webpack: {
    alias,
    plugin: {
      add: [
        new Dotenv(),
        new DefinePlugin({
          'process.env': {
            REACT_APP_ENV: JSON.stringify(process.env.REACT_APP_ENV),
          },
        }),
      ],
    },
    configure: (webpackConfig) => {
      console.log('Start bundling...');
      console.log('webpackConfig can be logged out here');
      return {
        ...webpackConfig,
        entry: './src/index.tsx',
        output: {
          ...webpackConfig.output,
          path: '/Users/pboy208/Documents/GR/hust-form/form-portal/build',
          pathinfo: process.env.REACT_APP_ENV !== 'staging',
          filename: 'static/js/[name].[contenthash:8].js',
          chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
          assetModuleFilename: 'static/media/[name].[hash][ext]',
          publicPath: process.env.REACT_APP_ENV === 'staging' ? './' : '/',
          library: 'FormHust',
        },
      };
    },
  },
};
