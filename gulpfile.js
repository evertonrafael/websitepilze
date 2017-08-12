var gulp        = require('gulp');
var bower       = require('gulp-bower');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var minify      = require('gulp-minify');
var concat      = require('gulp-concat');
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
gulp.task('serve', ['sass', 'scripts'], function() {

    browserSync.init({
        server: "./"
    });

    gulp.watch("lib/sass/*.scss", ['sass']);
    gulp.watch("lib/js/**/*.js", ['scripts']);
    gulp.watch("*.html").on('change', browserSync.reload);
    gulp.watch("lib/css/*.css").on('change', browserSync.reload);
    gulp.watch("lib/js/*.js").on('change', browserSync.reload);
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

//script paths
var jsFiles = 'lib/js/*.js',
jsDest = 'lib/js/min';

gulp.task('scripts', function() {
return gulp.src(jsFiles)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(jsDest))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(jsDest))
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve', 'bower']);