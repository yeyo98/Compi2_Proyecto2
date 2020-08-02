"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const If_1 = require("../If/If");
const Asignacion_1 = require("../Operacion/Asignacion");
const Goto_1 = require("../Goto/Goto");
class Instruccion extends nodoAst_1.nodoAst {
    constructor(nuevo) {
        super(0, 0);
        this.listaInstrucciones = [];
        this.listaInstrucciones.push(nuevo);
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let cont = 0;
        for (cont = 0; cont < this.listaInstrucciones.length; cont++) {
            let elemento = this.listaInstrucciones[cont];
            let aux = new nodoCodigo_1.nodoCodigo();
            if (elemento instanceof If_1.If) {
                elemento.PasarArbol(cont, this.listaInstrucciones);
                aux = elemento.Ejecutar(e);
                cont = elemento.cont; // ACTUALIZO EL CONTADOR
                cont--;
            }
            else if (elemento instanceof Goto_1.Goto) {
                elemento.PasarArbol(cont, this.listaInstrucciones);
                aux = elemento.Ejecutar(e);
                cont = elemento.cont; // ACTUALIZO EL CONTADOR
            }
            else if (elemento instanceof Asignacion_1.Asignacion) {
                elemento.PasarArbol(cont, this.listaInstrucciones);
                aux = elemento.Ejecutar(e);
                cont = elemento.cont; // ACTUALIZO EL CONTADOR
            }
            else {
                aux = elemento.Ejecutar(e);
            }
            resultado.Agregar_CodigoNodo(aux);
        }
        return resultado;
    }
    Graficar() {
        const raiz = new nodoGrafica_1.nodoGrafica();
        for (let elemento of this.listaInstrucciones) {
            const aux = elemento.Graficar();
            raiz.Armar_NodoGrafica("Instrucciones", aux, null);
        }
        return raiz;
    }
}
exports.Instruccion = Instruccion;
//# sourceMappingURL=Instruccion.js.map