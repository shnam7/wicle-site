/**
 * Gulpfile for Wicle
 */

const gbm = require('gulp-build-manager');
const upath = require('upath');

const wicle = require('./gbmconfig');
const docs = require('./docs/gbmconfig');

gbm.addProject(wicle)
    .addProject(docs)
    .addTrigger('@build-all', /@build$/, true)
    .addCleaner('@clean-all')
    .addWatcher('@watch-all', {
        browserSync: {
            server: upath.resolve(docs.vars.destRoot),
            port: docs.vars.port,
            ui: { port: docs.vars.port + 1 }
            // open: false,
            // reloadDebounce: 3000
        },
        reloadOnChange: false
    })
    .addTrigger('default', ['@clean-all', '@build-all'], true)
    .resolve();
