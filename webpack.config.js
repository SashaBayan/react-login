var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  entry: path.resolve(__dirname, 'main.jsx'),

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    loaders:[{ 
      test: /\.js[x]?$/, 
      exclude: /node_modules/, 
      loader: 'babel-loader' 
    },
    {
      test: /\.css$/, 
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader') 
    }]
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
};

module.exports = config;