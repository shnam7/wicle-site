//  Wicle docs

const tron = require('gulp-tron');
const upath = require('upath');

const projectName = upath.basename(__dirname); // set template name to parent directory name
const basePath = upath.relative(process.cwd(), __dirname);
const srcRoot = upath.join(basePath, '_assets');
const destRoot = upath.join(basePath, '_site');
const prefix = projectName + ':';
const sourceMap = true;
const jekyllTriggerCss = upath.join(basePath, '.jekyll-trigger-css');  // flag to trigger jekyll watcher
const jekyllTriggerJs = upath.join(basePath, '.jekyll-trigger-js');  // flag to trigger jekyll watcher
const port = 3100;

const pcssPluginNames = ['lost', 'cssnano', 'postcss-combine-duplicated-selectors'];
const wdkName = 'shnam7/sass-wdk';

const scss = {
    name: 'scss',
    builder: 'GCSSBuilder',
    preBuild: (rtb) => {
        rtb.setModuleOptions({
            sass: { includePaths: ['scss', 'node_modules/sass-wdk'] },
            postcss: { plugins: pcssPluginNames.map(id => tron.require(id)()) },
        });
    },
    src: upath.join(srcRoot, 'scss/**/*.scss'),
    dest: upath.join(basePath, 'css'),
    flushStream: true,
    buildOptions: {
        minifyOnly: true,
        lint: true,
        sourceMap: sourceMap
    },
    postBuild: rtb => rtb.exec('echo', ['>', jekyllTriggerCss]),

    addWatch: ['dist/css/wicle.min.css'], // propagate changes in wicle to docs
    clean: [upath.join(basePath, 'css')],
    npmInstall: [...pcssPluginNames, wdkName]
}

const scripts = {
    name: 'scripts',
    builder: 'GTypeScriptBuilder',
    src: upath.join(srcRoot, 'scripts/**/*.ts'),
    dest: upath.join(basePath, 'js'),
    flushStream: true,
    buildOptions: {
        minifyOnly: true,
        // printConfig: true,
        tsConfig: upath.join(srcRoot, 'scripts/tsconfig.json'),
        sourceMap: sourceMap,
    },
    postBuild: (rtb) => {
        rtb.copy([{
            src: ['dist/js/wicle.min.js', upath.join(srcRoot, "scripts/**/*.js")],
            dest: upath.join(basePath, 'js')
        }])
        .exec('echo', ['>', jekyllTriggerJs]);
    },
    addWatch: [
        'dist/js/wicle.min.js', // propagate changes in wicle to docs
        upath.join(srcRoot, "scripts/**/*.js")
    ],
    clean: [upath.join(basePath, 'js')]
}

const jekyll = {
    name: 'jekyll',
    builder: 'GJekyllBuilder',
    src: upath.join(basePath, ''),
    dest: destRoot,
    moduleOptions: {
        jekyll: {
            subcommand: 'build',
            args: [
                '--safe', // github runs in safe mode for security reason. Custom plugins are not supported.
                '--baseurl http://localhost:' + port, // root folder relative to local server,
                '--incremental'
            ]
        }
    },
    watch: [
        jekyllTriggerCss, jekyllTriggerJs,
        upath.join(basePath, '**/*.{yml,html,md}'),
        `!(${upath.join(basePath, '{_site,_site/**/*}')})`,
        `!(${upath.join(basePath, '{js,js/**/*}')})`,
        `!(${upath.join(basePath, '{css,css/**/*}')})`,
        `!(${upath.join(basePath, '{.jekyll-metadata,build.config.js,gulpfile.js}')})`,
    ],
    clean: [destRoot, upath.join(basePath, '.jekyll-metadata'), jekyllTriggerCss, jekyllTriggerJs]
}

const build = {
    name: '@build',
    dependencies: tron.series(tron.parallel(scss, scripts), jekyll)
};


module.exports = tron.createProject(build, {prefix})
    .addWatcher({
        browserSync: {
            server: upath.resolve(destRoot),
            port: port,
            ui: { port: port + 1 }
            // open: false,
            // reloadDebounce: 3000
        }
    })
    .addCleaner()
    .addVars({
        destRoot,
        port,
        clean: [
            destRoot, jekyllTriggerCss, jekyllTriggerJs,
            upath.join(basePath, '{css,js}/**/*.map'),
            // upath.join(basePath, 'gulp-build-{css,js}/**/*.map'),
            upath.join(basePath, '.jekyll-metadata'),
        ]
    });
