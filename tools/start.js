import { create } from 'browser-sync';
import { resolve as resolvePath } from 'path';
import build from './build';

const example = resolvePath(__dirname, '../example');
const dist = resolvePath(__dirname, '../dist');

(async () => {
  await build(true, 'web');
  create().init({
    notify: false,
    files: [
      example,
      dist,
    ],
    server: {
      baseDir: example,
      routes: {
        '/dist': dist,
      },
    },
  });
})();
