"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class AHeap_Stack extends nodoAst_1.nodoAst {
    constructor(pos, valor, tipo, line, col) {
        super(line, col);
        this.pos = pos;
        this.valor = valor;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        const nombre = (this.tipo) ? "Stack" : "Heap";
        resultado.Agregar_LineaCodigo(nombre + "[" + this.pos + "]= " + this.valor);
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const nombre = (this.tipo) ? "Stack" : "Heap";
        let aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.pos);
        resultado.Armar_NodoGrafica(nombre, aux, null);
        aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.valor);
        resultado.Armar_NodoGrafica(nombre, aux, null);
        return resultado;
    }
}
exports.AHeap_Stack = AHeap_Stack;
//# sourceMappingURL=AHeap_Stack.js.map