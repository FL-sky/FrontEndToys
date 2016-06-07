var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var nodeEnv = process.env.NODE_ENV;
var production = nodeEnv === 'production';

var config = {
  entry: ['./src/index.js'],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'tense_link.js'
  },
  
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'postcss', 'less']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=8192&name=./img/[name].[ext]'
      }
    ]
  },

  postcss: [
    autoprefixer({ browsers: ['last 5 versions'] })
  ],
  
  resolve: {
    extensions: ['', '.js', '.json']
  },
  
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
  
};

if (production) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
} else {
  config.entry.unshift(
    'webpack-dev-server/client?http://localhost:9000/',
    'webpack/hot/dev-server'
  );
}

module.exports = config;
