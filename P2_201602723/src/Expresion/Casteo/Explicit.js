"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
const Informacion_1 = require("../../Datos/Informacion");
class Explicit extends nodoAst_1.nodoAst {
    constructor(valor, tipo, line, col) {
        super(line, col);
        this.valor = valor;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let tipoVariable = this.SearchTipo();
        let valor = this.valor.Ejecutar(e);
        if (valor.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return valor;
        let combinacionTipo = auxExpresion_1.auxExpresion.Evaluar_Tipos(tipoVariable, valor.tipo);
        switch (combinacionTipo) {
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE: {
                const tem1 = resultado.Crear_Temporal();
                const tem2 = resultado.Crear_Temporal();
                resultado.Agregar_CodigoNodo(valor);
                resultado.Agregar_LineaCodigo(tem1 + "= " + valor.cabeza + "%1");
                resultado.Agregar_LineaCodigo(tem2 + "= " + valor.cabeza + "-" + tem1);
                resultado.EstablecerCabeza(tem2, auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR);
                //valor.tipo = auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE: {
                const tem1 = resultado.Crear_Temporal();
                const tem2 = resultado.Crear_Temporal();
                resultado.Agregar_CodigoNodo(valor);
                resultado.Agregar_LineaCodigo(tem1 + "= " + valor.cabeza + "%1");
                resultado.Agregar_LineaCodigo(tem2 + "= " + valor.cabeza + "-" + tem1);
                resultado.EstablecerCabeza(tem2, auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER);
                //valor.tipo = auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER: {
                valor.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR;
                return valor;
            }
            default: {
                Informacion_1.Informacion.ErrSemantico("No existe este tipo de casteo", this.linea, this.columna);
                valor.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                valor.BorrarError();
                return valor;
            }
        }
        return resultado;
    }
    SearchTipo() {
        let tipo;
        switch (this.tipo) {
            case 1: {
                tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case 2: {
                tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case 3: {
                tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
        }
        return tipo;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Casteo";
        const tipo = new nodoGrafica_1.nodoGrafica();
        switch (this.tipo) {
            case 1: {
                tipo.Crear_NodoInicial("Double");
                break;
            }
            case 2: {
                tipo.Crear_NodoInicial("Integer");
                break;
            }
            case 3: {
                tipo.Crear_NodoInicial("Char");
                break;
            }
        }
        resultado.Armar_NodoGrafica(cabeza, tipo, null);
        resultado.Armar_NodoGrafica(cabeza, this.valor.Graficar(), null);
        return resultado;
    }
}
exports.Explicit = Explicit;
//# sourceMappingURL=Explicit.js.map