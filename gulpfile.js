const gulp = require('gulp');
const	sass = require("gulp-sass"),
		postcss = require("gulp-postcss"),
		autoprefixer = require("autoprefixer"),
		cssnano = require("cssnano"),
		sourcemaps = require("gulp-sourcemaps"),
		// tsify = require("tsify");
		browserSync = require('browser-sync').create();
		uglify = require('gulp-uglify');
		// buffer = require('vinyl-buffer');
		htmlmin = require('gulp-htmlmin');
		// concat = require('gulp-concat');
		browserify = require('gulp-browserify');
		rev = require('gulp-rev');
		revReplace = require('gulp-rev-replace');
		filter = require('gulp-filter');
		useref = require('gulp-useref');
		RevAll = require('gulp-rev-all');

//var tsProject = ts.createProject("tsconfig.json");

const paths = {
	scss: {
		src: "src/scss/**/*.scss",
		main: "src/scss/*.scss",
		prod: "prod/css",
		dist: "dist/css"
	},
	ts: {
		src: "src/ts/**/*.js",
		main: "src/ts/*.js",
		prod: "prod/js",
		dist: "dist/js"
	},
	php: {
		src: "src/**/*.php",
		main: "src/**/*.php",
		prod: "prod",
		dist: "dist"
	}
};

function build_css() {
	return (gulp
			.src(paths.scss.main)
			.pipe(sass())
			.on("error", sass.logError)
			.pipe(postcss([autoprefixer(), cssnano()]))
			// .pipe(rev())
			.pipe(gulp.dest(paths.scss.dist))
			// .pipe(rev.manifest())
			// .pipe(gulp.dest("dist"))
			.pipe(browserSync.stream())
	);
}

function build_js() {
	return (gulp
			.src(paths.ts.main)
			.pipe(browserify({
				insertGlobals : false,
				// debug : !gulp.env.production
			}))
			.pipe(uglify())
			// .pipe(rev())
			.pipe(gulp.dest(paths.ts.dist))
			// .pipe(rev.manifest())
			// .pipe(gulp.dest("dist"))
			);
}

function build_php() {
	return (gulp
			.src(paths.php.main)
			.pipe(htmlmin({ collapseWhitespace: true }))
			.pipe(gulp.dest(paths.php.dist))
			);
}

function build(done){
	build_css();
	build_js();
	build_php();
	done();
}

function prod_css() {
	return (gulp
			.src(paths.scss.main)
			//.pipe(sourcemaps.init())
			.pipe(sass())
			.on("error", sass.logError)
			//.pipe(postcss([autoprefixer(), cssnano()]))
			//.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.scss.prod))
			.pipe(browserSync.stream())
	);
}

function prod_js() {
	return (gulp
			.src(paths.ts.main)
			.pipe(browserify({
				insertGlobals : false,
				// debug : !gulp.env.production
			}))
			.pipe(uglify())
			.pipe(gulp.dest(paths.ts.prod))
			.pipe(browserSync.stream())
	);
}

function prod_php() {
	return (gulp
		.src(paths.php.src)
		.pipe(gulp.dest(paths.php.prod))
		);
}

function reload(done) {
	browserSync.reload();
	done();
}

function watch(){
	prod_css();
	prod_js();
	prod_php();
	browserSync.init(null, {
		// server: {
		// 	baseDir: "src"
		// },
		proxy: "http://127.0.0.1:5000",
		port: 5001,
		//files: ['*.html', '**/*.css', '**.*.js', '**.*.php']
	});
	gulp.watch("src/scss/**/*.scss", prod_css);
	gulp.watch("src/**/*.php", prod_php);
	gulp.watch("prod/**/*.php", reload);
	gulp.watch("src/ts/**/*.js", prod_js);
}

exports.css = prod_css;
exports.js = prod_js;
exports.watch = watch;
exports.build = build;
exports.default = build;