"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class Call extends nodoAst_1.nodoAst {
    constructor(id, line, col) {
        super(line, col);
        this.id = id;
    }
    Ejecutar(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        resultado.Agregar_LineaCodigo("Call " + this.id);
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const id = new nodoGrafica_1.nodoGrafica();
        id.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica("Call", id, null);
        return resultado;
    }
}
exports.Call = Call;
//# sourceMappingURL=Call.js.map