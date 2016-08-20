var path = require('path');
var webpack = require('webpack');

var nodeDev = process.env.NODE_ENV;
var production = nodeDev === 'production';

var config = {
  entry: ['./src/index.js'],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'fake-vue.js'
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.json', '.ts']
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ],

  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 3000,
    proxy: { /* todo */ },
    stats: {
      colors: true,
      chunks: false
    }
  }

};

if (production) {
  config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify(nodeDev),
    },
  }));
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: { comments: false },
    compress: { warnings: false }
  }));
  config.plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
} else {
  config.entry.unshift(
    'webpack-dev-server/client?http://localhost:3000/',
    'webpack/hot/dev-server'
  );
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
