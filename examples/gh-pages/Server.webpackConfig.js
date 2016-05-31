import {
  resolve as resolvePath,
} from "path";

import {
  default as webpack,
} from "webpack";

let PRODUCTION_PLUGINS;

if (process.env.NODE_ENV === `production`) {
  PRODUCTION_PLUGINS = [
    // Same effect as webpack -p
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ];
} else {
  PRODUCTION_PLUGINS = [];
}

const externals = Object.keys(
  require(`./package.json`).dependencies
).map(key => new RegExp(`^${key}`));

export default {
  output: {
    path: resolvePath(__dirname, `../../public/assets`),
    pathinfo: process.env.NODE_ENV !== `production`,
    filename: `[name].js`,
    libraryTarget: `commonjs2`,
  },
  target: `node`,
  externals,
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: `null`,
      },
      {
        test: /\.jpg$/,
        loader: `null`,
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: `babel`,
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin(`NODE_ENV`),
    ...PRODUCTION_PLUGINS,
  ],
};
