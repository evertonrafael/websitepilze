var gulp        = require('gulp');
var bower       = require('gulp-bower');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var pump        = require('pump');
var cssmin      = require('gulp-cssmin');
var concatCss   = require('gulp-concat-css');
var rename      = require('gulp-rename');

gulp.task('bower', function() {
  return bower();
});

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
    includePaths: ['lib/bootstrap-sass/assets/stylesheets', 'lib/font-awesome/scss']
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'compress'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("lib/sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("lib/css/*.css").on('change', browserSync.reload);
    gulp.watch("lib/js/**/*.js").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("lib/sass/*.scss")
        .pipe(sass(sassOptions))
        .pipe(concatCss("all.css"))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssmin())
        .pipe(gulp.dest("lib/css/min"))
        .pipe(browserSync.stream());
});

gulp.task('compress', function (cb) {
  pump([
        gulp.src('lib/js/*.js'),
        uglify(),
        gulp.dest('lib/js/min')
    ],
    cb
  );
});

gulp.task('default', ['serve', 'bower']);