"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const Entorno_1 = require("../Datos/Entorno/Entorno");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const Informacion_1 = require("../Datos/Informacion");
//import { auxDecla } from './auxDecla';
const String_1 = require("../Objectos/String");
const Casting_1 = require("../Expresion/Casteo/Casting");
const ListaArreglo_1 = require("../Arreglos/ListaArreglo");
class Declaracion extends nodoAst_1.nodoAst {
    constructor(tipo, ids, exp, tipoDecla, line, col) {
        super(line, col);
        this.tipo = tipo;
        this.ids = ids;
        this.tipoDecla = tipoDecla;
        this.exp = exp;
    }
    Ejecutar(e) {
        //const resultado = new nodoCodigo();
        // PRIMERO ANALIZO SI ES ARREGLO
        if (this.tipo.arreglo)
            return this.GuardarArreglo(e);
        return this.GuardarVariable(e);
    }
    GuardarVariable(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        const tipoVariable = auxExpresion_1.auxExpresion.GetTipo(this.tipo.tipo);
        ;
        // ======================= SI ES NULL DE UNA VEZ LO GUARDO ======================= 
        if (this.exp == null) {
            return this.VariableSinValor(e, tipoVariable);
        }
        else {
            // SI NO, OPERO Y ANALIZO
            let exp = this.exp.Ejecutar(e);
            // SI HUBO UN ERROR SUBIRLO
            if (exp.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return exp;
            // ======================= PRIMERO COMPRUEBO SI ES UN TIPO PRIMITIVO =======================
            if (!auxExpresion_1.auxExpresion.IsPrimity(tipoVariable)) {
                // AQUI LLAMO UN METODO PARA LAS VARIABLES QUE NO SON PRIMITIVOS
                return this.VariableNoPrimitivo(e);
            }
            // COMPRUEBO SI LOS TIPO SON LO CORRECTOS
            if (tipoVariable != exp.tipo) {
                /* SI NO SON IGUALES, TENDRIA QUE LLAMAR UN METODO DE CASTEO
                    PARA VER SI AUN SE PUEDE
                */
                exp = Casting_1.Casting.CasteoImplicito(tipoVariable, exp);
                if (exp.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR) {
                    Informacion_1.Informacion.ErrSemantico("No se puede declarar la variable, los tipos no son los mismo", this.linea, this.columna);
                    resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                    return resultado;
                }
            }
            // AGREGO EL CODIGO GENERADO DE LA EXPRESION
            resultado.Agregar_CodigoNodo(exp);
            resultado.Agregar_LineaCodigo("#=========== DECLARACION VARIABLES ===========");
            for (let id of this.ids) {
                if (e.contador != 0) {
                    let tem = resultado.Crear_Temporal();
                    resultado.Agregar_LineaCodigo(tem + "= P+" + e.contador);
                    resultado.Agregar_LineaCodigo("Stack[" + tem + "] = " + exp.cabeza);
                }
                else {
                    resultado.Agregar_LineaCodigo("Stack[P] = " + exp.cabeza);
                }
                // AHORA LO AGREGO AL ENTORNO
                if (e.Agregar(id, tipoVariable, Entorno_1.Entorno.ROL.VARIABLE_LOCAL, 1)) {
                    // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                    Informacion_1.Informacion.ErrSemantico("No se puede Declarar 2 variables con el mismo nombre en un mismo ambito", this.linea, this.columna);
                    resultado.BorrarError();
                    return resultado;
                }
            }
        }
        //resultado.Agregar_LineaCodigo("#=========== FIN DECLARACION VARIABLES ===========");
        return resultado;
    }
    VariableSinValor(e, tipo) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        resultado.Agregar_LineaCodigo("\n#=========== DECLARACION VARIABLES ===========");
        let valDefault = "";
        // PRIMERO VERIFICO SI ES UN STRING
        if (tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING) {
            let defecto = String_1.String.GuardarDefault();
            valDefault = defecto.cabeza;
            resultado.Agregar_CodigoNodo(defecto);
        }
        else {
            valDefault = auxExpresion_1.auxExpresion.GetDefault(tipo);
        }
        for (let id of this.ids) {
            if (e.contador != 0) {
                let tem = resultado.Crear_Temporal();
                resultado.Agregar_LineaCodigo(tem + "= P+" + e.contador);
                resultado.Agregar_LineaCodigo("Stack[" + tem + "] = " + valDefault);
            }
            else {
                resultado.Agregar_LineaCodigo("Stack[P] = " + valDefault);
            }
            // AHORA LO AGREGO AL ENTORNO
            if (e.Agregar(id, tipo, Entorno_1.Entorno.ROL.VARIABLE_LOCAL, 1)) {
                // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                Informacion_1.Informacion.ErrSemantico("No se puede Declarar 2 variables con el mismo nombre en un mismo ambito", this.linea, this.columna);
                resultado.BorrarError();
                return resultado;
            }
        }
        return resultado;
    }
    GuardarArreglo(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        if (this.exp instanceof ListaArreglo_1.ListaArreglo) {
            const tipoVariable = auxExpresion_1.auxExpresion.GetTipo(this.tipo.tipo);
            ;
            this.exp.SetTipo(tipoVariable);
            let aux = this.exp.Ejecutar(e);
            if (aux.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return aux;
            resultado.Agregar_CodigoNodo(aux);
            for (let id of this.ids) {
                // AHORA LO AGREGO AL ENTORNO
                if (e.Agregar(id, tipoVariable, Entorno_1.Entorno.ROL.VARIABLE_LOCAL, this.exp.cont)) {
                    // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                    Informacion_1.Informacion.ErrSemantico("No se puede Declarar 2 Arreglos con el mismo nombre en un mismo ambito", this.linea, this.columna);
                    resultado.BorrarError();
                    return resultado;
                }
            }
        }
        else {
            Informacion_1.Informacion.ErrSemantico("No se puede Declarar un arreglo con esta expresion", this.linea, this.columna);
            resultado.BorrarError();
            return resultado;
        }
        return resultado;
    }
    VariableNoPrimitivo(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // COMPRUEBO QUE SEA STRING
        if (this.tipo.tipo.toLowerCase() == "string") {
        }
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const tipo = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Decla";
        // NODO DEL TIPO
        tipo.Crear_NodoInicial(this.tipo.tipo);
        resultado.Armar_NodoGrafica(cabeza, tipo, null);
        /* if(this.tipo.arreglo != null)
        {
            // NODO DEL ARREGLO
            const arreglo = this.tipo.arreglo.Graficar();
            resultado.Armar_NodoGrafica(cabeza,arreglo,null);
        } */
        // AGREGANDO LOS IDS
        for (let id of this.ids) {
            const nombre = new nodoGrafica_1.nodoGrafica();
            nombre.Crear_NodoInicial(id);
            resultado.Armar_NodoGrafica(cabeza, nombre, null);
        }
        // AGREGANDO EXP SI EXISTE
        if (this.exp != null) {
            const exp = this.exp.Graficar();
            resultado.Armar_NodoGrafica(cabeza, exp, null);
        }
        return resultado;
    }
}
exports.Declaracion = Declaracion;
