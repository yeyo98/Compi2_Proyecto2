"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class Proc extends nodoAst_1.nodoAst {
    constructor(id, cuerpo, line, col) {
        super(line, col);
        this.id = id;
        this.cuerpo = cuerpo;
    }
    Ejecutar(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        resultado.Agregar_LineaCodigo("proc " + this.id + " begin::");
        resultado.Agregar_CodigoNodo(this.cuerpo.Ejecutar(e));
        resultado.Agregar_LineaCodigo("end::");
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const id = new nodoGrafica_1.nodoGrafica();
        id.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica("Proc", id, this.cuerpo.Graficar());
        return resultado;
    }
}
exports.Proc = Proc;
//# sourceMappingURL=Proc.js.map