"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class Cabecera extends nodoAst_1.nodoAst {
    constructor(variable, cuerpo) {
        super(0, 0);
        this.variable = variable;
        /*this.stack = stack;
        this.heap = heap;
        this.ptr1 = ptr1;
        this.ptr2 = ptr2;*/
        this.cuerpo = cuerpo;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        resultado.Agregar_CodigoNodo(this.variable.Ejecutar(e));
        /*resultado.Agregar_CodigoNodo(this.stack.Ejecutar(e));
        resultado.Agregar_CodigoNodo(this.heap.Ejecutar(e));
        resultado.Agregar_CodigoNodo(this.ptr1.Ejecutar(e));
        resultado.Agregar_CodigoNodo(this.ptr2.Ejecutar(e));*/
        resultado.Agregar_CodigoNodo(this.cuerpo.Ejecutar(e));
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Inicio";
        // AGREGO TEMPS Y STACK
        resultado.Armar_NodoGrafica(cabeza, this.variable.Graficar(), this.cuerpo.Graficar());
        // AGREGO HEAP Y PTR1
        /*resultado.Armar_NodoGrafica(cabeza,this.heap.Graficar(),this.ptr1.Graficar());
        // AGREGO PTR2 Y CUERPO
        resultado.Armar_NodoGrafica(cabeza, this.ptr2.Graficar(),this.stack.Graficar());*/
        return resultado;
    }
}
exports.Cabecera = Cabecera;
//# sourceMappingURL=Cabecera.js.map