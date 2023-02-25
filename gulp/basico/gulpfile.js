const gulp = require('gulp')
const series = gulp.series
const parallel = gulp.parallel

const antes1 = cb => {
    console.log('Tarefa Antes 1!')
    return cb();
}


const antes2 = cb => {
    console.log('Tarefa Antes 2!')
    return cb();
}

function copiar(cb) {
    console.log('Tarefa de copiar!')
    //gulp.src(['pastaA/arquivo1.txt', 'pastaA/arquivo2.txt'])
    gulp.src('pastaA/**/*.txt')
        .pipe(gulp.dest('pastaB'))
    return cb()
}


const fim = cb => {
    console.log('FIM')
    return cb();
}

module.exports.default = series(
    parallel(antes1, antes2),
    copiar,
    fim
    )
