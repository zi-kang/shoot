var gulp = require('gulp');


var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');//自动填充
var cleanCss = require('gulp-clean-css');  //代码压缩一行
var concat = require('gulp-concat');//拼接，合并
var uglify = require('gulp-uglify');//js压缩
var connect = require('gulp-connect');//创建服务器

 
gulp.task('localhost',function(){
	connect.server({
		root:'', //静态资源目录
		port:8080
	});
});
gulp.task('less',function(){
	gulp.src(['./app/css/*.less'])
		.pipe(less())
		// .pipe(cleanCss())
		.pipe(autoprefix({
			browsers: ['last 20 versions'],
            cascade: true
		}))
		.pipe(concat("app.min.css"))
		.pipe(gulp.dest(''));
});
gulp.task('js',function(){
	gulp.src(['./app/bower_components/*.js'])
		.pipe(concat('app.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(''))
});
gulp.task('mywatch',function(){
	gulp.watch('./app/css/*.less',['less']);//当第一个参数发生变化时，执行第二个参数
	gulp.watch('./app/bower_components/*.js',['js']);
	// gulp.watch('./app/index.js',['js']);
});

//md5
var rev = require('gulp-rev');
gulp.task('rev',function(){
	return gulp.src(['app.min.css','app.min.js'])
		.pipe(rev())
		.pipe(gulp.dest(''));
});
//更换html link或script的src路径
// var inject = require('gulp-inject');
// gulp.task('inject',function(){
// 	return gulp.src('./app/index.html')
// 		.pipe(inject(gulp.src(['app-*.min.css','app-*.min.js'])))
// 		.pipe(gulp.dest(''));
// });
// 删除修改之前的
var clean = require('gulp-clean');
gulp.task('clean',function(){
	return gulp.src('app-*min.*')
	.pipe(clean());
});

// 按顺序执行
var sequence = require('gulp-sequence');
gulp.task('bulid',function(cb){
	return sequence('clean','rev','inject',cb);
});


gulp.task('default',['mywatch','localhost']);
