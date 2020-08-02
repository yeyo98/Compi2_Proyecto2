"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class Temporal extends nodoAst_1.nodoAst {
    constructor(ids) {
        super(1, 1);
        this.ids = ids;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        for (let id of this.ids) {
            resultado.listaTemporal.push(id);
        }
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Temps";
        for (let id of this.ids) {
            let aux = new nodoGrafica_1.nodoGrafica();
            aux.Crear_NodoInicial(id);
            resultado.Armar_NodoGrafica(cabeza, aux, null);
        }
        return resultado;
    }
}
exports.Temporal = Temporal;
//# sourceMappingURL=Temporal.js.map