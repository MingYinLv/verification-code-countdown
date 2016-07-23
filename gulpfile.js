var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var gulp = require("gulp");
gulp.task('eslint',function(){
    return gulp.src(['src/*.js']) //指定的校验路径
        .pipe(eslint({configFle:"./.eslintrc"})) //使用你的eslint校验文件
        .pipe(eslint.format())
});
gulp.task('uglify',function(){

})

gulp.task('default',function(){
    return gulp.src(['src/*.js']) //指定的校验路径
        .pipe(eslint({configFle:"./.eslintrc"})) //使用你的eslint校验文件
        .pipe(eslint.format())
        .pipe(uglify())
        .pipe(rename('*.min.js'))
        .pipe(gulp.dest('./lib'))
});