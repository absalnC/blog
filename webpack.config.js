var path =require("path");
var webpack=require("webpack");
var BUILD_DIR = path.resolve(__dirname, 'static/scripts');
var APP_DIR = path.resolve(__dirname, 'reactfiles');

var config = {
  module : {
      loaders : [
        {
          test : /\.jsx?/,
          include : APP_DIR,
          loader : 'babel-loader'
        }
      ]
    },
  entry: APP_DIR + '/editapp.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'editapp.js'
  }
};

module.exports = config;