'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-clean-css'),
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
        js_index: 'client/src/js/main/container_index.js',
        js_login: 'client/src/js/main/container_login.js',
        js_sign_up: 'client/src/js/main/container_sign_up.js',
        style: 'client/src/css/main/*.scss',
        img: 'client/src/img/*.*',
        font: 'client/src/font/*.*'
    },

    watch: {
        js_index: 'client/src/js/index/**/*.*',
        js_login: 'client/src/js/login/*.*',
        js_sign_up: 'client/src/js/sign_up/*.*',
        style: 'client/src/css/*.*',
        img: 'client/src/img/*.*',
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

gulp.task('js_index:build', function () {
    gulp.src([path.src.js_index]) //Найдем наш main файл
        .pipe(rigger()) //Прогоним через rigger
        // .pipe(sourcemaps.init()) //Инициализируем sourcemap
        .pipe(uglify()) //Сожмем наш js
        // .pipe(sourcemaps.write()) //Пропишем карты
        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        console.log('Index.js build ready');
});

gulp.task('js_login:build', function () {
    gulp.src([path.src.js_login])
        .pipe(rigger())
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        console.log('Login.js build ready');
});

gulp.task('js_sign_up:build', function () {
    gulp.src([path.src.js_sign_up])
        .pipe(rigger())
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        console.log('Sign_up.js build ready');
});

//dev
gulp.task('dev_js_index:build', function () {
    gulp.src([path.src.js_index])
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.js))
        console.log('Index.js build ready');
});
gulp.task('dev_js_login:build', function () {
    gulp.src([path.src.js_login])
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.js))
        console.log('Login.js build ready');
});
gulp.task('dev_js_sign_up:build', function () {
    gulp.src([path.src.js_sign_up])
        .pipe(rigger()) 
        .pipe(gulp.dest(path.build.js))
        console.log('Sign_up.js build ready');
});
//

gulp.task('dev_style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sourcemaps.init()) //То же самое что и с js
        .pipe(sass()) //Скомпилируем
        .pipe(prefixer()) //Добавим вендорные префиксы
        .pipe(cssmin()) //Сожмем
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.style)) //И в build
        console.log('CSS build ready');
    // .pipe(reload({ stream: true }));
});

gulp.task('style:build', function(){
    gulp.src(path.src.style)
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(path.build.style))
        console.log('CSS build ready');
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        console.log('Image build ready');

});

gulp.task('font:build', function () {
    gulp.src(path.src.font)
        .pipe(gulp.dest(path.build.font))
         console.log('Font build ready');
});

gulp.task('build', [
    'js_index:build',
    'js_login:build',
    'js_sign_up:build',
    'style:build',
    'font:build',
    'image:build'
]);

gulp.task('build_dev', [
    'dev_js_index:build',
    'dev_js_login:build',
    'dev_js_sign_up:build',
    'dev_style:build',
    'font:build',
    'image:build'
]);
gulp.task('watch_dev', function () {
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js_index], function (event, cb) {
        gulp.start('dev_js_index:build');
    });
    watch([path.watch.js_login], function (event, cb) {
        gulp.start('dev_js_login:build');
    });
    watch([path.watch.js_sign_up], function (event, cb) {
        gulp.start('dev_js_sign_up:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.font], function (event, cb) {
        gulp.start('font:build');
    })
        .pipe(reload({ stream: true }));
});



gulp.task('watch', function () {
    watch([path.watch.style], function (event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js_index], function (event, cb) {
        gulp.start('js_index:build');
    });
    watch([path.watch.js_login], function (event, cb) {
        gulp.start('js_login:build');
    });
    watch([path.watch.js_sign_up], function (event, cb) {
        gulp.start('js_sign_up:build');
    });
    watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.font], function (event, cb) {
        gulp.start('font:build');
    })
        .pipe(reload({ stream: true }));
});

gulp.task('webserver', function () {
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
                    './client/src/img/*',
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
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build_dev']);
