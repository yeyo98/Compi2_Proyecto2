"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auxExpresion_1 = require("../../Expresion/auxExpresion");
const Entorno_1 = require("./Entorno");
class datoEntorno {
    constructor(tipo, rol, posRelativa, tamanio) {
        this.tipo = tipo;
        this.rol = rol;
        this.posRelativa = posRelativa;
        this.tamanio = tamanio;
        this.posHeap = "";
    }
    GetPosHeap(pos) {
        this.posHeap = pos;
    }
    DevolverTipo() {
        let resultado = "-";
        switch (this.tipo) {
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER: {
                resultado = "Integer";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR: {
                resultado = "Char";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE: {
                resultado = "Double";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.BOOL: {
                resultado = "Bool";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.VOID: {
                resultado = "Void";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING: {
                resultado = "String";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ARR_INTEGER: {
                resultado = "Integer";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ARR_CHAR: {
                resultado = "ARR_Char";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ARR_DOUBLE: {
                resultado = "ARR_Double";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ARR_BOOL: {
                resultado = "ARR_Bool";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ARR_STRING: {
                resultado = "ARR_String";
                break;
            }
        }
        return resultado;
    }
    DevolverRol() {
        let resultado = "-";
        switch (this.rol) {
            case Entorno_1.Entorno.ROL.VARIABLE_LOCAL: {
                resultado = "Var_Local";
                break;
            }
            case Entorno_1.Entorno.ROL.VARIABLE_CONST: {
                resultado = "Var_Const";
                break;
            }
            case Entorno_1.Entorno.ROL.VARIABLE_GLOBAL: {
                resultado = "Var_Global";
                break;
            }
            case Entorno_1.Entorno.ROL.FUNCION: {
                resultado = "Funcion";
                break;
            }
        }
        return resultado;
    }
}
exports.datoEntorno = datoEntorno;
