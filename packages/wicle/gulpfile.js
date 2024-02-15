import tron from 'gulp-tron'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const basePath = path.relative(process.cwd(), __dirname)
const projectName = path.basename(__dirname)
const prefix = projectName

//--- common
const srcRoot = basePath
const destRoot = 'dist'
const sourcemaps = '.'

//--- styles
import { sassP, stylelintScssP, pcssP, cleanCssP } from '@gulp-tron/plugin-styles'

const styles = {
    name: 'styles',
    build: (bs) => {
        bs.src()
            .pipe(
                stylelintScssP({
                    extends: 'stylelint-config-recommended-scss',
                    rules: {
                        'scss/comment-no-empty': null,
                        'no-descending-specificity': null,
                    },
                })
            )
            .pipe(sassP({ includePaths: ['scss', 'node_modules/sass-wdk'] }))
            .dest()
            .pipe(cleanCssP())
            .filter()
            .rename({ extname: '.min.css' })
            .dest()
    },
    sourcemaps,

    src: path.join(srcRoot, 'scss/**/*.scss'),
    dest: path.join(destRoot, 'css'),
    logLevel: 'verbose',
}

/** scripts */
import { terserP } from '@gulp-tron/plugin-scripts'
import ts from 'gulp-typescript'

const scripts = {
    name: 'scripts',
    build: (bs) => {
        const tsProject = ts.createProject('tsconfig.json')
        bs.src().pipe(tsProject())

        const dts = bs.clone().filter('*.d.ts')
        // const js = bs.filter('*.js')

        dts.debug({ title: 'dts' }).dest()
        bs.debug({ title: 'js' }).dest()

        // bs.exec(`tsc`) //
        //     .addSrc([path.join(bs.opts.dest, '**/*.js'), '!' + path.join(bs.opts.dest, '**/*.min.js')])
        //     // .pipe(terserP())
        //     // .rename({ extname: '.min.js' })
        //     .dest()
    },

    src: path.join(srcRoot, 'scripts/**/*.ts'),
    dest: path.join(basePath, 'dist/js'),
    outFile: 'wicle.js',
    sourcemaps,
    logLevel: 'verbose',
    addWatch: ['tsconfig.json', '!**/*.d.ts'],
}

const build = {
    name: '@build',
    triggers: tron.parallel(styles, scripts),
    clean: [destRoot],
}

// const wicle =
tron.task(build)
    .addCleaner()
    .addWatcher({
        dependsOn: build,
    })
    .addWatcher({
        name: 'dev',
        target: 'scripts',
        logLevel: 'verbose',
    })

//--- main build
// tron.createProject({
//     buildAll: { name: '@build-all', triggers: wicle.getBuildNames(/@build$/)},
//     cleanAll: { name: '@clean-all', triggers: tron.getBuildNames(/@clean$/) },
//     cleanToPrepare: { name: '@clean-to-prepare', builder: rtb => rtb.clean(docs.vars.clean) },
//     watchAll: {
//         name: '@watch-all',
//         dependencies: tron.parallel(tron.getBuildNames(/watch$/))
//     }});
