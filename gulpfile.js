const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
/*const image = require('gulp-image')*/ /* Necessário verificar pois está dando erro ao tenatr compactar as iamgens */
const stripCss = require('gulp-strip-css-comments')
const stripJs = require('gulp-strip-comments')
const htmlmin = require('gulp-htmlmin')
const { series } = require('gulp')

function tarefasCSS(cb) {

    return gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './vendor/owl/css/owl.css',
            './vendor/jquery-ui/jquery-ui.css',
            './src/css/style.css'
        ])
        .pipe(stripCss())                // remove comentarios
        .pipe(concat('styles.css'))      // mescla arquivos
        .pipe(cssmin())                  // minifica css
        .pipe(rename({ suffix: '.min'})) // styles.min.css
        .pipe(gulp.dest('./dist/css'))   // cria arquivo em novo diretório
}

function tarefasJS() {

    return gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './vendor/owl/js/owl.js',
            './vendor/jquery-mask/jquery.mask.js',
            './vendor/jquery-ui/jquery-ui.js',
            './src/js/custom.js'
        ])
        .pipe(stripJs())                 // remove comentarios 
        .pipe(concat('scripts.js'))      // mescla arquivos
        .pipe(uglify())                  // minifica Js
        .pipe(rename({ suffix: '.min'})) // scripts.min.js
        .pipe(gulp.dest('./dist/js'))    // cria arquivo em novo diretório
}

// POC - Proof of concept
function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))       // cria arquivo em novo diretório

    return callback()
}

/*function tarefasImagem() {

    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress:false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))

}*/ /* Necessário verificar pois está dando erro ao tenatr compactar as iamgens */

exports.default = series( tarefasHTML, tarefasJS, tarefasCSS)
exports.styles = tarefasCSS
exports.scripts = tarefasJS

/*exports.images = tarefasImagem*/ /* Necessário verificar pois está dando erro ao tentar compactar as imagens */