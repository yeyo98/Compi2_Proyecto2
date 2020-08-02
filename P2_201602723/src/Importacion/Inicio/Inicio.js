"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Informacion_1 = require("../../Datos/Informacion");
class Inicio extends nodoAst_1.nodoAst {
    constructor(archivos, ins) {
        super(0, 0);
        this.archivo = archivos;
        this.ins = ins;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        //Informacion.flagImport = true;
        resultado.Agregar_CodigoNodo(this.archivo.Ejecutar(e));
        Informacion_1.Informacion.flagImport = false;
        resultado.Agregar_CodigoNodo(this.ins.Ejecutar(e));
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        resultado.Armar_NodoGrafica("Inicio", this.archivo.Graficar(), this.ins.Graficar());
        return resultado;
    }
}
exports.Inicio = Inicio;
//# sourceMappingURL=Inicio.js.map