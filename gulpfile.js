var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    notify = require("gulp-notify"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    imageop = require('gulp-imagemin');

var paths = {
      sassInputFiles: ['./dev/sass/**/*.scss'],
      cssOutputFolder: './public/css/',
      htmlInputFiles: ['./dev/**/*.html']
    },
    opt = {
      serv: {
              server: {
                baseDir: "./public"
              },
              port: 991
            },
      autopref: {
                  browsers: ['IE >= 9']
                },
      imageOp: {
          optimizationLevel: 5,
        }
    }
// Static server
gulp.task('browser-sync', function() {
    browserSync.init(opt.serv);
});

gulp.task('sass', function() {
    return gulp.src(paths.sassInputFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer(opt.autopref))
        .pipe(gulp.dest(paths.cssOutputFolder))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('images', function(cb) {
    return gulp.src(['./dev/assets/img/*.*'])
        .pipe(imageop(opt.imageOp))
        .pipe(gulp.dest('./public/img/min')).on('end', cb).on('error', cb);
});

gulp.task('run', ['sass', 'images', 'browser-sync'], function() {
    gulp.src("./*").pipe(notify({
        message: "I'm Initialized My Lord!",
        onLast: true
    }));
    gulp.watch(paths.sassInputFiles, ['sass']);
    gulp.watch(paths.htmlInputFiles).on('change', browserSync.reload);
});