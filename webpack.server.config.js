var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var BUILD_DIR = path.resolve(__dirname, 'server/');
var APP_DIR = path.resolve(__dirname, 'src/server/');

var config = {
  entry: APP_DIR + '/server.js',
  output: {
    path: BUILD_DIR,
    filename: 'server.bundle.js'
  },
  target: 'node',
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod
    return ext
  }, {}),
  node: {
    __filename: true,
    __dirname: true
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel'
      },
      { 
        test: /\.ejs$/, 
        loader: 'ejs-loader?variable=data'
      },
    ]
  }
};

module.exports = config;