var Path = require('path');
var webpack = require('webpack');

var JSX_LOADER = "jsx-loader?harmony";
var SCSS_LOADER = "style-loader!css-loader!sass-loader?includePaths[]=" +
        Path.resolve(__dirname, './bower_components/bootstrap-sass-official/assets/stylesheets');
var IS_PRODUCTION = 'production' === process.env.NODE_ENV;

var webpackConfig = module.exports = {
  entry: "./client/scripts/index.js",
  output: {
    path: "./public",
    filename: (IS_PRODUCTION ? "assets/[hash].js" : "assets/bundle.js")
  },
  module: {
    loaders: [
      { test: /\.js(x?)$/, loader: JSX_LOADER },
      { test: /\.scss$/, loader: SCSS_LOADER }
    ]
  },
  plugins: [
    function() {
      this.plugin("done", function(stats) {
        stats = stats.toJson();
        console.error(JSON.stringify({
          assetsByChunkName: stats.assetsByChunkName
        }));
      });
    }
  ]
};

if (IS_PRODUCTION) {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  );
}
