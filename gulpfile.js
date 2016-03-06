var gulp = require( 'gulp' );
    jade = require( 'gulp-jade' ),
	autoprefixer = require( "gulp-autoprefixer" ),
	sass = require( "gulp-sass" ),
	livereload = require( "gulp-livereload" ),
    coffee = require('gulp-coffee'),
    gutil = require('gulp-util');

gulp.task( 'jade', function() {

    var YOUR_LOCALS = {};

    return gulp.src( 'src/index.jade' )
        .pipe( jade( {
          "locals": YOUR_LOCALS
        } ) )
        .pipe( gulp.dest( 'dist/') )
        .pipe( livereload() );

} );

gulp.task('sass', function () {

  return gulp.src( './src/**/*.sass' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulp.dest( './dist/css' ) )
    .pipe( livereload() );

});

gulp.task( 'coffee', function() {

  gulp.src( './src/coffee/*.coffee' )
    .pipe( coffee( {"bare": true} ).on( 'error', gutil.log ) )
    .pipe( gulp.dest( './dist/js/' ) )
    .pipe( livereload() );

});

gulp.task( "watch", function(){

	livereload.listen();

	gulp.watch( "./src/sass/**/*.sass", [ "sass" ] );
	gulp.watch( "src/*.jade", [ "jade" ] );
	gulp.watch( "src/coffee/*.coffee", [ "coffee" ] );

} );
