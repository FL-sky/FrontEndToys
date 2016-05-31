var path = require("path");
var webpack = require("webpack");

var debug = process.env.NODE_ENV !== 'production';

var config = {
  entry: ['./src/index.js'],
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'word_down.js'
  },
  
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ["es2015", "stage-0"]
        }
        
      },
      {
        test: /\.css/,
        loaders: ['style', 'css']
      },
      {
        test: /\.less/,
        loaders: ['style', 'css', 'less']
      }
    ]
  },
  
  resolve: {
    extensions: ['', '.js', '.json'],
  },
  
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
  
};

if (debug) {
  config.entry.unshift(
    "webpack-dev-server/client?http://localhost:8080/",
    "webpack/hot/dev-server"
  );
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
  plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
}

module.exports = config;