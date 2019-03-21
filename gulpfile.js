var autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    cache        = require('gulp-cache'),
    concat       = require('gulp-concat'),
    cssnano      = require('gulp-cssnano'),
    del          = require('del'),
    gulp         = require('gulp'),
    htmlbeautify = require('gulp-html-beautify'),
    imagemin     = require('gulp-imagemin'),
    notify       = require('gulp-notify'),
    plumber      = require('gulp-plumber'),
    pngquant     = require('imagemin-pngquant'),
    pug          = require('gulp-pug'),
    sass         = require('gulp-sass'),
	typograf     = require('gulp-typograf'),
    uglify       = require('gulp-uglifyjs');

gulp.task('pug', function () {
    return gulp.src('src/pug/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError()
        }))
        .pipe(pug())
        .pipe(htmlbeautify({
            indentSize: 2,
            unformatted: [
                'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
                'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
                'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
                'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
                'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
            ]
        }))
		.pipe(typograf({ locale: ['ru', 'en-US'] }))
        .pipe(gulp.dest('src'))
});

gulp.task('scss', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'extended'}).on('error', sass.logError))
        .pipe(autoprefixer(['> 1%', 'last 2 versions', 'IE 11'], { cascade: true }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js-libs', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery.maskedinput/src/jquery.maskedinput.js',
        // 'node_modules/jquery.scrollbar/jquery.scrollbar.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        // './src/libs/share42.custom/share42.custom.min.js',
        // './src/libs/jquery-ui-1.12.1.custom/jquery-ui.js', //datepicker + slider
        // 'node_modules/jquery-ui/ui/i18n/datepicker-ru.js',
        // 'node_modules/jquery-ui-touch-punch/jquery.ui.touch-punch.js',
        'node_modules/select2/dist/js/select2.js',
        'node_modules/select2/dist/js/i18n/ru.js',
        'node_modules/slick-carousel/slick/slick.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'));
});

gulp.task('css-libs', function () {
    return gulp.src([
        // 'node_modules/jquery.scrollbar/jquery.scrollbar.css',
        'node_modules/bootstrap/dist/css/bootstrap-grid.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        // './src/libs/jquery-ui-1.12.1.custom/jquery-ui.css', //datepicker + slider
        'node_modules/select2/dist/css/select2.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/slick-carousel/slick/slick-theme.css'
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssnano())
        .pipe(gulp.dest('src/css'));
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('clear', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
    return gulp.src('src/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            une: [pngquant()]
        })))
        .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'pug', 'scss', 'css-libs', 'js-libs'], function () {
    gulp.watch(['src/scss/**/*.+(sass|scss)', 'src/pug/blocks/**/*.+(sass|scss)'], ['scss']);
    gulp.watch('src/pug/**/*.pug', ['pug']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'pug', 'scss', 'css-libs', 'js-libs'], function () {

    var buildCss = gulp.src('src/css/**/*')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('src/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

    var buildImages = gulp.src('src/images/**/*')
        .pipe(gulp.dest('dist/images'));

});