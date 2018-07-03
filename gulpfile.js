/**
 * Gulpfile for Wicle
 */

const gbm = require('gulp-build-manager');

const wicle = require('./gbmconfig');
const docs = require('./docs/gbmconfig');

gbm({
  builds: [wicle.all, docs.all],
  systemBuilds: {
    build: gbm.series(wicle.build.buildName, docs.build.buildName),
    default: ['@clean', '@build'],
    watch: { browserSync: {server: 'docs/_site', port: 3100, open:false, reloadDebounce:3000}}
  },
});
