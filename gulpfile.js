/**
 * Gulpfile for Wicle
 */

const gbm = require('gulp-build-manager');
const upath = require('upath');

const srcRoot = '.';
const destRoot = 'dist';

const docsRoot = 'docs';
const docsDest = '_gh_pages';

const wicle = {
  scss: {
    buildName: 'wicle:scss',
    builder: 'GCSSBuilder',
    src: upath.join(srcRoot, 'scss/**/*.scss'),
    dest: destRoot,
    buildOptions: {
      postcss: true,
      minify: true,
      // sourceMap: true
    },
    moduleOptions: {
      sass: {
        // includePaths: ['scss'],
      }
    },
    clean: [destRoot],
  },

  scripts: {
    buildName: 'wicle:scripts',
    builder: 'GTypeScriptBuilder',
    src: [
      upath.join(srcRoot, 'scripts/**/*.ts'),
      '!' + upath.join(srcRoot, 'scripts/utility/wicle.string.ts'),
    ],
    dest: upath.join(destRoot, 'js'),
    buildOptions: {
      minify:true,
      tsConfig: upath.join(srcRoot, 'tsconfig.json')
    },

    clean: [upath.join(destRoot, 'js')],
    watch: {browserSync:true}
  },

  get scriptsConcated() {
    return Object.assign({}, this.scripts, {
      buildName: 'wicle:scriptsConcated',
      order: ['wicle.mq.ts', 'wicle.core.ts'],
      outFile: 'wicle.js',
      flushStream: true,
      moduleOptions: {
        typescript: {
          declaration: true
        }
      }
    })
  },

  get main() {
    return {
      buildName: 'wicle',
      dependencies: gbm.parallel(this.scss, this.scripts, this.scriptsConcated)
    }
  }
};

const docs = {
  scss: {
    buildName: 'docs:scss',
    builder: 'GCSSBuilder',
    src: upath.join(docsRoot, 'assets/scss/**/*.scss'),
    dest: upath.join(docsRoot, 'css'),
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
    clean: [upath.join(docsRoot, 'css')],
  },

  scripts: {
    buildName: 'docs:scripts',
    builder: 'GTypeScriptBuilder',
    src: upath.join(docsRoot, 'assets/scripts/**/*.ts'),
    dest: upath.join(docsRoot, 'js'),
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
    postBuild: (builder)=>{
      gbm.GPlugin.copy(this, {
        src:[upath.join(srcRoot, 'dist/js/wicle.min.js')],
        dest:upath.join(docsRoot, 'js')
      })
    },
    clean: [upath.join(docsRoot, 'js')],
  },

  jekyll: {
    buildName: 'docs:jekyll',
    builder: 'GJekyllBuilder',
    src: docsRoot,
    dest: docsDest,
    flushStream: true,
    moduleOptions: {
      jekyll: {
        command: 'build',
        options: [
          '--safe',       // github runs in safe mode for security reason. Custom plugins are not supported.
          '--baseurl http://localhost:63342/wicle/_gh_pages',  // root folder relative to local server,
          '--incremental'
        ]
      }
    },
    watch: {
      watched: [
        upath.join(docsRoot, '**/*'),
        upath.join(srcRoot, '{scripts,scss}/**/*'),
        // '!' + upath.join(docsRoot, 'assets/**/*'),
        '!' + upath.join(docsRoot, '.jekyll-metadata'),
        '!' + upath.join(docsRoot, '{css,js}/**/*'),
        '!' + upath.join(docsRoot, 'gulpfile.*'),
        // upath.join(srcRoot, 'scss/**/*'),
      ],
      browserSync:true
    },
    clean: [docsDest, '.jekyll-metadata'],
  },

  get main() {
    return {
      buildName: 'docs',
      dependencies: gbm.parallel(this.scss, this.scripts, this.jekyll)
    }
  }
};

gbm({
  systemBuilds: {
    build: gbm.series(wicle.main, docs.main),
    default: ['@clean', '@build'],
    watch: { browserSync: {server: './_gh_pages'}}
  },
});
