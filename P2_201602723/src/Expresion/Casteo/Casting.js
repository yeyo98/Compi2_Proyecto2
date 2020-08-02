"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
class Casting {
    constructor() { }
    static CasteoImplicito(tipoVariable, valor) {
        let combinacionTipo = auxExpresion_1.auxExpresion.Evaluar_Tipos(tipoVariable, valor.tipo);
        switch (combinacionTipo) {
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR: {
                valor.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER: {
                valor.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR: {
                valor.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            default: {
                valor.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                break;
            }
        }
        return valor;
    }
    static CasteoExplicito(tipoVariable, valor) {
        return new nodoCodigo_1.nodoCodigo();
    }
}
exports.Casting = Casting;
