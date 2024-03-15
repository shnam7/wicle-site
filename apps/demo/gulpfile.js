import tron from 'gulp-tron'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const basePath = path.relative(process.cwd(), __dirname)
// const projectName = path.basename(__dirname)
// const prefix = projectName
const sourcemaps = false

//--- common
const srcRoot = path.join(basePath, 'src')
const destRoot = path.join(basePath, 'dist')
const portBase = 3100

/** statics */
const statics = {
    name: 'statics',
    build: (bs) => bs.src().dest(),

    src: [path.join(basePath, 'static/**/*.*')],
    dest: destRoot,
}

/** scripts */
import ts from 'gulp-typescript'

const scripts = {
    name: 'scripts',
    build: (bs) => {
        const tsProject = ts.createProject('tsconfig.json')
        bs.src().pipe(tsProject()).changed().dest()
    },

    src: [path.join(srcRoot, '**/*.{ts,tsx}')],
    dest: path.join(destRoot, 'js'),
    addWatch: ['tsconfig.json'],
    sourcemaps,
}

/** styles */
import pcss from 'gulp-postcss'

const styles = {
    name: 'styles',
    build: (bs) => {
        bs.src().pipe(pcss()).changed().dest()
    },

    src: [path.join(srcRoot, 'style.css')],
    dest: path.join(destRoot, 'css'),
    addWatch: [
        path.join(srcRoot, '**/*.{js,ts,jsx,tsx}'), //
        path.join(basePath, 'static/**/*.html'),
    ],
    sourcemaps,
}

//--- build
const build = {
    name: '@build',
    dependsOn: tron.parallel(statics, scripts, styles),
}

tron.task(build)
    .addCleaner()
    .addWatcher({
        browserSync: {
            server: destRoot,
            port: portBase,
            open: true,
        },
    })
