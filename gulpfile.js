var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass');

gulp.task('webserver', function() {
  connect.server({
    livereload: false,
  });
});

gulp.task('sass', function() {
  gulp.src('sass/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch('sass/*.sass', ['sass']);
})

gulp.task('default', ['sass', 'webserver', 'watch']);
