var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var babelify    = require('babelify');
var watchify    = require('watchify');
var exorcist    = require('exorcist');
var concat      = require('gulp-concat');
var browserify  = require('browserify');
var browserSync = require('browser-sync').create();

var cssDependencies = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/toastr/build/toastr.min.css',
  'static/**/*.css'
];

// Input file.
watchify.args.debug = true;
var bundler = watchify(browserify('./static/js/app.js', watchify.args));

// Babel transform
bundler.transform(babelify);

// On updates recompile
bundler.on('update', bundle);

function bundle() {

    gutil.log('Compiling JS...');

    return bundler.bundle()
        .on('error', function (err) {
            gutil.log(err.message);
            browserSync.notify("Browserify Error!");
            this.emit("end");
        })
        .pipe(exorcist('app/js/dist/bundle.js.map'))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream({once: true}));
}

/**
 * Gulp task alias
 */
gulp.task('bundle', function () {
    return bundle();
});

gulp.task('css', function () {
  gulp.src(cssDependencies)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./'))
})

/**
 * First bundle, then serve from the ./app directory
 */
gulp.task('default', ['bundle', 'css'], function () {
    browserSync.init({
        server: "./"
    });
});