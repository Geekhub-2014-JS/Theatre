var gulp = require('gulp'),
    concat = require('gulp-concat'),
    minifyJs = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    less = require('gulp-less'),
    ngAnnotate = require('gulp-ng-annotate'),
    clean = require('gulp-clean');

gulp.task('vendors-css', function () {
    gulp.src([
        'vendors/bootstrap/dist/css/bootstrap.css',
        'vendors/angular-loading/angular-loading.css',
        'vendors/angular-timeline/src/angular-timeline.css',
        'vendors/bootstrap/dist/css/bootstrap-theme.css'
    ])
        .pipe(concat('vendors-css.min.css'))
        .pipe(uglifycss({
            "max-line-len": 80
            }))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('custom-css', function() {
    gulp.src(['css/main.less'])
        .pipe(less({compress: true}))
        .pipe(uglifycss({
            "max-line-len": 80
        }))
        .pipe(gulp.dest('app/css/'));
});

gulp.task('vendors-js', function() {
    gulp.src([
        'vendors/jquery/dist/jquery.js',
        'vendors/bootstrap/dist/js/bootstrap.js',
        'vendors/angular/angular.js',
        'vendors/angular-ui-router/release/angular-ui-router.js',
        'vendors/angular-bootstrap/ui-bootstrap.js',
        'vendors/angular-bootstrap/ui-bootstrap-tpls.js',
        'vendors/angular-cookies/angular-cookies.js',
        'vendors/angular-translate/angular-translate.js',
        'vendors/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        'vendors/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
        'vendors/angular-translate-storage-local/angular-translate-storage-local.js',
        'vendors/ngInfiniteScroll/build/ng-infinite-scroll.js',
        'vendors/spin.js/spin.js',
        'vendors/angular-timeline/src/angular-timeline.js',
        'vendors/angular-loading/angular-loading.js',
        'vendors/moment/moment.js'
    ])
        .pipe(concat('vendors-js.min.js'))
        .pipe(minifyJs())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('angular-app-js', function() {
    gulp.src('js/**/*.js')
        .pipe(concat('angular-app.min.js'))
        .pipe(ngAnnotate())
        .pipe(minifyJs())
        .pipe(gulp.dest('app/js/'));
});

gulp.task('clean', function () {
    return gulp.src(['app/css/*', 'app/js/*'])
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    var tasks = ['vendors-css', 'custom-css', 'vendors-js', 'angular-app-js'];

    tasks.forEach(function (val) {
        gulp.start(val);
    });
});

gulp.task('watch', function () {
    var css = gulp.watch('css/*.css', ['custom-css']),
        js = gulp.watch('js/**/*.js', ['angular-app-js']);
});
