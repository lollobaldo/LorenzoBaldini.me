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
		dist: "dist/css"
	},
	ts: {
		src: "src/ts/**/*.js",
		dist: "dist/js"
	},
	html: {
		src: "src/**/*.js",
		dist: "dist"
	}
};

function css() {
	return (gulp
			.src(paths.scss.src)
			.pipe(sourcemaps.init())
			.pipe(sass())
			.on("error", sass.logError)
			.pipe(postcss([autoprefixer(), cssnano()]))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.scss.dist))
			.pipe(browserSync.stream())
	);
}

function js() {
	return (gulp
			.src(paths.ts.src)
			.pipe(uglify())
			.pipe(gulp.dest(paths.ts.dist))
			);
}

function html() {
	return (gulp
			.src(paths.html.src)
			.pipe(gulp.dest(paths.html.dist))
			);
}

function reload(done) {
	browserSync.reload();
	done();
}

function build(done){
	css();
	js();
	html();
	done();
}

function watch(){
	css();
	browserSync.init({
		server: {
			baseDir: "dist"
		}
		// proxy: "yourlocal.dev"
	});
	gulp.watch(paths.scss.src, css);
	gulp.watch("src/**/*.html", reload);
	gulp.watch("src/ts/**/*.js", js);
}

exports.css = css;
exports.js = js;
exports.watch = watch;
exports.build = build;