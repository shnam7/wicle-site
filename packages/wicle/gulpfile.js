/**
 * Gulpfile for Wicle
 */

const tron = require('gulp-tron');
const upath = require('upath');

tron.setPackageManager({name:"pnpm"});

//--- Wicle build configuration
const basePath = upath.relative(process.cwd(), __dirname);
const srcRoot = basePath;
const destRoot = 'dist';
const projectName = 'wicle';
const prefix = projectName + ':';
const sourceMap = true;

const scss = {
    name: 'scss',
    builder: 'GCSSBuilder',
    src: upath.join(srcRoot, 'scss/**/*.scss'),
    dest: upath.join(destRoot, 'css'),
    buildOptions: {
        lint: true,
        minifyOnly: true,
        sourceMap: sourceMap
    },
    moduleOptions: {
        sass: { includePaths: ['scss', 'node_modules/sass-wdk'] },
        stylelint: {
            "extends": upath.resolve(basePath, ".stylelintrc"),
            "rules": {
                // "no-empty-source": null
            }
        }
    },
    flushStream: true,
    npmInstall: ['stylelint-config-recommended']
}

const scripts = {
    name: 'scripts',
    builder: 'GTypeScriptBuilder',
    src: upath.join(srcRoot, 'scripts/**/*.ts'),
    dest: upath.join(basePath, 'dist/js'),
    outFile: 'wicle.js',
    buildOptions: {
        minifyOnly: true,
        sourceMap: sourceMap,
        tsConfig: upath.join(basePath, 'tsconfig.json')
    },
    flushStream: true,
    npmInstall: ['@types/jquery'],
}

const build = {
    name: '@build',
    triggers: tron.parallel(scss, scripts),
    clean: [destRoot]
}

const wicle = tron.createProject(build, {prefix}).addWatcher().addCleaner();
const docs = require('./docs/gulpfile.js');

//--- main build
tron.createProject({
    buildAll: { name: '@build-all', triggers: [wicle.getBuildNames(/@build$/), docs.getBuildNames(/@build/)] },
    cleanAll: { name: '@clean-all', triggers: tron.getBuildNames(/@clean$/) },
    cleanToPrepare: { name: '@clean-to-prepare', builder: rtb => rtb.clean(docs.vars.clean) },
    watchAll: {
        name: '@watch-all',
        dependencies: tron.parallel(tron.getBuildNames(/watch$/))
    }});
