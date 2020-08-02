"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Entorno_1 = require("../../Datos/Entorno/Entorno");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
class CrearFuncion extends nodoAst_1.nodoAst {
    constructor(tipo, id, parametros, cuerpo, line, col) {
        super(line, col);
        this.tipo = tipo;
        this.id = id;
        this.parametros = parametros;
        this.cuerpo = cuerpo;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // SI HAY QUE RETORNAR UN ARREGLO HAGO OTRA COSA
        // AUN NO SE QUE HACER PERO LO DEJO ESPECIFICADO :D
        //if(this.tipo.arreglo)
        //    return this.GuardarArreglo(e);
        const tipoFuncion = this.GetTipo();
        if (this.parametros == null)
            resultado = this.FuncionSinParametros(tipoFuncion, e);
        else
            resultado = this.FuncionConParametros(tipoFuncion, e);
        return resultado;
    }
    FuncionSinParametros(tipoFuncion, e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        /* if( e.AgregarFuncion(this.id+"_funcion",tipoFuncion) ){
            // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
            Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre",
                    this.linea,this.columna);
            resultado.BorrarError();
            return resultado;
        } */
        // ================= CREO EL ENTORNO NUEVO PARA LA FUNCION  =================
        let nuevoEntorno = new Entorno_1.Entorno("funcion", e, 0);
        const nameReturn = "return";
        nuevoEntorno.Agregar(nameReturn, tipoFuncion, Entorno_1.Entorno.ROL.VARIABLE_LOCAL, 1);
        const etqSalto = resultado.Crear_Etiqueta();
        nuevoEntorno.GuardarEtiqueta(etqSalto);
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        if (cuerpo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR) {
            // TEGRESO AL AMBITO
            // resultado.Agregar_CodigoNodo( this.RegresarEntorno(e) );
            return cuerpo;
        }
        // ================= CREO EL CODIGO PARA LA FUNCION  =================
        resultado.Agregar_LineaCodigo("\n#=========== FUNCION " + this.id + " ===========");
        resultado.Agregar_LineaCodigo("proc " + this.id + " begin::");
        resultado.Agregar_CodigoNodo(cuerpo);
        resultado.Agregar_LineaCodigo(etqSalto + ":");
        resultado.Agregar_LineaCodigo("end::");
        //resultado.EstablecerCabeza()
        return resultado;
    }
    FuncionConParametros(tipoFuncion, e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        /* const nombre = this.Analizar_Parametros();
        if( e.AgregarFuncion(nombre,tipoFuncion) ){
            // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
            Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre",
                    this.linea,this.columna);
            resultado.BorrarError();
            return resultado;
        } */
        // ================= CREO EL ENTORNO NUEVO PARA LA FUNCION  =================
        let nuevoEntorno = new Entorno_1.Entorno("funcion", e, 0);
        // METO LOS PARAMETROS Y RETORNO AL ENTORNO
        if (this.parametros != null) {
            for (let param of this.parametros) {
                const tipoP = auxExpresion_1.auxExpresion.GetTipo(param.tipo.tipo);
                nuevoEntorno.Agregar(param.id, tipoP, Entorno_1.Entorno.ROL.VARIABLE_LOCAL, 1);
            }
        }
        const nameReturn = "return";
        nuevoEntorno.Agregar(nameReturn, tipoFuncion, Entorno_1.Entorno.ROL.VARIABLE_LOCAL, 1);
        const etqSalto = resultado.Crear_Etiqueta();
        nuevoEntorno.GuardarEtiqueta(etqSalto);
        // ============== EJECUTO EL CUERPO ============== 
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        if (cuerpo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        // ================= CREO EL CODIGO PARA LA FUNCION  =================
        resultado.Agregar_LineaCodigo("\n#=========== FUNCION " + this.id + " ===========");
        resultado.Agregar_LineaCodigo("proc " + this.id + " begin::");
        resultado.Agregar_CodigoNodo(cuerpo);
        resultado.Agregar_LineaCodigo(etqSalto + ":");
        /* // ESTABLESCO LA CABEZA EVALUANDO LA PILA
        resultado.Agregar_LineaCodigo("#======== RETORNO ========");
        let dato = nuevoEntorno.Get(nameReturn);
        let tem2 = resultado.Crear_Temporal();
        // OBTENGO EL VALOR DEL RETURN
        if(dato?.posRelativa !=0){
            let tem = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem+"= P+"+dato?.posRelativa);
            resultado.Agregar_LineaCodigo( tem2+"= Stack["+tem+"]");
        }else{
            resultado.Agregar_LineaCodigo( tem2+"= Stack[P]" );
        }
        resultado.EstablecerCabeza(tem2,tipoFuncion); */
        resultado.Agregar_LineaCodigo("end::");
        return resultado;
    }
    CambiarEntorno(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        if (e.contador != 0)
            resultado.Agregar_LineaCodigo("P= " + "P+" + e.contador);
        return resultado;
    }
    RegresarEntorno(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        if (e.contador != 0)
            resultado.Agregar_LineaCodigo("P= " + "P-" + e.contador);
        return resultado;
    }
    Analizar_Parametros() {
        let nombre = this.id;
        if (this.parametros) {
            for (let param of this.parametros) {
                //const tipoParam = auxExpresion.GetTipo(param.tipo.tipo);
                nombre += '_' + param.tipo.tipo;
            }
        }
        return nombre;
    }
    CrearNombre() {
        let resultado = "";
        if (this.parametros == null)
            resultado = this.id + "_funcion";
        else
            resultado = this.Analizar_Parametros();
        return resultado;
    }
    GetTipo() {
        return auxExpresion_1.auxExpresion.GetTipo(this.tipo.tipo);
        ;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "CrearFuncion";
        // NODO DEL TIPO
        const tipo = new nodoGrafica_1.nodoGrafica();
        tipo.Crear_NodoInicial(this.tipo.tipo);
        resultado.Armar_NodoGrafica(cabeza, tipo, null);
        // NOMBRE DE LA FUNCION
        const nombre = new nodoGrafica_1.nodoGrafica();
        nombre.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica(cabeza, nombre, null);
        if (this.parametros != null) {
            for (let param of this.parametros)
                resultado.Armar_NodoGrafica(cabeza, this.GraficarParametro(param), null);
        }
        resultado.Armar_NodoGrafica(cabeza, this.cuerpo.Graficar(), null);
        return resultado;
    }
    GraficarParametro(para) {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Parametro";
        // NODO DEL TIPO
        const tipo = new nodoGrafica_1.nodoGrafica();
        tipo.Crear_NodoInicial(para.tipo.tipo);
        resultado.Armar_NodoGrafica(cabeza, tipo, null);
        const nombre = new nodoGrafica_1.nodoGrafica();
        nombre.Crear_NodoInicial(para.id);
        resultado.Armar_NodoGrafica(cabeza, nombre, null);
        return resultado;
    }
}
exports.CrearFuncion = CrearFuncion;
/* private FuncionSinParametros(tipoFuncion:any, e:Entorno): nodoCodigo{
    let resultado = new nodoCodigo();
    if( e.AgregarGlobal(this.id+"_funcion",tipoFuncion,Entorno.ROL.FUNCION,1) ){
        // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
        Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre",
                this.linea,this.columna);
        resultado.BorrarError();
        return resultado;
    }
    // ================= CREO EL ENTORNO NUEVO PARA LA FUNCION  =================
    let nuevoEntorno = new Entorno("funcion",e,0);
    /* let tem = resultado.Crear_Temporal();
-->    let valDefault = "";
    // PRIMERO VERIFICO SI ES UN STRING
    if(tipoFuncion == auxExpresion.COMBINACION_TIPOS.STRING){
        let defecto = String.GuardarDefault();
        valDefault = defecto.cabeza;
        resultado.Agregar_CodigoNodo( defecto );
    }else{
        valDefault = auxExpresion.GetDefault(tipoFuncion);
    } */
/*   // CAMBIO DE AMBITO
-->        resultado.Agregar_LineaCodigo("#CAMBIO")
   resultado.Agregar_CodigoNodo( this.CambiarEntorno(e) ); */
// AGREGO AL NUEVO ENTORNO EL ESPACIO RESERVADO PARA EL RETORNO
/* if(nuevoEntorno.contador!=0){
    resultado.Agregar_LineaCodigo(tem+"= P+"+nuevoEntorno.contador);
    resultado.Agregar_LineaCodigo( "Stack["+tem+"] = "+valDefault);
}else{
    resultado.Agregar_LineaCodigo( "Stack[P] = "+valDefault );
} *
const nameReturn = "return";
nuevoEntorno.Agregar(nameReturn,tipoFuncion,Entorno.ROL.VARIABLE_LOCAL,1);


let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
if(cuerpo.tipo == auxExpresion.COMBINACION_TIPOS.ERR){
-->        // TEGRESO AL AMBITO
    // resultado.Agregar_CodigoNodo( this.RegresarEntorno(e) );
    return cuerpo;
}

// ================= CREO EL CODIGO PARA LA FUNCION  =================
resultado.Agregar_LineaCodigo("\n#=========== FUNCION " +this.id+ " ===========");
resultado.Agregar_LineaCodigo("proc "+this.id+" begin::");

    resultado.Agregar_CodigoNodo(cuerpo);

    // ESTABLESCO LA CABEZA EVALUANDO LA PILA
    resultado.Agregar_LineaCodigo("#======== RETORNO ========");
    let dato = nuevoEntorno.Get(nameReturn);
    let tem2 = resultado.Crear_Temporal();
    // OBTENGO EL VALOR DEL RETURN
    if(dato?.posRelativa !=0){
        let tem = resultado.Crear_Temporal();
        resultado.Agregar_LineaCodigo(tem+"= P+"+dato?.posRelativa);
        resultado.Agregar_LineaCodigo( tem2+"= Stack["+tem+"]");
    }else{
        resultado.Agregar_LineaCodigo( tem2+"= Stack[P]" );
    }
    resultado.EstablecerCabeza(tem2,tipoFuncion);

  /*   // REGRESO AL AMBITO
-->        resultado.Agregar_LineaCodigo("#REGRESO")
     resultado.Agregar_CodigoNodo( this.RegresarEntorno(e) ); *
resultado.Agregar_LineaCodigo("end::");
//resultado.EstablecerCabeza()

return resultado;
}
*/ 
