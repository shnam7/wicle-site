/**
 * Gulpfile for Wicle
 */

const gbm = require('gulp-build-manager');
const upath = require('upath');

const wicle = require('./gbmconfig');
const docs = require('./docs/gbmconfig');

gbm({
    builds: [wicle.all, docs.all],
    systemBuilds: {
        build: gbm.series(wicle.build.buildName, docs.build.buildName),
        default: ['@clean', '@build'],
        watch: {
            browserSync: {
                server: upath.resolve(docs.destRoot),
                port: 3100,
                // open: false,
                // reloadDebounce: 3000
            }
        }
    },
});
