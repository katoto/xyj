var gulp = require('gulp'),
    connect = require('gulp-connect'), //服务器
    rename = require('gulp-rename'),
    autoprefixer = require('autoprefixer'),
    less = require('gulp-less'),
    postcss = require('gulp-postcss'),
    px2rem = require('postcss-px2rem'),
    notify = require("gulp-notify");

gulp.task('less', function () {
    var processors = [px2rem({
        remUnit: 53.333
    }), autoprefixer({
        brpwsers: ['last 2 version', 'android >= 4.0']
    })];
    return gulp.src('./css/*.less')
        .pipe(less())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(postcss(processors))
        .pipe(notify("Hello Gulp!"))
        .pipe(gulp.dest('./css'))
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