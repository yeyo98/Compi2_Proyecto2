"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const auxExpresion_1 = require("../Expresion/auxExpresion");
class Error extends nodoAst_1.nodoAst {
    constructor(li, col) {
        super(li, col);
    }
    Ejecutar(e) {
        let r = new nodoCodigo_1.nodoCodigo();
        r.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
        return r;
    }
    Graficar() {
        const raiz = new nodoGrafica_1.nodoGrafica();
        raiz.Crear_NodoInicial('ERROR SINTACTICO!!');
        return raiz;
    }
}
exports.Error = Error;
//# sourceMappingURL=Error.js.map