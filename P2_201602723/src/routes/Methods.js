function CodificarRuta(codigo){
    let resultado;
    resultado = codigo.split('°').join('/')
    resultado = codigo.split('$$').join('%')
    resultado = codigo.split('$').join('\n')

    return resultado;
}