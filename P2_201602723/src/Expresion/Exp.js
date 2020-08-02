"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const Aritmetica_1 = require("./Aritmetica");
const auxExpresion_1 = require("./auxExpresion");
const Relacional_1 = require("./Relacional");
var OPERACION;
(function (OPERACION) {
    // OPERACIONES ARITMETICAS
    OPERACION[OPERACION["suma"] = 0] = "suma";
    OPERACION[OPERACION["resta"] = 1] = "resta";
    OPERACION[OPERACION["multi"] = 2] = "multi";
    OPERACION[OPERACION["division"] = 3] = "division";
    OPERACION[OPERACION["modulo"] = 4] = "modulo";
    OPERACION[OPERACION["potencia"] = 5] = "potencia";
    OPERACION[OPERACION["not"] = 6] = "not";
    OPERACION[OPERACION["Umenos"] = 7] = "Umenos";
    // OPERACIONES RELACIONALES
    OPERACION[OPERACION["menor_igual"] = 8] = "menor_igual";
    OPERACION[OPERACION["menor"] = 9] = "menor";
    OPERACION[OPERACION["mayor_igual"] = 10] = "mayor_igual";
    OPERACION[OPERACION["mayor"] = 11] = "mayor";
    OPERACION[OPERACION["igualdad_referencia"] = 12] = "igualdad_referencia";
    OPERACION[OPERACION["diferencia"] = 13] = "diferencia";
    OPERACION[OPERACION["igualacion"] = 14] = "igualacion";
    OPERACION[OPERACION["op_and"] = 15] = "op_and";
    OPERACION[OPERACION["op_or"] = 16] = "op_or";
    OPERACION[OPERACION["xor"] = 17] = "xor";
})(OPERACION || (OPERACION = {}));
class Exp extends nodoAst_1.nodoAst {
    constructor(op1, op2, tipo, line, col) {
        super(line, col);
        this.op1 = op1;
        this.op2 = op2;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        let operador1 = this.op1.Ejecutar(e);
        if (operador1.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return operador1;
        let operador2;
        if (this.op2 != null) {
            operador2 = this.op2.Ejecutar(e);
            if (operador2.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return operador2;
        }
        else {
            operador2 = new nodoCodigo_1.nodoCodigo();
            operador2.EstablecerCabeza('-1', auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER);
        }
        let traductor = new Aritmetica_1.Aritmetica(this.linea, this.columna);
        let traductor2 = new Relacional_1.Relacional(this.linea, this.columna);
        let resultado = new nodoCodigo_1.nodoCodigo();
        switch (this.tipo) {
            case OPERACION.xor: {
                resultado = traductor2.Traducir_Xor(operador1, operador2);
                break;
            }
            case OPERACION.op_or: {
                resultado = traductor2.Traducir_Or(operador1, operador2);
                break;
            }
            case OPERACION.op_and: {
                resultado = traductor2.Traducir_And(operador1, operador2);
                break;
            }
            case OPERACION.diferencia: {
                resultado = traductor2.Traducir_Diferencia(operador1, operador2);
                break;
            }
            case OPERACION.igualacion: {
                resultado = traductor2.Traducir_Igualacion(operador1, operador2);
                break;
            }
            case OPERACION.igualdad_referencia: {
                resultado = traductor2.Traducir_IgualacionReferencia(operador1, operador2);
                break;
            }
            case OPERACION.mayor: {
                resultado = traductor2.Traducir_Mayor(operador1, operador2);
                break;
            }
            case OPERACION.mayor_igual: {
                resultado = traductor2.Traducir_Mayorigual(operador1, operador2);
                break;
            }
            case OPERACION.menor: {
                resultado = traductor2.Traducir_Menor(operador1, operador2);
                break;
            }
            case OPERACION.menor_igual: {
                resultado = traductor2.Traducir_MenorIgual(operador1, operador2);
                break;
            }
            case OPERACION.suma: {
                resultado = traductor.Traducir_Suma(operador1, operador2);
                break;
            }
            case OPERACION.resta: {
                resultado = traductor.Traducir_Resta(operador1, operador2);
                break;
            }
            case OPERACION.multi: {
                resultado = traductor.Traducir_Multiplicacion(operador1, operador2);
                break;
            }
            case OPERACION.division: {
                resultado = traductor.Traducir_Division(operador1, operador2);
                break;
            }
            case OPERACION.modulo: {
                resultado = traductor.Traducir_Modulo(operador1, operador2);
                break;
            }
            case OPERACION.potencia: {
                resultado = traductor.Traducir_Potencia(operador1, operador2);
                break;
            }
            case OPERACION.not: {
                resultado = traductor.Traducir_Not(operador1, operador2);
                break;
            }
            case OPERACION.Umenos: {
                resultado = traductor.Traducir_Umenos(operador1, operador2);
                break;
            }
        }
        return resultado;
    }
    Graficar() {
        const raiz = new nodoGrafica_1.nodoGrafica();
        //raiz.Crear_NodoInicial("+");
        // OBTENGO EL ARBOL DEL OP1
        let op1 = this.op1.Graficar();
        let op2 = null;
        // SI EXISTE OBTENGO EL ARBOL DEL op2
        if (this.op2 != null)
            op2 = this.op2.Graficar();
        switch (this.tipo) {
            case OPERACION.xor: {
                raiz.Armar_NodoGrafica("^", op1, op2);
                break;
            }
            case OPERACION.op_or: {
                raiz.Armar_NodoGrafica("||", op1, op2);
                break;
            }
            case OPERACION.op_and: {
                raiz.Armar_NodoGrafica("&&", op1, op2);
                break;
            }
            case OPERACION.igualacion: {
                raiz.Armar_NodoGrafica("==", op1, op2);
                break;
            }
            case OPERACION.diferencia: {
                raiz.Armar_NodoGrafica("!=", op1, op2);
                break;
            }
            case OPERACION.igualdad_referencia: {
                raiz.Armar_NodoGrafica("===", op1, op2);
                break;
            }
            case OPERACION.mayor: {
                raiz.Armar_NodoGrafica(">", op1, op2);
                break;
            }
            case OPERACION.mayor_igual: {
                raiz.Armar_NodoGrafica(">=", op1, op2);
                break;
            }
            case OPERACION.menor: {
                raiz.Armar_NodoGrafica("<", op1, op2);
                break;
            }
            case OPERACION.menor_igual: {
                raiz.Armar_NodoGrafica("<=", op1, op2);
                break;
            }
            case OPERACION.suma: {
                raiz.Armar_NodoGrafica("+", op1, op2);
                break;
            }
            case OPERACION.resta: {
                raiz.Armar_NodoGrafica("-", op1, op2);
                break;
            }
            case OPERACION.multi: {
                raiz.Armar_NodoGrafica("*", op1, op2);
                break;
            }
            case OPERACION.division: {
                raiz.Armar_NodoGrafica("/", op1, op2);
                break;
            }
            case OPERACION.modulo: {
                raiz.Armar_NodoGrafica("%", op1, op2);
                break;
            }
            case OPERACION.potencia: {
                raiz.Armar_NodoGrafica("^^", op1, op2);
                break;
            }
            case OPERACION.not: {
                raiz.Armar_NodoGrafica("!", op1, op2);
                break;
            }
            case OPERACION.Umenos: {
                raiz.Armar_NodoGrafica("-", op1, op2);
                break;
            }
        }
        return raiz;
    }
}
exports.Exp = Exp;
Exp.OPERACION = OPERACION;
