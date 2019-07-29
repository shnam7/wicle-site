//  Wicle docs

const gbm = require('gulp-build-manager');
const upath = require('upath');

const projectName = upath.basename(__dirname); // set template name to parent directory name
const basePath = upath.relative(process.cwd(), __dirname);
const srcRoot = upath.join(basePath, 'assets');
const destRoot = upath.join(basePath, '_site');
const prefix = projectName + ':';
const sourceMap = true;


const docs = {
	scss: {
		buildName: prefix + 'scss',
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
			sass: {
				includePaths: ['scss', 'node_modules/sass-wdk']
			},
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
		postBuild: (builder) => {
			// return promise to make sure copy operation to be done before the task finishes
			return gbm.utils.exec('echo', ['>>', upath.join(basePath, '.scss-triggered')]);
		},
		watch: {
			watchedPlus: 'dist/css/wicle.min.css'
		}, // propagate changes in wicle to docs
		clean: [upath.join(basePath, 'css'), upath.join(basePath, '.scss-triggered')]
	},

	scripts: {
		buildName: prefix + 'scripts',
		builder: 'GTypeScriptBuilder',
		src: upath.join(srcRoot, 'scripts/**/*.ts'),
		dest: upath.join(basePath, 'js'),
		copy: [{
			src: ['dist/js/wicle.min.js', upath.join(srcRoot, "scripts/**/*.js")],
			dest: upath.join(basePath, 'js')
		}],
		flushStream: true,
		buildOptions: {
			minifyOnly: true,
			// printConfig: true,
			tsConfig: upath.join(basePath, 'tsconfig.json'),
			sourceMap: sourceMap,
		},
		postBuild: (builder) => {
			// return promise to be sure copy operation is done before the task finishes
			return gbm.utils.exec('echo', ['>>', upath.join(basePath, '.js-triggered')])
		},
		watch: {
			watchedPlus: [
				'dist/js/wicle.min.js', // propagate changes in wicle to docs
				upath.join(srcRoot, "scripts/**/*.js")
			]
		},
		clean: [upath.join(basePath, 'js'), upath.join(basePath, '.js-triggered')]
	},

	jekyll: {
		buildName: prefix + 'jekyll',
		builder: 'GJekyllBuilder',
		src: upath.join(basePath, ''),
		dest: destRoot,
		moduleOptions: {
			jekyll: {
				command: 'build',
				options: [
					'--safe', // github runs in safe mode for security reason. Custom plugins are not supported.
					'--baseurl http://localhost:3100', // root folder relative to local server,
					'--incremental'
				]
			}
		},
		watch: {
			watched: [
				upath.join(basePath, '**/*.{yml,html,md}'),
				upath.join(basePath, '.*-triggered'),
				'!' + upath.join(basePath, '{js,css}'),
				'!' + upath.join(basePath, '{.jekyll-metadata,gbmconfig.js}'),
			],
		},
	},

	get build() {
		return {
			buildName: prefix + 'build',
			dependencies: [gbm.parallel(this.scss, this.scripts), this.jekyll]
		}
	},

	get clean() {
		return {
			buildName: prefix + 'clean',
			builder: 'GCleanBuilder',
			clean: [
				...this.scss.clean,
				...this.scripts.clean,
				upath.join(basePath, '.jekyll-metadata'),
				destRoot
			]
		}
	},

	get all() {
		return [this.build, this.clean]
	},

	destRoot
};

module.exports = docs;
