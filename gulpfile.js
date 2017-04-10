'use strict';

var gulp=  require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var cleanCSS = require('gulp-clean-css');
var autoPrefixer =require('gulp-autoprefixer');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var combiner = require('stream-combiner2').obj;

gulp.task('less', function () {
  return combiner(
   gulp.src('./less/style.less'),
   less(),
   autoPrefixer(),
   gulp.dest('public/css'),
   cleanCSS(),
   rename({prefix : 'min-'}),
   gulp.dest('public/css')
  ).on('error', notify.onError());
});

gulp.task('watch' , function(){
  gulp.watch(['less/*','less/blocks/*.less' ], gulp.series('less'));
  gulp.watch(["public/*.html", "public/css/min-style.css","public/js/*.js"]).on("change", reload);
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    });
    
});

gulp.task('dev' , gulp.series('less' , gulp.parallel('watch' , 'browser-sync')));

