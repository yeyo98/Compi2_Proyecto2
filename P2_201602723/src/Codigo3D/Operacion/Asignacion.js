"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Entorno_1 = require("../../Datos/Entorno/Entorno");
const Goto_1 = require("../Goto/Goto");
const If_1 = require("../If/If");
const Etiqueta_1 = require("../Etiqueta/Etiqueta");
const Informacion_1 = require("../../Datos/Informacion");
class Asignacion extends nodoAst_1.nodoAst {
    constructor(id, valor, line, col) {
        super(line, col);
        this.id = id;
        this.valor = valor;
        this.listaInstrucciones = [];
        this.cont = 0;
    }
    Ejecutar(e) {
        return this.Regla1();
    }
    Regla1() {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let codigoOriginal = this.id + "=" + this.valor;
        //let flag = false;
        let auxcuerpo = new nodoCodigo_1.nodoCodigo();
        let e = new Entorno_1.Entorno("", null, 0);
        this.cont++;
        for (let auxcont = this.cont; auxcont < this.listaInstrucciones.length; auxcont++) {
            let instruccion = this.listaInstrucciones[auxcont];
            if (instruccion instanceof Asignacion) {
                if (((instruccion.id === this.id) && (instruccion.valor === this.valor)) ||
                    ((this.id === instruccion.valor) && (this.valor === instruccion.id))) { // SI CUMPLE HAY REDUNDANCIA
                    this.cont = auxcont;
                    resultado.Agregar_LineaCodigo(codigoOriginal);
                    resultado.Agregar_CodigoNodo(auxcuerpo);
                    Informacion_1.Informacion.AddOptimizacion(codigoOriginal + "... " + instruccion.id + "= " + instruccion.valor, codigoOriginal, instruccion.linea, instruccion.columna, 1);
                    return resultado;
                }
                else if (this.id === instruccion.id || this.id === instruccion.valor) { // SI CUMPLE YA SE USO
                    break;
                }
                else if (this.valor === instruccion.id || this.valor === instruccion.valor) { // SI CUMPLE YA SE USO
                    break;
                }
                auxcuerpo.Agregar_LineaCodigo(instruccion.id + "=" + instruccion.valor);
            }
            else if (instruccion instanceof Goto_1.Goto) {
                auxcuerpo.Agregar_LineaCodigo(instruccion.SinOptimizar());
                //break;
            }
            else if (instruccion instanceof If_1.If) {
                auxcuerpo.Agregar_LineaCodigo(instruccion.SinOptimizar());
            }
            else if (instruccion instanceof Etiqueta_1.Etiqueta) { // ME SALGO
                break;
            }
            else {
                auxcuerpo.Agregar_CodigoNodo(instruccion.Ejecutar(e));
            }
        }
        resultado.Agregar_LineaCodigo(codigoOriginal);
        this.cont--;
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const id = new nodoGrafica_1.nodoGrafica();
        id.Crear_NodoInicial(this.id);
        const valor = new nodoGrafica_1.nodoGrafica();
        valor.Crear_NodoInicial(this.valor);
        resultado.Armar_NodoGrafica("Asig", id, valor);
        return resultado;
    }
    SinOptimizar() {
        return this.id + "= " + this.valor;
    }
    PasarArbol(cont, lista) {
        this.cont = cont;
        this.listaInstrucciones = lista;
    }
}
exports.Asignacion = Asignacion;
//# sourceMappingURL=Asignacion.js.map