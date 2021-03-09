const gulp = require("gulp");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const tsify = require("tsify");
const sourcemaps = require("gulp-sourcemaps");
const buffer = require("vinyl-buffer");

function createTS() {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/js/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .transform("babelify", {
      presets: ["es2015"],
      extensions: [".ts"],
    })
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("src/js"));
}


// define "preprocessor" var
let preprocessor = 'sass';

// define Gulp const
const { src, dest, parallel, series, watch } = require('gulp');
// use Browsersync
let browserSync = require('browser-sync').create();

// gulp-concat -> union some file in one
const concat = require('gulp-concat');

// gulp-uglify-es -> compress
const uglify = require('gulp-uglify-es').default;

// style modules gulp-sass и gulp-less
const sass = require('gulp-sass');
const less = require('gulp-less');

// Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

//gulp-clean-css
const cleancss = require('gulp-clean-css');

// use gulp-imagemin to compress images
const imagemin = require('gulp-imagemin');

//gulp-newer
const newer = require('gulp-newer');

//del
const del = require('del');

//Browsersync
function browsersync() {
  browserSync.init({
    server: { baseDir: 'src/' }, // server field
    notify: false, // don't show
    online: true
  })
}

//Work with scripts
function scripts() {

  return src([
    //'node_modules/jquery/dist/jquery.min.js', // examples
    //'node_modules/masonry-layout/dist/masonry.pkgd.min.js', 
    //'node_modules/owl.carousel/dist/owl.carousel.min.js',    
    'src/js/bundle.js', // user's scripts   
  ])
    .pipe(concat('bundle.min.js')) // union files
    .pipe(uglify()) // compress
    .pipe(dest('src/js')) // production version field
    .pipe(browserSync.stream()) // check changes and update page
}
//Work with styles
function styles() {
  return src([
    'src/' + preprocessor + '/app.' + preprocessor + ''
  ])
    .pipe(eval(preprocessor)())
    .pipe(concat('app.min.css'))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ }))
    .pipe(dest('src/css'))
    .pipe(browserSync.stream())
}
//work with images
function images() {
  return src('src/images/src/**/*')
    .pipe(newer('src/images/dest/'))
    .pipe(imagemin())
    .pipe(dest('src/images/dest/'))
}
//delete images from /dest
function cleanimg() {
  return del('src/images/dest/**/*', { force: true })
}

//product version
function buildcopy() {
  return src([
    'src/css/**/*min.css',
    'src/js/**/*.min.js',
    'src/images/dest/**/*',
    //'app/owl/**/*',
    'src/**/*.html',
  ], { base: 'src' })
    .pipe(dest('dist'))
}

function cleandist() {
  return del('dist/**/*', { force: true })
}

//watched files
function startwatch() {
  watch(['src/**/*.ts', '!src/**/*.min.ts'], createTS);
  watch(['src/**/*.js', 'src/**/*.ts', '!src/**/*.min.js'], scripts);
  watch('src/**/' + preprocessor + '/**/*', styles);
  watch('src/**/*.html').on('change', browserSync.reload);
  watch('src/images/src/**/*', images);
}

//Export
exports.browsersync = browsersync;
exports.createTS = createTS;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;

//Product
exports.build = series(cleandist, styles, scripts, images, buildcopy);
//current
exports.default = parallel(createTS, styles, scripts, browsersync, startwatch);