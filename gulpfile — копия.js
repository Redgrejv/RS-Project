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
        index_js: 'build/js/index_js/',
        login_js: 'build/js/login_js/',
        sign_up_js: 'build/js/sign_up_js/',
        index_style: 'build/css/index_style/',
        login_style: 'build/css/login_style/',
        sign_up_style: 'build/css/sign_up_style/',
        img: 'build/img/',
        font: 'build/font/'
    },
    src: { //Пути откуда брать исходники
        index_js: 'client/src/js/main_index.js',
        login_js: 'client/src/js/main_login.js',
        sign_up_js: 'client/src/js/main_sign_up.js',
        index_style: 'client/src/css/main_index.scss',
        login_style: 'client/src/css/main_login.scss',
        sign_up_style: 'client/src/css/main_sign_up.scss',
        img: 'client/src/img/*.*',
        font: 'client/src/font/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        index_js: 'client/src/js/index.js',
        login_js: 'client/src/js/login.js',
        sign_up_js: 'client/src/js/sign_up.js',
        index_style: 'client/src/css/index.css',
        login_style: 'client/src/css/login.css',
        sign_up_style: 'client/src/css/sign_up.css',
        img: 'client/src/image/*.*',
        font: 'client/src/font/*.*'
    },
    clean: './build'
};

var config = {
    server: {
        baseDir: "./build",
        directory: true,
        index: './client/views/index.html',
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
    gulp.src(path.src.index_js) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.index_js)) //Выплюнем готовый файл в build
    gulp.src(path.src.login_js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.login_js))
    gulp.src(path.src.sign_up_js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write()) 
        .pipe(gulp.dest(path.build.sign_up_js)) 
        .pipe(reload({ stream: true })); //И перезагрузим сервер
});

gulp.task('style:build', function() {
    gulp.src(path.src.index_style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.index_style)) //И в build
        gulp.src(path.src.login_style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.login_style))
        gulp.src(path.src.sign_up_style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.sign_up_style))
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

gulp.task('font:build', function() {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font))
});

gulp.task('build', [
    'js:build',
    'style:build',
    'font:build',
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
    watch([path.watch.font], function(event, cb) {
        gulp.start('font:build');
    });
});

gulp.task('webserver', function() {
    browserSync
        .create()
        .init({
            server: {
                baseDir: './',
                index: './client/views/index.html',
                serveStatic: ['./', './views', './build'],
                serveStaticOptions: {
                    extensions: ['html'] // pretty urls
                },
                files: [
                        './client/src/css/*.css',
                        './client/src/js/*.js',
                        './client/src/image/*',
                        './client/src/lib/*.js',
                        './client/src/font/*.ttf'
                    ]
                    // index: '/views/index.html',
            },
            host: 'localhost',
            port: 3333,
            path: './',
            open: './client/views/index.html'

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