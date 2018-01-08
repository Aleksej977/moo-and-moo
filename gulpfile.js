var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    notify = require("gulp-notify"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin');

var paths = {
      sassInputFiles: ['./dev/sass/**/*.scss'],
      imgInputFiles: ['./dev/assets/img/*.*'],
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
        .pipe(newer('./public/img/min'))
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: true}]
        }))
        .pipe(gulp.dest('./public/img/min'));
});

gulp.task('run', ['sass', 'images', 'browser-sync'], function() {
    gulp.src("./*").pipe(notify({
        message: "I'm Initialized My Lord!",
        onLast: true
    }));
    gulp.watch(paths.imgInputFiles, ['images']).on('change', browserSync.reload);
    gulp.watch(paths.sassInputFiles, ['sass']).on('change', browserSync.reload);
    gulp.watch(paths.htmlInputFiles).on('change', browserSync.reload);
});