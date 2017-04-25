var gulp = require('gulp');
var sass = require('gulp-sass');
var babelify = require('babelify');
var browserify = require('browserify');
var eslint = require('gulp-eslint');
var source = require('vinyl-source-stream');
var autoprefix = require('gulp-autoprefixer');
var del = require('del');


gulp.task('clean', function (cb) {
    return del([
        'client/build/**/*'
    ], cb);
});

gulp.task('build:css', function () {
    gulp.src('client/src/styles/main.scss')
    .pipe(sass())
    .pipe(autoprefix())
    .pipe(gulp.dest('client/build/'));
});

gulp.task('build:js', function() {
  return browserify('client/src/scripts/app.jsx')
  .transform('babelify', {
    presets: ["es2015", "react"]
  })
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('client/build/'));
})

gulp.task('build:project', ['clean'], function() {
    gulp.run('build:css','build:js');
})

gulp.task('eslint', function () {
  gulp.src('client/src/scripts/**/*.jsx')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
})

gulp.task('watcher', function() {
    gulp.watch('client/src/styles/**/*.scss', ['build:css']);
  gulp.watch('client/src/scripts/**/*.jsx', ['build:js']);
})
