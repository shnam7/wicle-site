import tron from 'gulp-tron'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const basePath = path.relative(process.cwd(), __dirname)
const projectName = path.basename(__dirname)
const prefix = projectName

//--- common
const srcRoot = 'src'
const destRoot = 'dist'
const sourcemaps = '.'

/** scripts */
import { terserP } from '@gulp-tron/plugin-scripts'
import ts from 'gulp-typescript'

const scripts = {
    name: 'scripts',
    build: (bs) => {
        const tsProject = ts.createProject('tsconfig.json')
        bs.src().pipe(tsProject())

        const dts = bs.clone().filter('*.d.ts')
        const js = bs.filter('*.js')

        dts.dest()
        js.dest()
    },

    src: [path.join(srcRoot, '**/*.{ts,tsx}')],
    dest: destRoot,
    outFile: 'wicle.js',
    sourcemaps,
    logLevel: 'verbose',
    addWatch: ['tsconfig.json', '!**/*.d.ts'],
}

/** styles */
import pcss from 'gulp-postcss'

const styles = {
    name: 'styles',
    build: (bs) => {
        bs.src().pipe(pcss()).changed().dest()
    },

    src: [path.join(srcRoot, 'style.css')],
    dest: path.join(destRoot, ''),
    addWatch: [...scripts.src],
    sourcemaps,
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
