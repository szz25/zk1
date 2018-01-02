const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');
const uglify = require('gulp-uglify');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const htmlmin = require('gulp-htmlmin');
const minify = require('gulp-minify-css');
//拷贝
gulp.task('dest', function() {
    gulp.src('./css/*.css')
        .pipe(gulp.dest('./css/hebing'))
});
//合并
gulp.task('concat', function() {
    gulp.src('./css/*.css')
        .pipe(concat('he.css'))
        .pipe(minify())
        .pipe(gulp.dest('./css/hb/'))
});
//编译sass
gulp.task('sass', function() {
    gulp.src('./*.sass')
        .pipe(sass())
        .pipe(gulp.dest('./sass/'))
});
//起服务
gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            port: 8080,
            fillback: 'index.html',
            livereload: true
        }))
});
// 监听html, css, js
gulp.task('watch', function() {
    gulp.watch(['./css/*.css', './js/*.js', './*.html'])
});
var html = {
    removeComments: true, //清除html注释
    collapseWhitespace: true, //压缩html
    collapseBooleanAttributes: true, //省略布尔属性的值<input checked="true"/>==><input/>
    removeEmptyAttributes: true, //删除所有空格做属性值<input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJs: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
};
//压缩html
gulp.task('htmlmin', function() {
    gulp.src('*.html')
        .pipe(htmlmin(html))
        .pipe(gulp.dest('./html/ys/'))
});
//压缩js
gulp.task('uglify', function() {
    gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename('date_format.min.js'))
        .pipe(gulp.dest('./js/ys/'))
});
gulp.task('default', ['dest', 'concat', 'sass', 'webserver', 'watch', 'htmlmin', 'uglify'])