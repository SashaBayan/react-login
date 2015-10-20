var path = require('path');

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
      loader: 'style!css' 
    }]
  }
};

module.exports = config;