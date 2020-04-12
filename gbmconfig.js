/**
 * Wicle build configuration
 */

const gbm = require('gulp-build-manager');
const upath = require('upath');

const basePath = upath.relative(process.cwd(), __dirname);
const srcRoot = basePath;
const destRoot = 'dist';
const projectName = 'wicle';
const prefix = projectName + ':';
const sourceMap = true;

const scss = {
    buildName: 'scss',
    builder: 'GCSSBuilder',
    preBuild: () => gbm.utils.npmInstall(['stylelint-config-recommended']),
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
    preBuild: () => gbm.utils.npmInstall(['@types/jquery']),
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

const build = {
    buildName: '@build',
    triggers: gbm.parallel(scss, scripts),
    clean: [destRoot]
}

module.exports = gbm.createProject(build, {prefix}).addWatcher().addCleaner()
