"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const Informacion_1 = require("../../Datos/Informacion");
class SumaResta {
    constructor(line, col) { this.line = line, this.col = col; }
    Optimizar(id, op1, op2, tipo) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        const signo = (tipo) ? '+' : '-';
        const operacion = id + "=" + op1 + signo + op2;
        // SI ES CERO COMIENZO APLICAR ALGUNA REGLA
        if (op2 === '0') {
            //AHORA ANALIZO SI ID Y OP1 SON IGUALES
            if (id === op1) {
                const aux = (tipo) ? 8 : 9;
                Informacion_1.Informacion.AddOptimizacion(operacion, "Eliminado", this.line, this.col, aux);
                return resultado;
            }
            else {
                const aux = (tipo) ? 12 : 13;
                resultado.Agregar_LineaCodigo(id + "=" + op1);
                Informacion_1.Informacion.AddOptimizacion(operacion, id + "=" + op1, this.line, this.col, aux);
            }
        }
        else if (op1 === '0') {
            //AHORA ANALIZO SI ID Y OP1 SON IGUALES
            if (id === op2) {
                const aux = (tipo) ? 8 : 9;
                Informacion_1.Informacion.AddOptimizacion(operacion, "Eliminado", this.line, this.col, aux);
                return resultado;
            }
            else {
                const aux = (tipo) ? 12 : 13;
                resultado.Agregar_LineaCodigo(id + "=" + op2);
                Informacion_1.Informacion.AddOptimizacion(operacion, id + "=" + op2, this.line, this.col, aux);
            }
        }
        else {
            resultado.Agregar_LineaCodigo(operacion);
        }
        return resultado;
    }
}
exports.SumaResta = SumaResta;
//# sourceMappingURL=SumaResta.js.map