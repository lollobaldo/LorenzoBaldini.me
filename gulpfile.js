const gulp = require('gulp');
const	sass = require("gulp-sass"),
		postcss = require("gulp-postcss"),
		autoprefixer = require("autoprefixer"),
		cssnano = require("cssnano"),
		sourcemaps = require("gulp-sourcemaps"),
		tsify = require("tsify");
		browserSync = require('browser-sync').create();
		uglify = require('gulp-uglify');
		buffer = require('vinyl-buffer');

//var tsProject = ts.createProject("tsconfig.json");

const paths = {
	scss: {
		src: "src/scss/**/*.scss",
		dev: "src/css",
		dist: "dist/css"
	},
	ts: {
		src: "src/ts/**/*.js",
		dev: "src/js",
		dist: "dist/js"
	},
	html: {
		src: "src/**/*.html",
		dev: "src",
		dist: "dist"
	}
};

function build_css() {
	return (gulp
			.src(paths.scss.src)
			.pipe(sass())
			.on("error", sass.logError)
			.pipe(postcss([autoprefixer(), cssnano()]))
			.pipe(gulp.dest(paths.scss.dist))
			.pipe(browserSync.stream())
	);
}

function build_js() {
	return (gulp
			.src(paths.ts.src)
			.pipe(uglify())
			.pipe(gulp.dest(paths.ts.dist))
			);
}

function build_html() {
	return (gulp
			.src(paths.html.src)
			.pipe(gulp.dest(paths.html.dist))
			);
}

function build(done){
	build_css();
	build_js();
	build_html();
	build_done();
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
			//.pipe(uglify())
			.pipe(gulp.dest(paths.ts.dev))
			);
}

function reload(done) {
	browserSync.reload();
	done();
}

function watch(){
	dev_css();
	dev_js();
	browserSync.init({
		server: {
			baseDir: "dist"
		}
		// proxy: "yourlocal.dev"
	});
	gulp.watch(paths.scss.src, dev_css);
	gulp.watch("src/**/*.html", reload);
	gulp.watch("src/ts/**/*.js", dev_js);
}

exports.css = dev_css;
exports.js = dev_js;
exports.watch = watch;
exports.build = build;