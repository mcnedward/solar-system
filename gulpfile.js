var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('default', ['watch']);

// Lints javascript and builds less on file changes
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['jshint']);
  gulp.watch('app/less/**/*.less', ['build-less']);
})

// Lints javascript
gulp.task('jshint', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
})

// Builds all scripts to the public directory
gulp.task('build-scripts', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gutil.env.env === 'production' ? uglify() : gutil.noop())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/js'));
})

// gulp.task('build-scripts-ugly', function() {
//   return gulp.src('node_modules/modal-ed/classie.js')
//     .pipe(sourcemaps.init())
//     .pipe(uglify())
//     .pipe(sourcemaps.write())
//     .pipe(gulp.dest('node_modules/modal-ed/out'));
// })

// Builds all less to the public directory
gulp.task('build-less', function() {
  return gulp.src('app/less/**/*.less')
    .pipe(sourcemaps.init())
    .pipe(less().on('error', function(err) {
      gutil.log('Error in build-less task...');
      gutil.err(err);
    }))
    // .pipe(cssmin().on('error', function(err) {
    //   gutil.log('Error in build-less task...');
    //   gutil.err(err);
    // }))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gutil.env.env === 'production' ? rename({suffix: '.min'}) : gutil.noop())
    .pipe(gulp.dest('public/css'));
})

// Builds both scripts and less to the public directory
gulp.task('build', ['build-scripts', 'build-less']);