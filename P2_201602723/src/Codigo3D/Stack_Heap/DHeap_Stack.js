"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class DHeap_Stack extends nodoAst_1.nodoAst {
    constructor(id, pos, tipo, line, col) {
        super(line, col);
        this.pos = pos;
        this.id = id;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        const nombre = (this.tipo) ? "Stack" : "Heap";
        resultado.Agregar_LineaCodigo(this.id + "= " + nombre + "[" + this.pos + "]");
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const nombre = (this.tipo) ? "Stack" : "Heap";
        let aux = new nodoGrafica_1.nodoGrafica();
        aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica(nombre, aux, null);
        aux.Crear_NodoInicial(this.pos);
        resultado.Armar_NodoGrafica(nombre, aux, null);
        return resultado;
    }
}
exports.DHeap_Stack = DHeap_Stack;
//# sourceMappingURL=DHeap_Stack.js.map