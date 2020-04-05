const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { resolve } = require('./utils');

const config = merge(webpackBaseConfig, {
  mode: 'production',

  entry: resolve('../packages'),

  output: {
    path: resolve('../lib'),
    library: 'vc-im',
    libraryTarget: 'umd',
    filename: 'vc-im.min.js',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },

  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    },
  },

  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new WebpackBar({ color: 'green' }),
  ],

  optimization: {
    minimize: true
  }
})

const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(config);
