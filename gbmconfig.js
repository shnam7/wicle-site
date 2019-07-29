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

const wicle = {
    scss: {
        buildName: prefix + 'scss',
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
    },

    scripts: {
        buildName: prefix + 'scripts',
        builder: 'GTypeScriptBuilder',
        src: upath.join(srcRoot, 'scripts/**/*.ts'),
        dest: upath.join(basePath, 'dist/js'),
        outFile: 'wicle.js',
        flushStream: true,
        buildOptions: {
            minifyOnly: true,
            sourceMap: sourceMap,
            tsConfig: upath.join(basePath, 'tsconfig.json')
        }
    },

    get build() {
        return {
            buildName: prefix + 'build',
            dependencies: gbm.parallel(this.scss, this.scripts)
            // dependencies: gbm.parallel(this.scss, gbm.series(this.scripts, this.scriptsPack))
        }
    },

    get clean() {
        return {
            buildName: prefix + 'clean',
            builder: 'GCleanBuilder',
            clean: [destRoot]
        }
    },

    get all() {
        return [this.build, this.clean]
    }
};

module.exports = wicle;
