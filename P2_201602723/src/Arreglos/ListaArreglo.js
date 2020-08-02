"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const Informacion_1 = require("../Datos/Informacion");
const Casting_1 = require("../Expresion/Casteo/Casting");
class ListaArreglo extends nodoAst_1.nodoAst {
    constructor(listaExp, line, col) {
        super(line, col);
        this.unCambio = true;
        this.listaExp = listaExp;
        this.cont = 0;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        const tem1 = resultado.Crear_Temporal();
        resultado.Agregar_LineaCodigo(tem1 + "=H");
        for (let exp of this.listaExp) {
            let aux = exp.Ejecutar(e);
            if (this.tipoIdeal != aux.tipo) {
                /* SI NO SON IGUALES, TENDRIA QUE LLAMAR UN METODO DE CASTEO
                    PARA VER SI AUN SE PUEDE
                */
                if (this.unCambio)
                    aux = Casting_1.Casting.CasteoImplicito(this.tipoIdeal, aux);
                else {
                    aux.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                }
                this.unCambio = false;
                if (aux.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR) {
                    Informacion_1.Informacion.ErrSemantico("No se puede crear este arreglo por ser de tipos distintos", this.linea, this.columna);
                    resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                    return resultado;
                }
            }
            // AQUI TENDRIA QUE AGREGARLO AL HEAP
            resultado.Agregar_CodigoNodo(aux);
            resultado.Agregar_LineaCodigo("Heap[H]=" + aux.cabeza);
            resultado.Agregar_LineaCodigo("H=H+1");
            this.cont++;
        }
        resultado.EstablecerCabeza(tem1, this.tipoIdeal);
        return resultado;
    }
    SetTipo(tipo) {
        this.tipoIdeal = tipo;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "List_Exp";
        for (let exp of this.listaExp)
            resultado.Armar_NodoGrafica(cabeza, exp.Graficar(), null);
        return resultado;
    }
}
exports.ListaArreglo = ListaArreglo;
