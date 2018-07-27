var gulp = require('gulp'),
    connect = require('gulp-connect'), //服务器
    rename = require('gulp-rename'),
    autoprefixer = require('autoprefixer'),
    less = require('gulp-less')

gulp.task('less', function () {
    return gulp.src('./css/*.less')
        .pipe(less())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'));
});

//服务器
gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 1234
    });
});

// 监控
gulp.task('watch', function () {
    gulp.watch('./css/*.less', ['less']);
});

// 预设任务
gulp.task('default', ['watch', 'webserver'], function () {});