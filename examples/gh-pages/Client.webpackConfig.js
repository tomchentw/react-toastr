import {
  resolve as resolvePath,
} from "path";

import {
  default as webpack,
} from "webpack";

import {
  default as ExtractTextPlugin,
} from "extract-text-webpack-plugin";

let FILENAME_FORMAT;
let BABEL_PLUGINS;
let PRODUCTION_PLUGINS;

if (process.env.NODE_ENV === `production`) {
  FILENAME_FORMAT = `[name]-[chunkhash].js`;
  BABEL_PLUGINS = [];
  PRODUCTION_PLUGINS = [
    // Same effect as webpack -p
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ];
} else {
  // When HMR is enabled, chunkhash cannot be used.
  FILENAME_FORMAT = `[name].js`;
  BABEL_PLUGINS = [
    [
      `react-transform`,
      {
        transforms: [
          {
            transform: `react-transform-hmr`,
            imports: [`react`],
            locals: [`module`],
          }, {
            transform: `react-transform-catch-errors`,
            imports: [`react`, `redbox-react`],
          },
        ],
      },
    ],
  ];
  PRODUCTION_PLUGINS = [];
}

export default {
  devServer: {
    port: 8080,
    host: `localhost`,
    contentBase: resolvePath(__dirname, `../../public`),
    publicPath: `/assets/`,
    hot: true,
    stats: { colors: true },
  },
  output: {
    path: resolvePath(__dirname, `../../public/assets`),
    pathinfo: process.env.NODE_ENV !== `production`,
    publicPath: `assets/`,
    filename: FILENAME_FORMAT,
  },
  module: {
    loaders: [
      {
        test: /\.jpg$/,
        loader: `file`,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(`style`, `css!sass`, {
          publicPath: ``,
        }),
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: `babel`,
        query: {
          plugins: BABEL_PLUGINS,
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(`NODE_ENV`),
    new ExtractTextPlugin(`[name]-[chunkhash].css`, {
      disable: process.env.NODE_ENV !== `production`,
    }),
    ...PRODUCTION_PLUGINS,
  ],
};
