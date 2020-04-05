const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const HTMLWebpackConfig = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config');
const { resolve } = require('./utils');
module.exports = merge(webpackBaseConfig, {
  mode: 'development',

  entry: resolve('../example/main.ts'),

  output: {
    path: resolve('../lib'),
    filename: 'index.[hash:8].js'
  },

  devtool: 'cheap-module-eval--source-map',
  devServer: {
    port: 3000,
    inline: true,
    overlay: true,
    clientLogLevel: 'silent',
    hot: true,
    open: false,
    noInfo: true,
    stats: 'errors-only',
  },

  plugins: [
    new WebpackBar({ color: 'green' }),
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackConfig({
      filename: 'index.html',
      template: resolve('../public/index.html'),
    })
  ]
})