"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auxExpresion_1 = require("../Expresion/auxExpresion");
class auxDecla {
    constructor() {
    }
    static GetTipo(tipo) {
        let resultado;
        tipo = tipo.toLowerCase();
        switch (tipo) {
            case "integer": {
                resultado = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case "double": {
                resultado = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case "char": {
                resultado = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
            case "boolean": {
                resultado = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.BOOL;
                break;
            }
            default: {
                if (tipo === "string") {
                    resultado = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING;
                    break;
                }
                // CASO PARA CUANDO SEA UN IDENTIFICADOR
                resultado = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ID;
            }
        }
        return resultado;
    }
    static GetDefault(tipo) {
        let resultado = "";
        switch (tipo) {
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER: {
                resultado = 0 + "";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE: {
                resultado = 0 + "";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR: {
                resultado = -1 + "";
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.BOOL: {
                resultado = 0 + "";
                break;
            }
            default: {
                resultado = -1 + "";
                break;
            }
        }
        return resultado;
    }
    static IsPrimity(tipo) {
        if (tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER || tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE
            || tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR || tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.BOOL
            || auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING)
            return true;
        return false;
    }
}
exports.auxDecla = auxDecla;
