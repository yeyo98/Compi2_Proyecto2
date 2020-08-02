"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const Entorno_1 = require("../Datos/Entorno/Entorno");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const Informacion_1 = require("../Datos/Informacion");
//import { auxDecla } from './auxDecla';
class Declaracion2 extends nodoAst_1.nodoAst {
    constructor(id, exp, tipoDecla, line, col) {
        super(line, col);
        this.id = id;
        this.tipoDecla = tipoDecla;
        this.exp = exp;
    }
    Ejecutar(e) {
        return this.GuardarVariable(e);
    }
    GuardarVariable(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        // OPERO Y ANALIZO
        let exp = this.exp.Ejecutar(e);
        // SI HUBO UN ERROR SUBIRLO
        if (exp.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return exp;
        // ======================= PRIMERO COMPRUEBO SI ES UN TIPO PRIMITIVO =======================
        if (!auxExpresion_1.auxExpresion.IsPrimity(exp.tipo)) {
            // AQUI LLAMO UN METODO PARA LAS VARIABLES QUE NO SON PRIMITIVOS
            //return this.VariableNoPrimitivo(e);
        }
        // UN PARCHE EN EL CASO DE QUE VENGAN CHAR
        // CONVERTIRLO A ASCII
        //if(exp.tipo == auxExpresion.COMBINACION_TIPOS.CHAR)
        //    exp.cabeza = exp.cabeza.charCodeAt(0)+"";
        // AGREGO EL CODIGO GENERADO DE LA EXPRESION
        resultado.Agregar_CodigoNodo(exp);
        resultado.Agregar_LineaCodigo("#=========== DECLARACION VARIABLES 2 ===========");
        let valor;
        let temh;
        // PRIMERO COMPRUEBO SI EN GLOBAL PARA GUARDALO EN EL HEAP Y STACK
        if (this.tipoDecla == 4) {
            temh = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(temh + "= H");
            resultado.Agregar_LineaCodigo("Heap[H]= " + exp.cabeza);
            resultado.Agregar_LineaCodigo("H= H+1");
            //valor = temh;
            if (e.AgregarGlobal(this.id, exp.tipo, this.RolVariable(), temh, 1)) {
                // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                Informacion_1.Informacion.ErrSemantico("No se puede Declarar 2 variables GLOBALES con el mismo nombre", this.linea, this.columna);
                resultado.BorrarError();
                return resultado;
            }
            return resultado;
        }
        valor = exp.cabeza;
        if (e.contador != 0) {
            let tem = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem + "= P+" + e.contador);
            resultado.Agregar_LineaCodigo("Stack[" + tem + "] = " + valor);
        }
        else {
            resultado.Agregar_LineaCodigo("Stack[P] = " + valor);
        }
        // SI ES UN GLOBAL LO GUARDO CON OTRO METODO SI NO SIGUE NORMAL
        /*  if(this.tipoDecla == 4){
             if( e.AgregarGlobal(this.id,exp.tipo,this.RolVariable(),1) ){
                 // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                 Informacion.ErrSemantico("No se puede Declarar 2 variables GLOBALES con el mismo nombre",
                         this.linea,this.columna);
                 resultado.BorrarError();
                 return resultado;
             }
             return resultado;
         } */
        // AHORA LO AGREGO AL ENTORNO
        if (e.Agregar(this.id, exp.tipo, this.RolVariable(), 1)) {
            // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
            Informacion_1.Informacion.ErrSemantico("No se puede Declarar 2 variables con el mismo nombre en un mismo ambito", this.linea, this.columna);
            resultado.BorrarError();
            return resultado;
        }
        //resultado.Agregar_LineaCodigo("#=========== FIN DECLARACION VARIABLES ===========");
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const tipo = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Decla";
        // NODO DEL TIPO
        tipo.Crear_NodoInicial(this.TipoVariable());
        resultado.Armar_NodoGrafica(cabeza, tipo, null);
        // AGREGANDO LOS IDS
        // AGREGANDO EXP SI EXISTE
        if (this.exp != null) {
            const exp = this.exp.Graficar();
            resultado.Armar_NodoGrafica(cabeza, exp, null);
        }
        return resultado;
    }
    TipoVariable() {
        let resultado = "";
        switch (this.tipoDecla) {
            case 2: {
                resultado = "Var";
                break;
            }
            case 3: {
                resultado = "Const";
                break;
            }
            case 4: {
                resultado = "Global";
                break;
            }
        }
        return resultado;
    }
    RolVariable() {
        let resultado = Entorno_1.Entorno.ROL.VARIABLE_LOCAL;
        switch (this.tipoDecla) {
            case 2: {
                resultado = Entorno_1.Entorno.ROL.VARIABLE_LOCAL;
                break;
            }
            case 3: {
                resultado = Entorno_1.Entorno.ROL.VARIABLE_CONST;
                break;
            }
            case 4: {
                resultado = Entorno_1.Entorno.ROL.VARIABLE_GLOBAL;
                break;
            }
        }
        return resultado;
    }
}
exports.Declaracion2 = Declaracion2;
