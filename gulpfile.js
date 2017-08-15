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
    minify: true
  },
  moduleOptions: {
    sass: {
      includePaths: ['scss'],
    }
  },
  clean: [destRoot],
};

const jekyllScss = {
  buildName: 'jekyll:scss',
  builder: 'GCSSBuilder',
  src: upath.join(jkSrc, 'assets/scss/**/*.scss'),
  dest: upath.join(jkSrc, 'css'),
  flushStream:true,
  buildOptions: {
    minifyOnly:true,
    postcss: true
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

  },
  clean: [upath.join(jkSrc, 'css')],
  watch: {
    watched: [
      upath.join(jkSrc, 'assets/scss/**/*.scss'),
      upath.join(srcRoot, '**/*.scss')
    ]
  }
};

const jekyllScripts = {
  buildName: 'jekyll:scripts',
  builder: 'GTypeScriptBuilder',
  src: upath.join(jkSrc, 'assets/scripts/**/*.ts'),
  dest: upath.join(jkSrc, 'js'),
  flushStream:true,
  buildOptions: {
    minifyOnly:true,
  },
  moduleOptions: {
    typescript: {
      "target": "es5",
      "noEmitOnError": true,
      "lib": ['DOM','ES6','DOM.Iterable','ScriptHost']
    }
  },
  clean: [upath.join(jkSrc, 'js')],
  watch: { livereload: true }
};

const jekyll = {
  buildName: 'jekyll',
  builder: 'GJekyllBuilder',
  src: jkSrc,
  dest: jkDest,
  // flushStream: true,
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
      '!' + upath.join(jkSrc, '.jekyll-metadata'),
      '!' + upath.join(jkSrc, '{css,js}/**/*'),
      '!' + upath.join(jkSrc, 'gulpfile.*'),
      upath.join(srcRoot, 'scss/**/*'),
    ],
    livereload:true
  },
  clean: [jkDest, '.jekyll-metadata'],
};

gbm({
  systemBuilds: {
    build: [scss, jekyll],
    default: ['@clean', '@build'],
    watch: { livereload: {start:true}}
  },
});
