"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const Entorno_1 = require("../Datos/Entorno/Entorno");
const auxExpresion_1 = require("./auxExpresion");
const String_1 = require("../Objectos/String");
const Informacion_1 = require("../Datos/Informacion");
class Valor extends nodoAst_1.nodoAst {
    constructor(valor, tipo, linea, col) {
        super(linea, col);
        this.valor = valor;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        // CREO EL OBJECTO CON EL CODIGO
        // PRIMERO VERIFICO SI NO ES UN VALOR PRIMITIVO
        switch (this.tipo) {
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING: {
                return String_1.String.GuardarCadena(this.valor);
            }
            case auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ID: {
                return this.ValorEntorno(e);
            }
        }
        //resultado.Agregar_LineaCodigo("\n#=========== VALOR ===========");
        if (this.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.CHAR)
            this.valor = this.valor.charCodeAt(0) + "";
        resultado.EstablecerCabeza(this.valor, this.tipo);
        return resultado;
    }
    ValorEntorno(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        if (!e.Existe(this.valor)) {
            // SI NO EXISTE SUBO EL ERROR
            Informacion_1.Informacion.ErrSemantico("No existe una variable con este Nombre <" + this.valor + ">", this.linea, this.columna);
            resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
            return resultado;
        }
        resultado.Agregar_LineaCodigo("#=========== USAR VARIABLE ===========");
        let valor = e.Get(this.valor);
        // COMPRUEBO SI ES UNA VARIABLE GLOBAL PARA SACARLO DEL HEAP
        if ((valor === null || valor === void 0 ? void 0 : valor.rol) == Entorno_1.Entorno.ROL.VARIABLE_GLOBAL) {
            const tem3 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem3 + "= Heap[" + valor.posHeap + "]");
            //tem2 = tem3;
            resultado.EstablecerCabeza(tem3, valor === null || valor === void 0 ? void 0 : valor.tipo);
            return resultado;
        }
        let tem2 = resultado.Crear_Temporal();
        // SI NO ES GLOBAL LO HAGO NORMAL
        if ((valor === null || valor === void 0 ? void 0 : valor.posRelativa) == 0) {
            resultado.Agregar_LineaCodigo(tem2 + "= Stack[P]");
        }
        else {
            const tem1 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem1 + "= P+" + (valor === null || valor === void 0 ? void 0 : valor.posRelativa));
            resultado.Agregar_LineaCodigo(tem2 + "= Stack[" + tem1 + "]");
        }
        resultado.EstablecerCabeza(tem2, valor === null || valor === void 0 ? void 0 : valor.tipo);
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        resultado.Crear_NodoInicial(this.valor);
        return resultado;
    }
}
exports.Valor = Valor;
