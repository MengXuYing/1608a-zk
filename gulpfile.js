/*
 * @Author: mengxuying 
 * @Date: 2018-11-05 08:52:41 
 * @Last Modified by: mengxuying
 * @Last Modified time: 2018-11-05 09:53:45
 */
//引入
var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var url = require('url');
var fs = require('fs');
var path = require('path');

//编译sass
gulp.task('sass_css', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
});

//监听sass
gulp.task('watchs', function() {
    gulp.watch('./src/sass/*/scss', gulp.series('sass_css'));
});

//压缩js
gulp.task('uglify', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/minJs/'))
});

//服务
gulp.task('server', function() {
    gulp.src('./src/')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    res.end('');
                    return;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
});


//整合
//gulp.task('change', gulp.series('server', 'watchs'));