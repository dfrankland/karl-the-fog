import webpack from 'webpack';
import webpackConfig from './webpack.config';
import { WATCH } from './flags';

const done = (resolve, target) => (error, stats) => {
  if (error) throw error;
  console.log(stats.toString(webpackConfig[target].stats));
  resolve();
};

const build = (watch, target = 'web') => {
  const compiler = webpack(webpackConfig[target]);
  return new Promise(
    resolve => {
      if (watch) {
        compiler.watch({}, done(resolve, target));
      } else {
        compiler.run(done(resolve, target));
      }
    }
  );
};

if (require.main === module) {
  (async () => {
    await build(WATCH, 'web');
    await build(WATCH, 'node');
  })();
}

export default build;
