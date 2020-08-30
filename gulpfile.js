/**
 * Gulpfile for Wicle
 */

const gbm = require('gulp-build-manager');
const upath = require('upath');

gbm.setPackageManager({name:"pnpm", autoInstall:true});

const docs = require('./docs/gbm.project');
const wicle = require('./gbm.project');

gbm.createProject({
    buildAll: { name: '@build-all', triggers: [wicle.getBuildNames(/@build$/), docs.getBuildNames(/@build/)] },
    cleanAll: { name: '@clean-all', triggers: gbm.getBuildNames(/@clean$/) },
    cleanToPrepare: { name: '@clean-to-prepare', builder: rtb => rtb.clean({clean: docs.vars.clean}) },
    watchAll: {
        name: '@watch-all',
        dependencies: gbm.parallel(gbm.getBuildNames(/watch$/))
    }});
