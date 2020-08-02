"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const String_1 = require("../Objectos/String");
class Print extends nodoAst_1.nodoAst {
    constructor(exp, line, col) {
        super(line, col);
        this.exp = exp;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let valor = this.exp.Ejecutar(e);
        // SI HAY ERROR SOLO SUBO
        if (valor.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return valor;
        resultado = this.Imprimir(valor);
        return resultado;
    }
    Imprimir(valor) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        resultado.Agregar_Codigo2(valor, null);
        resultado.Agregar_LineaCodigo("\n#=========== METODO PRINT ===========");
        // PRIMERO VERIFICO SI ES UN VALOR PRIMITIVO
        switch (valor.tipo) {
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER: {
                resultado.Agregar_LineaCodigo('print("%i",' + valor.cabeza + ')');
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE: {
                resultado.Agregar_LineaCodigo('print("%d",' + valor.cabeza + ')');
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR: {
                resultado.Agregar_LineaCodigo('print("%c",' + valor.cabeza + ')');
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.BOOL: {
                resultado.Agregar_LineaCodigo('print("%i",' + valor.cabeza + ')');
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING: {
                resultado.Agregar_CodigoNodo(String_1.String.ImprimirCadena(valor.cabeza));
                break;
            }
            // AQUI DEVERIAN IR LAS OTRAS ESTRUCTURAS
            default: {
            }
        }
        //resultado.Agregar_LineaCodigo("#=========== FIN METODO PRINT ===========");
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        let valor = this.exp.Graficar();
        resultado.Armar_NodoGrafica("print", valor, null);
        return resultado;
    }
}
exports.Print = Print;
//# sourceMappingURL=Print.js.map