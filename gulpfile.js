'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    webserver = require("gulp-webserver"),
    browserSync = require('browser-sync'),
    start = require('./server.js'),
    reload = browserSync.reload;



var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'views/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'public/js/main.js', //В стилях и скриптах нам понадобятся только main файлы
        style: 'public/css/main.scss',
        img: 'public/image/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'public/font/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'test/*.html',
        js: 'test/*.js',
        style: 'public/css/*.css',
        img: 'public/image/*.*',
        fonts: 'public/font/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build",
        directory: true,
        index: './views/index.html',
        serveStaticOptions: {
            extensions: ["html"]
        }
    },
    tunnel: true,
    host: 'localhost',
    port: 3333,
    logPrefix: "Frontend_Degire",
    entry: "./server.js",
};

// gulp.task('html:build', function () {
//     gulp.src(path.src.html) //Выберем файлы по нужному пути
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
//         .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
// });

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({ stream: true })); //И перезагрузим сервер
});

gulp.task('style:build', function() {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css)) //И в build
        .pipe(reload({ stream: true }));
});

gulp.task('image:build', function() {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({ stream: true }));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    // 'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function() {
    // watch([path.watch.html], function(event, cb) {
    //     gulp.start('html:build');
    // });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    // watch([path.watch.img], function(event, cb) {
    //     gulp.start('image:build');
    // });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});

gulp.task('webserver', function() {
    browserSync
        .create()
        .init({
            server: {
                baseDir: './',
                index: './views/index.html',
                serveStatic: ['./', './views', './build'],
                serveStaticOptions: {
                    extensions: ['html']
                },
                files: [
                        './public/css/*.css',
                        './public/js/*.js',
                        './public/image/*',
                        './public/lib/*.js',
                        './public/font/*.ttf'
                    ]
                    // index: '/views/index.html',
            },
            host: 'localhost',
            port: 3333,
            path: './',
            open: './views/index.html'

        });

    // gulp.src('views')
    //     .pipe(webserver({
    //         path: '/build',
    //         port: 3333,
    //         livereload: true,
    //         directoryListing: true,
    //         open: '/build/index.html'
    //     }))
});

gulp.task('clean', function(cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);
