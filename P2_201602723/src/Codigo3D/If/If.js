"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const AsigOperacion_1 = require("../Operacion/AsigOperacion");
const Regla4_5_1 = require("./Regla4_5");
const Regla3_7_1 = require("./Regla3_7");
class If extends nodoAst_1.nodoAst {
    constructor(op1, op2, operador, id, line, col) {
        super(line, col);
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        this.etiqueta = id;
        this.listaInstrucciones = [];
        this.cont = 0;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        resultado = this.Analizar_Regla();
        return resultado;
    }
    Analizar_Regla() {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // SI AMBOS SON CONSTANTES NUMERICOS ANALIZO REGLA 4 O 5
        if (!isNaN(parseInt(this.op1, 10)) && !isNaN(parseInt(this.op2, 10))) {
            this.cont++;
            const regla = new Regla4_5_1.Regla4_5(this.cont, this.listaInstrucciones, this.linea, this.columna);
            resultado = regla.Optimizar(this.op1, this.op2, this.operador, this.etiqueta);
            this.cont = regla.cont;
            //this.cont--;
        }
        // SI NO ANALIZO REGLA 3 O 7
        else {
            this.cont++;
            const regla = new Regla3_7_1.Regla3_7(this.cont, this.listaInstrucciones, this.linea, this.columna);
            resultado = regla.Optimizar(this.op1, this.op2, this.operador, this.etiqueta);
            this.cont = regla.cont;
            //this.cont--;
        }
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "IF";
        let aux = new nodoGrafica_1.nodoGrafica();
        const operacion = new nodoGrafica_1.nodoGrafica();
        const sig = AsigOperacion_1.AsigOperacion.Simbolo(this.operador);
        aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.op1);
        operacion.Armar_NodoGrafica(sig, aux, null);
        aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.op2);
        operacion.Armar_NodoGrafica(sig, aux, null);
        aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.etiqueta);
        resultado.Armar_NodoGrafica(cabeza, operacion, aux);
        return resultado;
    }
    PasarArbol(cont, lista) {
        this.cont = cont;
        this.listaInstrucciones = lista;
    }
    SinOptimizar() {
        return "if(" + this.op1 + AsigOperacion_1.AsigOperacion.Simbolo(this.operador) + this.op2 + ") goto " + this.etiqueta;
    }
}
exports.If = If;
//# sourceMappingURL=If.js.map