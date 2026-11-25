const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: { path: path.resolve(__dirname, 'dist'), filename: 'bundle.js', clean: true },
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [{ test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }],
  },
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],
  devServer: { port: 3000, open: false },
};