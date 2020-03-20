/**
 * Wicle build configuration
 */

const gbm = require('gulp-build-manager');
const upath = require('upath');

const projectName = 'wicle';
const basePath = upath.relative(process.cwd(), __dirname);
const srcRoot = basePath;
const destRoot = 'dist';
const prefix = projectName + ':';
const sourceMap = true;

const scss = {
    buildName: 'scss',
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
    flushStream: true
}

const scripts = {
    buildName: 'scripts',
    builder: 'GTypeScriptBuilder',
    src: upath.join(srcRoot, 'scripts/**/*.ts'),
    dest: upath.join(basePath, 'dist/js'),
    outFile: 'wicle.js',
    buildOptions: {
        minifyOnly: true,
        sourceMap: sourceMap,
        tsConfig: upath.join(basePath, 'tsconfig.json')
    },
    flushStream: true
}

module.exports = gbm.createProject({scss, scripts}, {prefix})
    .addTrigger('@build', /.*/)
    .addWatcher()
    .addCleaner('@clean', { clean: [destRoot]})
