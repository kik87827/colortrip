
var gulp = require("gulp"),
	fileinclude = require('gulp-file-include');

gulp.task('default',['fileinclude','watch']);

gulp.task('fileinclude',function(){
	gulp.src(['./src/**.html'],{base : "./src/"})
	.pipe(fileinclude({
		prefix : '@@',
		basepath : '@file'
	}))
	.pipe(gulp.dest('./dist/'));
});


gulp.task('watch', function () {
	gulp.watch(['./src/**.html','./src/*/**.html'],["fileinclude"]);
});