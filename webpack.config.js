const path = require('path');

module.exports = {
  context: __dirname,
  entry: { main: './frontend/entry.jsx' },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        },
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: 'bundle.js'
  }
};

// const ExtractTextPlugin = require('extract-text-webpack-plugin');
// plugins: [
//   new ExtractTextPlugin({ filename: 'bundle.css' })
// ],
