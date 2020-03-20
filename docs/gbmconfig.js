//  Wicle docs

const gbm = require('gulp-build-manager');
const upath = require('upath');

const projectName = upath.basename(__dirname); // set template name to parent directory name
const basePath = upath.relative(process.cwd(), __dirname);
const srcRoot = upath.join(basePath, '_assets');
const destRoot = upath.join(basePath, '_site');
const prefix = projectName + ':';
const sourceMap = true;
const jekyllTrigger = upath.join(basePath, '.jekyll-trigger');  // flag to trigger jekyll watcher
const port = 3100;


const scss = {
    buildName: 'scss',
    builder: 'GCSSBuilder',
    src: upath.join(srcRoot, 'scss/**/*.scss'),
    dest: upath.join(basePath, 'css'),
    flushStream: true,
    buildOptions: {
        minifyOnly: true,
        lint: true,
        sourceMap: sourceMap
    },
    moduleOptions: {
        sass: { includePaths: ['scss', 'node_modules/sass-wdk'] },
        postcss: {
            plugins: [
                require('lost')(),
                require('cssnano')(), // this includes require('postcss-discard-duplicates')() by default
                require('postcss-combine-duplicated-selectors')(),
            ]
        },
        sourcemaps: {
            // write: {sourceRoot: '../..'}
        },
        clean: [upath.join(basePath, 'css')]
    },
    postBuild: rtb => rtb.exec('echo', ['>' + jekyllTrigger]),

    addWatch: ['dist/css/wicle.min.css'], // propagate changes in wicle to docs
    clean: [upath.join(basePath, 'css')]
}

const scripts = {
    buildName: 'scripts',
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
        .exec('echo', ['>', jekyllTrigger]);
    },
    addWatch: [
        'dist/js/wicle.min.js', // propagate changes in wicle to docs
        upath.join(srcRoot, "scripts/**/*.js")
    ],
    clean: [upath.join(basePath, 'js')]
}

const jekyll = {
    buildName: 'jekyll',
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
        jekyllTrigger,
        upath.join(basePath, '**/*.{yml,html,md}'),
        `!(${upath.join(basePath, '{_site,_site/**/*}')})`,
        `!(${upath.join(basePath, '{js,js/**/*}')})`,
        `!(${upath.join(basePath, '{css,css/**/*}')})`,
        `!(${upath.join(basePath, '{.jekyll-metadata,gbmconfig.js,gulpfile.js}')})`,
    ],
    clean: [destRoot, upath.join(basePath, '.jekyll-metadata'), jekyllTrigger],
    reloadOnFinish: true
}


module.exports = gbm.createProject({scss, scripts, jekyll}, {prefix})
    .addBuildItem({
        buildName: '@build',
        dependencies: [gbm.parallel(scss.buildName, scripts.buildName), jekyll.buildName]
    })
    // .addWatcher('@watch', {
    //     browserSync: {
    //         server: upath.resolve(destRoot),
    //         port: port,
    //         ui: { port: port + 1 }
    //         // open: false,
    //         // reloadDebounce: 3000
    //     },
    //     reloadOnChange: false
    // })
    .addCleaner()
    .addVars({destRoot, port})
