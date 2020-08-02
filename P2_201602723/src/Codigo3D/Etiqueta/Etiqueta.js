"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class Etiqueta extends nodoAst_1.nodoAst {
    constructor(id, line, col) {
        super(line, col);
        this.id = id;
    }
    Ejecutar(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        resultado.cabeza = this.id;
        resultado.Agregar_LineaCodigo(this.id + ":");
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        resultado.Crear_NodoInicial(this.id);
        return resultado;
    }
}
exports.Etiqueta = Etiqueta;
//# sourceMappingURL=Etiqueta.js.map