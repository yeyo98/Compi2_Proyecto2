"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auxExpresion_1 = require("../Expresion/auxExpresion");
const Informacion_1 = require("../Datos/Informacion");
class nodoCodigo {
    constructor() {
        this.listaTemporal = [];
        this.linea_Codigo = [];
        this.cabeza = "";
        this.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.VOID;
    }
    EstablecerCabeza(cabeza, tipo) {
        this.cabeza = cabeza;
        this.tipo = tipo;
    }
    Crear_Temporal() {
        let tem = "t" + Informacion_1.Informacion.contTemporal++;
        this.listaTemporal.push(tem);
        return tem;
    }
    Crear_Etiqueta() {
        return "L" + Informacion_1.Informacion.contEtiqueta++;
    }
    Agregar_CodigoNodo(nodo) {
        for (let temp of nodo.listaTemporal)
            this.listaTemporal.push(temp);
        for (let linea of nodo.linea_Codigo)
            this.linea_Codigo.push(linea);
    }
    Agregar_Codigo2(nodo1, nodo2) {
        for (let temp of nodo1.listaTemporal)
            this.listaTemporal.push(temp);
        for (let linea of nodo1.linea_Codigo)
            this.linea_Codigo.push(linea);
        if (nodo2 != null) {
            for (let temp of nodo2.listaTemporal)
                this.listaTemporal.push(temp);
            for (let linea of nodo2.linea_Codigo)
                this.linea_Codigo.push(linea);
        }
    }
    Agregar_LineaCodigo(linea) {
        this.linea_Codigo.push(linea);
    }
    EliminarTemporales() {
        while (this.listaTemporal.length != 0) {
            this.listaTemporal.pop();
            Informacion_1.Informacion.contTemporal--;
        }
    }
    BorrarError() {
        this.listaTemporal = [];
        this.linea_Codigo = [];
        this.cabeza = "";
        this.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
    }
}
exports.nodoCodigo = nodoCodigo;
