"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
class Print extends nodoAst_1.nodoAst {
    constructor(valor, tipo, line, col) {
        super(line, col);
        this.valor = valor;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        resultado.Agregar_LineaCodigo('print(' + this.TipoPrint() + ',' + this.valor + ')');
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Print";
        const tipo = new nodoGrafica_1.nodoGrafica();
        tipo.Crear_NodoInicial(this.TipoPrint());
        const valor = new nodoGrafica_1.nodoGrafica();
        valor.Crear_NodoInicial(this.valor);
        resultado.Armar_NodoGrafica(cabeza, tipo, valor);
        return resultado;
    }
    TipoPrint() {
        let resultado = "";
        switch (this.tipo) {
            case 1: {
                resultado = '"%i"';
                break;
            }
            case 2: {
                resultado = '"%d"';
                break;
            }
            case 3: {
                resultado = '"%c"';
                break;
            }
        }
        return resultado;
    }
}
exports.Print = Print;
//# sourceMappingURL=Print.js.map