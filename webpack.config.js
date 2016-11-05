var env = process.env.NODE_ENV || 'development';
var CONFIG = require('./config/config')[env];
var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'URL': JSON.stringify(CONFIG.host)
  }
});


module.exports = {
  entry: __dirname + '/app/js/index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },
  plugins: [definePlugin]
};
