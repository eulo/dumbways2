var gulp = require('gulp'),
	sass = require('gulp-sass'),
	gp_concat = require('gulp-concat'),
    gp_uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    replace = require('gulp-replace'),
    notify = require('gulp-notify'),
    revReplace = require('gulp-rev-replace');

//var css_rev = gulp.src('.css/rev-manifest.json');
//var js_rev = gulp.src('.js/rev-manifest.json');

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('./css'));
});

gulp.task('mincss',['sass'],function(){
		gulp.src(['./css/normalize.css','./css/main.css'])
		.pipe(gp_concat('main.big.css'))
		.pipe(gulp.dest('./css'))
		.pipe(minifyCss())
       	.pipe(rename('main.min.css'))
       	.pipe(gulp.dest('./css'))
})

gulp.task('watch',function(){
	gulp.watch('./scss/*', function() {
        gulp.run(['mincss']);
    });
    gulp.watch('./js/*.js', function() {
        gulp.run(['ugly']);
    });
});

gulp.task('ugly',function(){
	return gulp.src(['./js/main.js'])
	.pipe(gp_uglify())
	.pipe(rename('main.min.js'))
	.pipe(gulp.dest('./js/'))
})

gulp.task('deploy',function(){
        return gulp.src([
            './css/main.min.css',
            './js/main.min.js'
        ], {base: './'})
        .pipe(rev())
        .pipe(gulp.dest('./'))
        .pipe(notify(this))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./'))


})
