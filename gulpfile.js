const { series, parallel } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const stripCss = require('gulp-strip-css-comments')
const stripJs = require('gulp-strip-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

function tarefasCSS(cb) {

/*return*/  gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './vendor/owl/css/owl.css',
            './vendor/jquery-ui/jquery-ui.css',
            './src/css/style.css'
        ])
        .pipe(stripCss())                 // remove comentários css   
        .pipe(concat('styles.css'))      // mescla arquivos
        .pipe(cssmin())                  // minifica css
        .pipe(rename({ suffix: '.min'})) // styles.min.css
        .pipe(gulp.dest('./dist/css'))   // cria arquivo em novo diretório

    cb()
}

function tarefasJS(callback) {

/*return*/  gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './vendor/owl/js/owl.js',
            './vendor/jquery-mask/jquery.mask.js',
            './vendor/jquery-ui/jquery-ui.js',
            './src/js/custom.js'
        ])
        .pipe(babel({
            comments: false,
            presets: ['@babel/env']
        }))                               // remove comentários Js
        .pipe(concat('scripts.js'))      // mescla arquivos
        .pipe(uglify())                  // minifica Js
        .pipe(rename({ suffix: '.min'})) // scripts.min.js
        .pipe(gulp.dest('./dist/js'))    // cria arquivo em novo diretório

    return callback()
}

function tarefasImagem(cb){

    gulp.src('src/images/*.{png,jpg,jpeg}')
        .pipe(imagemin({
            verbose: true
        }))
        .pipe(dest('./dist/images'))

    cb()
}

// POC - Proof of concept
function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))       // cria arquivo em novo diretório

    return callback()
}

gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./dist/**/*').on('change', reload)

})

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem

exports.default = parallel( tarefasHTML, tarefasJS, tarefasCSS)
