'use strict';

let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = path.resolve(ROOT_PATH, 'public');
const TEMP_PATH = path.resolve(APP_PATH, 'templates');

module.exports = {

  devtool: 'eval-source-map',

  entry: {
    app: path.resolve(APP_PATH, 'app.js'),
    vendors: ['moment']
  },

  output: {
    path: BUILD_PATH,
    filename: 'bundle.[hash].js'
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'jshint-loader',
        include: APP_PATH
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: APP_PATH
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url'
      }
    ]
  },

  jshint: {
   // 'esnext': true
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.BannerPlugin('Copyright focoon.'),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),

    new HtmlWebpackPlugin({
      // title: '主页',
      template: path.resolve(TEMP_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['app', 'vendors'],
      inject: 'body'
    })
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 9006
  }
};
