const Path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: Path.resolve(__dirname, '../scripts/index.js')
  },
  output: {
    path: Path.join(__dirname, '../static'),
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CleanWebpackPlugin(['static'], { root: Path.resolve(__dirname, '../..') }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../images'), to: '../static/images' }
    ]),
    // new HtmlWebpackPlugin({
    //   template: Path.resolve(__dirname, '../src/index.html')
    // })
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      },
    ]
  }
};
