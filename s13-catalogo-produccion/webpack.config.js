const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (_env, argv) => {
  const produccion = argv.mode === 'production';
  const nombreArchivo = produccion ? '.env.production' : '.env.development';
  const variables = dotenv.config({ path: path.resolve(__dirname, nombreArchivo) }).parsed || {};

  return {
    mode: produccion ? 'production' : 'development',
    entry: './src/index.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].chunk.js',
      clean: true,
    },
    resolve: { extensions: ['.js', '.jsx'] },
    module: {
      rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './public/index.html' }),
      new webpack.DefinePlugin({
        'process.env.PUBLIC_APP_ENV': JSON.stringify(variables.PUBLIC_APP_ENV || 'desconocido'),
        'process.env.PUBLIC_API_BASE_URL': JSON.stringify(variables.PUBLIC_API_BASE_URL || ''),
      }),
    ],
    optimization: {
      minimize: produccion,
      minimizer: [new TerserPlugin({ extractComments: false })],
      splitChunks: { chunks: 'all' },
    },
    devtool: produccion ? false : 'eval-source-map',
    devServer: { port: 3000, open: false, hot: true },
  };
};