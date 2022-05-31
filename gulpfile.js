const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');

// Sass, min.css
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});
// Plagins CSS min & concat
gulp.task('style', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css'
  ])
      .pipe(concat('libs.min.css'))
      .pipe(cssmin())
      .pipe(gulp.dest('app/css'))
});

// Plagins js min & concat
gulp.task('script', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('app/js'))
});

// Browser-sync (html)
gulp.task('html', function(){
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});
// Browser-sync (JS)
gulp.task('js', function(){
  return gulp.src('app/JS/*.js')
    .pipe(browserSync.reload({stream: true}))
});

// Browser-sync (обновляет страницу автоматом)
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "app/"
      }
  });
});

// Watch 
gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/JS/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'))




// function defaultTask(cb) {
//     // place code for your default task here
//     cb();
//   }
  
//   exports.default = defaultTask