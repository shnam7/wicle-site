/**
 * Gulpfile for Wicle
 */

'use strict';
const gbm = require('gulp-build-manager');
const upath = require('upath');

const jkSrc = 'docs';
const jkDest = '_gh_pages';
const srcRoot = '.';
const destRoot = 'dist';

const scss = {
  buildName: 'scss',
  builder: 'GCSSBuilder',
  src: upath.join(srcRoot, 'scss/**/*.scss'),
  dest: destRoot,
  buildOptions: {
    postcss: true,
    minify: true,
    sourceMap: true
  },
  moduleOptions: {
    sass: {
      includePaths: ['scss'],
    }
  },
  clean: [destRoot],
};

const scripts = {
  buildName: 'scripts',
  builder: 'GTypeScriptBuilder',
  src: [
    upath.join(srcRoot, 'scripts/**/*.ts'),
    '!' + upath.join(srcRoot, 'scripts/utility/wicle.string.ts'),
  ],
  dest: upath.join(destRoot, 'js'),
  // outFile: 'wicle.js',
  buildOptions: {
    minify:true,
    // printConfig: true,
    tsConfig: upath.join(srcRoot, 'tsconfig.json')
  },

  clean: [upath.join(destRoot, 'js')],
  watch: {livereload:true}
};

const scriptsAll = Object.assign({}, scripts,
  {buildName:'scriptsAll', outFile:'wicle.js', flushStream:true});


const jekyllScss = {
  buildName: 'jekyll:scss',
  builder: 'GCSSBuilder',
  src: upath.join(jkSrc, 'assets/scss/**/*.scss'),
  dest: upath.join(jkSrc, 'css'),
  flushStream: true,
  buildOptions: {
    minifyOnly:true,
    postcss: true,
    sourceMap: false
  },
  moduleOptions: {
    sass: {
      includePaths: ['scss'],
    },
    postcss: {
      plugins:[
        require('lost')(),
      ]
    },
    sourcemaps: {
      write: {sourceRoot: '../../..'}
    }
  },
  clean: [upath.join(jkSrc, 'css')],
  watch: {
    watchedPlus: [upath.join(srcRoot, 'scss/**/*.scss')], // include changes in wicle source files
    livereload: true
  }
};

const jekyllScripts = {
  buildName: 'jekyll:scripts',
  builder: 'GTypeScriptBuilder',
  src: upath.join(jkSrc, 'assets/scripts/**/*.ts'),
  dest: upath.join(jkSrc, 'js'),
  flushStream: true,
  buildOptions: {
    minifyOnly:true,
    // printConfig: true,
    tsConfig: upath.join(srcRoot, 'tsconfig.json')
  },
  moduleOptions: {
    typescript: {
      declaration: false
    }
  },
  plugins: [
    new gbm.CopyPlugin([
      {src:[upath.join(srcRoot, 'dist/js/wicle.min.js')], dest:upath.join(jkSrc, 'js')}
    ])
  ],
  clean: [upath.join(jkSrc, 'js')],
  watch: {
    watchedPlus: [upath.join(srcRoot, 'scripts/**/*.ts')],  // include changes in wicle source files
    livereload:true
  }
};


const jekyll = {
  buildName: 'jekyll',
  builder: 'GJekyllBuilder',
  src: jkSrc,
  dest: jkDest,
  flushStream: true,
  moduleOptions: {
    jekyll: {
      command: 'build',
      options: [
        '--safe',       // github runs in safe mode foe security reason. Custom plugins are not supported.
        '--baseurl http://localhost:63342/wicle/_gh_pages',  // root folder relative to local server,
        '--incremental'
      ]
    }
  },
  dependencies: gbm.parallel(jekyllScss, jekyllScripts),
  watch: {
    watched: [
      upath.join(jkSrc, '**/*'),
      '!' + upath.join(jkSrc, 'assets/**/*'),
      '!' + upath.join(jkSrc, '.jekyll-metadata'),
      '!' + upath.join(jkSrc, '{css,js}/**/*'),
      '!' + upath.join(jkSrc, 'gulpfile.*'),
      // upath.join(srcRoot, 'scss/**/*'),
    ],
    livereload:true
  },
  clean: [jkDest, '.jekyll-metadata'],
};

const wicle = {
  buildName: 'wicle-core',
  dependencies: gbm.parallel(scss, scripts, scriptsAll)
};


gbm({
  systemBuilds: {
    build: [wicle, jekyll],
    default: ['@clean', '@build'],
    watch: { livereload: {start:true}}
  },
});
