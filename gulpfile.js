var gulp = require("gulp");
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var nib = require("nib");
var to5ify = require('6to5ify');
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var stylus = require("gulp-stylus");
var uglify = require("gulp-uglify");
var webserver = require("gulp-webserver");
var stripDebug = require('gulp-strip-debug');
var gutil = require('gulp-util');

// Bundle creation
function bundleScripts(watch) {

  var bundler = browserify('./app/js/app.js', {
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  if (watch) {
    bundler = watchify(bundler);
  }

  bundler
    .transform(to5ify.configure({
      only: /app/
    }));

  function rebundle() {

    var stream = bundler.bundle();
    var started = new Date().getTime();

    function endTime() {
      var s = ( new Date().getTime() - started ) / 1000;
      return 'Browserify finished ';
    }

    stream.on('end', function () {
      gutil.log(endTime());
    })
      .on("error", function (err) {
        console.log("Error: " + err.message);
      });

    stream.pipe(source('app.js'))
      .pipe(rename('bundle.js'))
      .pipe(gulp.dest('dist/js'));
  }

  bundler.on('update', rebundle);

  return rebundle();
}

// Create bundle without watch
gulp.task('browserify', function () {
  return bundleScripts(false);
});

// Task for copy proccess
gulp.task('copy', function () {

  gulp.src('app/index.html')
    .pipe(gulp.dest('dist'));

  gulp.src('app/assets/images/**.*')
    .pipe(gulp.dest('dist/assets/images'));

  gulp.src('app/assets/css/**.css')
    .pipe(gulp.dest('dist/assets/css'));

});

// Minify the bundle.js
gulp.task('minify', function () {

  gulp.src('dist/js/bundle.js')
    .pipe(uglify())
    .pipe(stripDebug())
    .pipe(gulp.dest('dist/js'))
});

// Task for CSS pre-processor stylus
gulp.task('stylus', function () {

  gulp.src('app/assets/css/main.styl')
    .pipe(stylus({
      use: nib(),
      compress: true,
      'include css': true
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('dist/assets/css'));
});

// Start webserver with livereload
gulp.task('server', function () {

  gulp.src('dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: false,
      fallback: 'index.html'
    }));

});

// Watch app files
gulp.task('watch', function () {

  bundleScripts(true);
  gulp.watch('app/assets/css/*.styl', ['stylus']);
  gulp.watch('app/index.html', ['copy']);
  gulp.watch('app/assets/images/*.*', ['copy']);

});

// Main tasks
gulp.task('build', ['stylus', 'browserify', 'copy']);
gulp.task('dev', ['build', 'server', 'watch']);
gulp.task('release', ['build', 'minify']);
