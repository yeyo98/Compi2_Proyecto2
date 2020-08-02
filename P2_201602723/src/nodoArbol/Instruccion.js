"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const CrearFuncion_1 = require("../Funciones/Creacion_Funcion/CrearFuncion");
class Instruccion extends nodoAst_1.nodoAst {
    constructor(nuevo, lista) {
        super(0, 0);
        this.listaInstrucciones = [];
        // TENGO QUE AGREGAR LAS LISTAS
        if (lista != null)
            this.listaInstrucciones = lista.listaInstrucciones;
        this.listaInstrucciones.push(nuevo);
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        for (let elemento of this.listaInstrucciones) {
            if (elemento instanceof CrearFuncion_1.CrearFuncion)
                continue;
            let aux = elemento.Ejecutar(e);
            // VERIFICO SI HUBO ALGUN ERROR
            if (aux.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return aux;
            resultado.Agregar_CodigoNodo(aux);
        }
        return resultado;
    }
    /**
     * if(elemento instanceof LlamarFuncion){
                    elemento.SetTemporales(resultado.listaTemporal);
                }
     */
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
