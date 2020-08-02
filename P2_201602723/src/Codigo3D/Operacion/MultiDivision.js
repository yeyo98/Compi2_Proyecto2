"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const Informacion_1 = require("../../Datos/Informacion");
class MultiDivision {
    constructor(line, col) { this.line = line, this.col = col; }
    OptimizarMulti(id, op1, op2) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        const operacion = id + "=" + op1 + "*" + op2;
        if (op2 === '0' || op1 === '0') {
            let nuevo = id + "=0";
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion_1.Informacion.AddOptimizacion(operacion, nuevo, this.line, this.col, 17);
        }
        else if (op2 === '1') {
            if (id === op1) {
                Informacion_1.Informacion.AddOptimizacion(operacion, "Eliminado", this.line, this.col, 10);
                return resultado;
            }
            else {
                resultado.Agregar_LineaCodigo(id + "=" + op1);
                Informacion_1.Informacion.AddOptimizacion(operacion, id + "=" + op1, this.line, this.col, 14);
            }
        }
        else if (op1 === '1') {
            if (id === op2) {
                Informacion_1.Informacion.AddOptimizacion(operacion, "Eliminado", this.line, this.col, 10);
                return resultado;
            }
            else {
                resultado.Agregar_LineaCodigo(id + "=" + op2);
                Informacion_1.Informacion.AddOptimizacion(operacion, id + "=" + op2, this.line, this.col, 14);
            }
        }
        else if (op2 === '2') {
            let nuevo = id + "=" + op1 + "+" + op1;
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion_1.Informacion.AddOptimizacion(operacion, nuevo, this.line, this.col, 16);
        }
        else if (op1 === '2') {
            let nuevo = id + "=" + op2 + "+" + op2;
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion_1.Informacion.AddOptimizacion(operacion, nuevo, this.line, this.col, 16);
        }
        else {
            resultado.Agregar_LineaCodigo(operacion);
        }
        return resultado;
    }
    OptimizarDivi(id, op1, op2) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        const operacion = id + "=" + op1 + "/" + op2;
        if (op1 === '0') {
            let nuevo = id + "=0";
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion_1.Informacion.AddOptimizacion(operacion, nuevo, this.line, this.col, 18);
        }
        else if (op2 === '1') {
            if (id === op1) {
                Informacion_1.Informacion.AddOptimizacion(operacion, "Eliminado", this.line, this.col, 11);
                return resultado;
            }
            else {
                resultado.Agregar_LineaCodigo(id + "=" + op1);
                Informacion_1.Informacion.AddOptimizacion(operacion, id + "=" + op1, this.line, this.col, 15);
            }
        }
        else {
            resultado.Agregar_LineaCodigo(operacion);
        }
        return resultado;
    }
}
exports.MultiDivision = MultiDivision;
//# sourceMappingURL=MultiDivision.js.map