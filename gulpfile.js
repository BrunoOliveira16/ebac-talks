const { series, parallel } = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
/*const image = require('gulp-image')*/
const stripCss = require('gulp-strip-css-comments')
const stripJs = require('gulp-strip-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

//Processo de minificação de arquivos CSS
function tarefasCSS(cb) {

/*return*/  gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './vendor/owl/css/owl.css',
            /*'./vendor/jquery-ui/jquery-ui.css',*/ //arquivo >500kb dando erro
            './src/css/style.css'
        ])
        .pipe(stripCss())                 // remove comentários css   
        .pipe(concat('styles.css'))      // mescla arquivos
        .pipe(cssmin())                  // minifica css
        .pipe(rename({ suffix: '.min'})) // styles.min.css
        .pipe(gulp.dest('./dist/css'))   // cria arquivo em novo diretório

    cb()
}

//Processo de minificação de arquivos JavaScript
function tarefasJS(callback) {

/*return*/  gulp.src([
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap/dist/js/bootstrap.js',
            './vendor/owl/js/owl.js',
            './vendor/jquery-mask/jquery.mask.js',
            /*'./vendor/jquery-ui/jquery-ui.js',*/ //arquivo >500kb dando erro
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

//Processo para compactação das imagens
/*function tarefasImagem(){
    
    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}*/

// POC - Proof of concept
function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))       // cria arquivo em novo diretório

    return callback()
}

// Chamada para servidor gulp
gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process) //processo se repete quando alterar algo no src
    gulp.watch('./src/**/*').on('change', reload) //atualiza o projeto de forma automática, sem precisar recargar a página manualmente
})

//Retorno do fim do processo
function end(cb){
    console.log("tarefas concluidas")
    return cb()
}

// Chamadas do processo
const process = series( tarefasHTML, tarefasJS, tarefasCSS, end)
exports.styles = tarefasCSS
exports.scripts = tarefasJS
/*exports.images = tarefasImagem*/
exports.default = process
