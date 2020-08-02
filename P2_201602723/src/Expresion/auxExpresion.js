"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var COMBINACION_TIPOS;
(function (COMBINACION_TIPOS) {
    COMBINACION_TIPOS[COMBINACION_TIPOS["INTEGER_INTEGER"] = 0] = "INTEGER_INTEGER";
    COMBINACION_TIPOS[COMBINACION_TIPOS["INTEGER_STRING"] = 1] = "INTEGER_STRING";
    COMBINACION_TIPOS[COMBINACION_TIPOS["INTEGER_DOUBLE"] = 2] = "INTEGER_DOUBLE";
    COMBINACION_TIPOS[COMBINACION_TIPOS["INTEGER_CHAR"] = 3] = "INTEGER_CHAR";
    COMBINACION_TIPOS[COMBINACION_TIPOS["INTEGER_BOOL"] = 4] = "INTEGER_BOOL";
    COMBINACION_TIPOS[COMBINACION_TIPOS["STRING_INTEGER"] = 5] = "STRING_INTEGER";
    COMBINACION_TIPOS[COMBINACION_TIPOS["STRING_STRING"] = 6] = "STRING_STRING";
    COMBINACION_TIPOS[COMBINACION_TIPOS["STRING_DOUBLE"] = 7] = "STRING_DOUBLE";
    COMBINACION_TIPOS[COMBINACION_TIPOS["STRING_CHAR"] = 8] = "STRING_CHAR";
    COMBINACION_TIPOS[COMBINACION_TIPOS["STRING_BOOL"] = 9] = "STRING_BOOL";
    COMBINACION_TIPOS[COMBINACION_TIPOS["DOUBLE_INTEGER"] = 10] = "DOUBLE_INTEGER";
    COMBINACION_TIPOS[COMBINACION_TIPOS["DOUBLE_STRING"] = 11] = "DOUBLE_STRING";
    COMBINACION_TIPOS[COMBINACION_TIPOS["DOUBLE_DOUBLE"] = 12] = "DOUBLE_DOUBLE";
    COMBINACION_TIPOS[COMBINACION_TIPOS["DOUBLE_CHAR"] = 13] = "DOUBLE_CHAR";
    COMBINACION_TIPOS[COMBINACION_TIPOS["DOUBLE_BOOL"] = 14] = "DOUBLE_BOOL";
    COMBINACION_TIPOS[COMBINACION_TIPOS["CHAR_INTEGER"] = 15] = "CHAR_INTEGER";
    COMBINACION_TIPOS[COMBINACION_TIPOS["CHAR_STRING"] = 16] = "CHAR_STRING";
    COMBINACION_TIPOS[COMBINACION_TIPOS["CHAR_DOUBLE"] = 17] = "CHAR_DOUBLE";
    COMBINACION_TIPOS[COMBINACION_TIPOS["CHAR_CHAR"] = 18] = "CHAR_CHAR";
    COMBINACION_TIPOS[COMBINACION_TIPOS["CHAR_BOOL"] = 19] = "CHAR_BOOL";
    COMBINACION_TIPOS[COMBINACION_TIPOS["BOOL_INTEGER"] = 20] = "BOOL_INTEGER";
    COMBINACION_TIPOS[COMBINACION_TIPOS["BOOL_STRING"] = 21] = "BOOL_STRING";
    COMBINACION_TIPOS[COMBINACION_TIPOS["BOOL_DOUBLE"] = 22] = "BOOL_DOUBLE";
    COMBINACION_TIPOS[COMBINACION_TIPOS["BOOL_CHAR"] = 23] = "BOOL_CHAR";
    COMBINACION_TIPOS[COMBINACION_TIPOS["BOOL_BOOL"] = 24] = "BOOL_BOOL";
    COMBINACION_TIPOS[COMBINACION_TIPOS["INTEGER"] = 25] = "INTEGER";
    COMBINACION_TIPOS[COMBINACION_TIPOS["DOUBLE"] = 26] = "DOUBLE";
    COMBINACION_TIPOS[COMBINACION_TIPOS["BOOL"] = 27] = "BOOL";
    COMBINACION_TIPOS[COMBINACION_TIPOS["CHAR"] = 28] = "CHAR";
    COMBINACION_TIPOS[COMBINACION_TIPOS["STRING"] = 29] = "STRING";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ARR_INTEGER"] = 30] = "ARR_INTEGER";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ARR_DOUBLE"] = 31] = "ARR_DOUBLE";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ARR_BOOL"] = 32] = "ARR_BOOL";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ARR_CHAR"] = 33] = "ARR_CHAR";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ARR_STRING"] = 34] = "ARR_STRING";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ARREGLO"] = 35] = "ARREGLO";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ID"] = 36] = "ID";
    //NOTHING,
    COMBINACION_TIPOS[COMBINACION_TIPOS["VOID"] = 37] = "VOID";
    COMBINACION_TIPOS[COMBINACION_TIPOS["ERR"] = 38] = "ERR";
})(COMBINACION_TIPOS || (COMBINACION_TIPOS = {}));
class auxExpresion {
    static Evaluar_Tipos(op1, op2) {
        let respuesta = COMBINACION_TIPOS.ERR;
        if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.INTEGER) {
            respuesta = COMBINACION_TIPOS.INTEGER_INTEGER;
        }
        else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.STRING) {
            respuesta = COMBINACION_TIPOS.INTEGER_STRING;
        }
        else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.DOUBLE) {
            respuesta = COMBINACION_TIPOS.INTEGER_DOUBLE;
        }
        else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.CHAR) {
            respuesta = COMBINACION_TIPOS.INTEGER_CHAR;
        }
        else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.BOOL) {
            respuesta = COMBINACION_TIPOS.INTEGER_BOOL;
        }
        else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.INTEGER) {
            respuesta = COMBINACION_TIPOS.STRING_INTEGER;
        }
        else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.STRING) {
            respuesta = COMBINACION_TIPOS.STRING_STRING;
        }
        else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.DOUBLE) {
            respuesta = COMBINACION_TIPOS.STRING_DOUBLE;
        }
        else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.CHAR) {
            respuesta = COMBINACION_TIPOS.STRING_CHAR;
        }
        else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.BOOL) {
            respuesta = COMBINACION_TIPOS.STRING_BOOL;
        }
        else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.INTEGER) {
            respuesta = COMBINACION_TIPOS.DOUBLE_INTEGER;
        }
        else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.STRING) {
            respuesta = COMBINACION_TIPOS.DOUBLE_STRING;
        }
        else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.DOUBLE) {
            respuesta = COMBINACION_TIPOS.DOUBLE_DOUBLE;
        }
        else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.CHAR) {
            respuesta = COMBINACION_TIPOS.DOUBLE_CHAR;
        }
        else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.BOOL) {
            respuesta = COMBINACION_TIPOS.DOUBLE_BOOL;
        }
        else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.INTEGER) {
            respuesta = COMBINACION_TIPOS.CHAR_INTEGER;
        }
        else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.STRING) {
            respuesta = COMBINACION_TIPOS.CHAR_STRING;
        }
        else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.DOUBLE) {
            respuesta = COMBINACION_TIPOS.CHAR_DOUBLE;
        }
        else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.CHAR) {
            respuesta = COMBINACION_TIPOS.CHAR_CHAR;
        }
        else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.BOOL) {
            respuesta = COMBINACION_TIPOS.CHAR_BOOL;
        }
        else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.INTEGER) {
            respuesta = COMBINACION_TIPOS.BOOL_INTEGER;
        }
        else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.STRING) {
            respuesta = COMBINACION_TIPOS.BOOL_STRING;
        }
        else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.DOUBLE) {
            respuesta = COMBINACION_TIPOS.BOOL_DOUBLE;
        }
        else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.CHAR) {
            respuesta = COMBINACION_TIPOS.BOOL_CHAR;
        }
        else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.BOOL) {
            respuesta = COMBINACION_TIPOS.BOOL_BOOL;
        }
        return respuesta;
    }
    static GetDefault(tipo) {
        let resultado = "";
        switch (tipo) {
            case auxExpresion.COMBINACION_TIPOS.INTEGER: {
                resultado = 0 + "";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE: {
                resultado = 0 + "";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR: {
                resultado = -1 + "";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL: {
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
    static GetTipo(tipo) {
        let resultado;
        tipo = tipo.toLowerCase();
        switch (tipo) {
            case "integer": {
                resultado = auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case "double": {
                resultado = auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case "char": {
                resultado = auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
            case "boolean": {
                resultado = auxExpresion.COMBINACION_TIPOS.BOOL;
                break;
            }
            case "void": {
                resultado = auxExpresion.COMBINACION_TIPOS.VOID;
                break;
            }
            default: {
                if (tipo === "string") {
                    resultado = auxExpresion.COMBINACION_TIPOS.STRING;
                    break;
                }
                // CASO PARA CUANDO SEA UN IDENTIFICADOR
                resultado = auxExpresion.COMBINACION_TIPOS.ID;
            }
        }
        return resultado;
    }
    static GetTipoString(tipo) {
        let resultado = "";
        switch (tipo) {
            case auxExpresion.COMBINACION_TIPOS.INTEGER: {
                resultado = "integer";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE: {
                resultado = "double";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR: {
                resultado = "char";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL: {
                resultado = "boolean";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.VOID: {
                resultado = "void";
                break;
            }
            default: {
                if (tipo == auxExpresion.COMBINACION_TIPOS.STRING) {
                    resultado = "string";
                    break;
                }
                // CASO PARA CUANDO SEA UN IDENTIFICADOR
                //resultado = auxExpresion.COMBINACION_TIPOS.ID;
            }
        }
        return resultado;
    }
    static IsPrimity(tipo) {
        if (tipo == auxExpresion.COMBINACION_TIPOS.INTEGER || tipo == auxExpresion.COMBINACION_TIPOS.DOUBLE
            || tipo == auxExpresion.COMBINACION_TIPOS.CHAR || tipo == auxExpresion.COMBINACION_TIPOS.BOOL
            || auxExpresion.COMBINACION_TIPOS.STRING)
            return true;
        return false;
    }
}
exports.auxExpresion = auxExpresion;
auxExpresion.COMBINACION_TIPOS = COMBINACION_TIPOS;
