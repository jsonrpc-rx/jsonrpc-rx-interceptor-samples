const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.ts',
  },
  devtool: 'inline-source-map',
  mode: 'development',
  target: ['web', 'es5'],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
        },
        exclude: [/node_modules/],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
    }),
  ],

  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    compress: false,
    historyApiFallback: true,
    hot: true,
    open: true,
  },
};
