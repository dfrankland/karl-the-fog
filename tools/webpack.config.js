import { resolve as resolvePath } from 'path';
import webpack from 'webpack';
import { DEBUG, VERBOSE } from './flags';

const SRC = resolvePath(__dirname, '../src');
const DIST = resolvePath(__dirname, '../dist');

const config = {
  context: SRC,
  output: { path: DIST },
  resolve: {
    root: SRC,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  cache: DEBUG,
  debug: DEBUG,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
};

const web = {
  ...config,
  target: 'web',
  entry: ['./web.js'],
  output: {
    ...config.output,
    filename: './web.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolvePath(__dirname, '../src'),
        ],
        query: {
          cacheDirectory: false,
          babelrc: false,
          presets: [
            'es2015',
            'stage-0',
          ],
          plugins: [
            'transform-runtime',
          ],
        },
      },
    ],
  },
  plugins: DEBUG ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { screw_ie8: true, warnings: false },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
};

const node = {
  ...config,
  target: 'node',
  entry: ['./Fog.js'],
  output: {
    ...config.output,
    filename: './node.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolvePath(__dirname, '../src'),
        ],
        query: {
          cacheDirectory: false,
          babelrc: true,
        },
      },
    ],
  },
};

export default { web, node };
