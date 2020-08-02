"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Terror_1 = require("./Terror");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const FuncionesNativas_1 = require("./FuncionesNativas");
class Informacion {
    constructor() {
    }
    static Clear_Data() {
        this.lista_errores = [];
        this.Mensaje_Consola = [];
        this.bitacotaOptimizacion = [];
        this.listaMetodos = [];
        this.flagImport = false;
        this.noMetodosImport = 0;
        this.contTemporal = 0;
        this.contEtiqueta = 1;
        this.ptrStack = 0;
        this.ptrHeap = 0;
        this.raiz = null;
    }
    static AddMessage(message) {
        this.Mensaje_Consola.push(new Terror_1.Terror('', 0, 0, '', message));
    }
    static AddOptimizacion(exp, result, line, col, tipo) {
        this.bitacotaOptimizacion.push(new Terror_1.Terror(exp, line, col, tipo + "", result));
    }
    static AddMetodo(nuevo) {
        if (this.flagImport)
            this.noMetodosImport++;
        this.listaMetodos.push(nuevo);
    }
    static ErrSemantico(message, line, col) {
        this.Mensaje_Consola.push(new Terror_1.Terror('', 0, 0, '', "Error Semantico!! "
            + message + " linea: " + line + " ,columna: " + col));
        this.lista_errores.push(new Terror_1.Terror(message, line, col, "Semantico", ""));
    }
    static AddMetodosEntorno(e) {
        // PRIMERO AGREGO LAS FUNCIONES NATIVAS
        FuncionesNativas_1.FuncionesNativas.AgregarEntorno(e);
        for (let elemento of this.listaMetodos) {
            let nombre = elemento.CrearNombre();
            nombre = nombre.toLowerCase();
            if (e.AgregarFuncion(nombre, elemento.GetTipo())) { // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR                
                Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre " + nombre, elemento.linea, elemento.columna);
                //resultado.BorrarError();
                //return resultado;
            }
        }
    }
    static AgregarPrincipal(nodo, e) {
        let aux = new nodoCodigo_1.nodoCodigo();
        let etq = aux.Crear_Etiqueta();
        // AGREGO EL CODIGO GENERADO DEL ARBOL
        aux.Agregar_CodigoNodo(nodo);
        // METODO LA LLAMADA PRINCIPAL
        aux.Agregar_LineaCodigo("Call principal");
        aux.Agregar_LineaCodigo("goto " + etq);
        // PRIMERO VERIFICO QUE VENGA METODOS IMPORTADOS
        while (this.noMetodosImport > 0) {
            let metodo = this.listaMetodos.pop();
            if (metodo != undefined) {
                const auxMetodo = metodo.Ejecutar(e);
                if (auxMetodo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                    continue;
                else
                    aux.Agregar_CodigoNodo(auxMetodo);
            }
            this.noMetodosImport--;
        }
        // AGREGO METODOS
        for (let metodo of this.listaMetodos) {
            const auxMetodo = metodo.Ejecutar(e);
            if (auxMetodo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                continue;
            else
                aux.Agregar_CodigoNodo(auxMetodo);
        }
        // AGREGO LAS FUNCIONES NATIVAS
        aux.Agregar_CodigoNodo(FuncionesNativas_1.FuncionesNativas.AgregarCodigo());
        aux.Agregar_LineaCodigo(etq + ":");
        return aux;
    }
}
exports.Informacion = Informacion;
// LISTA PARA GUARDAR ERRORES Y MENSAJES
Informacion.lista_errores = [];
Informacion.Mensaje_Consola = [];
// LISTA PARA GUARDAR LA BITACORA DE LAS OPTIMIZACIONES
Informacion.bitacotaOptimizacion = [];
// LISTA PARA GURDAR LAS CREACIONES DE LOS METODOS
Informacion.listaMetodos = [];
// ESTOS SON LOS CONTADORES PARA LA CREACION DE TEMPORALES Y ETIQUETAS
Informacion.contTemporal = 0;
Informacion.contEtiqueta = 1;
// ESTOS SON LOS APUNTADORES DE STACK Y HEAD
Informacion.ptrStack = 0;
Informacion.ptrHeap = 0;
