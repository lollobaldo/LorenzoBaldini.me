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
		src: "src/scss/index.scss",
		dev: "src/css",
		dist: "dist/css"
	},
	ts: {
		src: "src/ts/index.js",
		dev: "src/js",
		dist: "dist/js"
	},
	php: {
		src: "src/index.php",
		dev: "src",
		dist: "dist"
	}
};

// function build(done) {
// 	var jsFilter = filter("src/ts/**/*.js");
// 	var cssFilter = filter("src/scss/**/*.scss");

// 	return gulp.src("src/index.html")
// 		.pipe(useref())
// 		.pipe(jsFilter)
// 		.pipe(browserify({
// 			insertGlobals : false,
// 			// debug : !gulp.env.production
// 		}))
// 		.pipe(uglify())
// 		.pipe(jsFilter.restore)
// 		.pipe(cssFilter)
// 		.pipe(sass())
// 		.pipe(postcss([autoprefixer(), cssnano()]))
// 		.pipe(cssFilter.restore)
// 		.pipe(rev())                // Rename *only* the concatenated files
// 		.pipe(useref.restore)
// 		.pipe(useref())
// 		.pipe(revReplace())         // Substitute in new filenames
// 		.pipe(gulp.dest('dist'));

// 	// return gulp.src("src/index.html")
// 	// 		.pipe(userefAssets)      // Concatenate with gulp-useref
// 	// 		.pipe(jsFilter)
// 	// 		.pipe(browserify({
// 	// 			insertGlobals : false,
// 	// 			// debug : !gulp.env.production
// 	// 		}))
// 	// 		.pipe(uglify())
// 	// 		.pipe(jsFilter.restore())
// 	// 		.pipe(cssFilter)
// 	// 		.pipe(sass())
// 	// 		.on("error", sass.logError)
// 	// 		.pipe(postcss([autoprefixer(), cssnano()]))
// 	// 		.pipe(cssFilter.restore())
// 	// 		.pipe(rev())                // Rename the concatenated files 
// 	// 		.pipe(userefAssets.restore())
// 	// 		.pipe(useref())
// 	// 		.pipe(revReplace())         // Substitute in new filenames 
// 	// 		.pipe(gulp.dest('dist'));
// 	// done();
// }

function build_css() {
	return (gulp
			.src(paths.scss.src)
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
			.src(paths.ts.src)
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
			.src(paths.php.src)
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

function dev_css() {
	return (gulp
			.src(paths.scss.src)
			//.pipe(sourcemaps.init())
			.pipe(sass())
			.on("error", sass.logError)
			//.pipe(postcss([autoprefixer(), cssnano()]))
			//.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.scss.dev))
			.pipe(browserSync.stream())
	);
}

function dev_js() {
	return (gulp
			.src(paths.ts.src)
			.pipe(browserify({
				insertGlobals : false,
				// debug : !gulp.env.production
			}))
			.pipe(uglify())
			.pipe(gulp.dest(paths.ts.dev))
			.pipe(browserSync.stream())
	);
}

function reload(done) {
	browserSync.reload();
	done();
}

function watch(){
	dev_css();
	dev_js();
	browserSync.init(null, {
		// server: {
		// 	baseDir: "src"
		// },
		proxy: "http://127.0.0.1:5000",
		port: 5001,
		files: ['*.html', '**/*.css', '**.*.js', '**.*.php']
	});
	gulp.watch("src/scss/**/*.scss", dev_css);
	gulp.watch("src/**/*.php", reload);
	gulp.watch("src/**/*.html", reload);
	gulp.watch("src/ts/**/*.js", dev_js);
}

exports.css = dev_css;
exports.js = dev_js;
exports.watch = watch;
exports.build = build;
exports.default = build;