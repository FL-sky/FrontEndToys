/*eslint-disable*/
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var nodeDev = process.env.NODE_ENV;
var devPort = 3000;
var production = nodeDev === 'production';

var config = {
  entry: {
    index: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
        },
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=50000&name=[path][name].[ext]'
      }
    ],
  },

  resolve: {
    extensions: ['', '.js', 'jsx']
  },
  
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      filename: 'index.html'
    })
  ]
};

if (production) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(nodeDev),
    },
  }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false,  // remove all comments
    },
    compress: {
      warnings: false
    }
  }));
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
} else {
  // for dev-server
  for (var e in config.entry) {
    cur = [config.entry[e]]
    cur.unshift(
      'webpack-dev-server/client?http://localhost:' + devPort,
      'webpack/hot/dev-server'
    );
    config.entry[e] = cur;
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.devServer = {
    contentBase: config.output.path,
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: devPort,
    proxy: { /* todo */ },
    stats: {
      colors: true
    }
  };
}

module.exports = config;
