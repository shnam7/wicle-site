/**
 * Gulpfile for Wicle
 */

const gbm = require('gulp-build-manager');
const upath = require('upath');

// gbm.utils.setNpmOptions({autoInstall: true});

const docs = require('./docs/gbmconfig');

gbm.addProject('./gbmconfig');
gbm.addProject(docs);

const main = gbm.createProject({
    buildAll: { buildName: '@build-all', triggers: gbm.getBuildNames(/@build$/) },
    cleanAll: { buildName: '@clean-all', triggers: gbm.getBuildNames(/@clean$/) },
    cleanToPrepare: { buildName: '@clean-to-prepare', builder: rtb => rtb.clean({clean: docs.vars.clean}) }
}).addWatcher({
    browserSync: {
        server: upath.resolve(docs.vars.destRoot),
        port: docs.vars.port,
        ui: { port: docs.vars.port + 1 }
        // open: false,
        // reloadDebounce: 3000
    }
});

gbm.addProject(main);
