var gulp = require('gulp');

// init plugins
var concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    strip = require('gulp-strip-code'),
    uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src(['src/kickback.js'])
        .pipe(strip({
            start_comment: 'start-test-code',
            end_comment: 'end-test-code'
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('kickback.js'))
        .pipe(gulp.dest('dist/')) 
        .pipe(uglify())
        .pipe(sourcemaps.write())      
        .pipe(rename('kickback.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts']);
