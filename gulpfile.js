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
    reload = browserSync.reload;



var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        style: 'build/css/',
        img: 'build/img/',
        font: 'build/font/'
    },
    src: {
        js: 'client/src/js/main/*.js',
        style: 'client/src/css/main/*.scss',
        img: 'client/src/img/*.*',
        font: 'client/src/font/*.*'
    },

    watch: {
        js: 'client/src/js/*.*',
        style: 'client/src/css/*.*',
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
    gulp.src([path.src.js]) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        // .pipe(reload({ stream: true })); //И перезагрузим сервер
});

gulp.task('style:build', function() {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style)) //И в build
        // .pipe(reload({ stream: true }));
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
        // .pipe(reload({ stream: true }));
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
    watch([path.watch.js,path.watch.style,path.watch.img,path.watch.font], function(event, cb) {
        gulp.start('build');
    })
    .pipe(reload({stream: true}));
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
