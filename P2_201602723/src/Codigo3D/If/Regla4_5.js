"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const Exp_1 = require("../../Expresion/Exp");
const AsigOperacion_1 = require("../Operacion/AsigOperacion");
const Goto_1 = require("../Goto/Goto");
const Informacion_1 = require("../../Datos/Informacion");
class Regla4_5 {
    constructor(cont, lista, line, col) {
        this.listaInstrucciones = lista;
        this.cont = cont;
        this.line = line;
        this.col = col;
    }
    Optimizar(op1, op2, operador, id) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        const condicion = this.Operar(op1, op2, operador);
        const codigo = "if(" + op1 + AsigOperacion_1.AsigOperacion.Simbolo(operador) + op2 + ") goto " + id;
        if (condicion) { // APLICO LA REGLA 4
            //VERIFICO SI EL SIGUIENTE ES UN GOTO
            const elemento = this.listaInstrucciones[this.cont];
            const optimizado = "goto " + id;
            if (elemento instanceof Goto_1.Goto) {
                this.cont++;
                resultado.Agregar_LineaCodigo(optimizado);
                Informacion_1.Informacion.AddOptimizacion(codigo + " goto " + elemento.etiqueta, optimizado, this.line, this.col, 4);
                return resultado;
            }
            resultado.Agregar_LineaCodigo(optimizado);
            Informacion_1.Informacion.AddOptimizacion(codigo, optimizado, this.line, this.col, 4);
        }
        else { // APLICO LA REGLA 5
            const elemento = this.listaInstrucciones[this.cont];
            if (elemento instanceof Goto_1.Goto) {
                this.cont++;
                const optimizado = "goto " + elemento.etiqueta;
                resultado.Agregar_LineaCodigo(optimizado);
                Informacion_1.Informacion.AddOptimizacion(codigo + " goto " + elemento.etiqueta, optimizado, this.line, this.col, 5);
                return resultado;
            }
            Informacion_1.Informacion.AddOptimizacion(codigo, "Eliminado", this.line, this.col, 5);
        }
        return resultado;
    }
    Operar(op1, op2, operador) {
        let resultado = false;
        switch (operador) {
            case Exp_1.Exp.OPERACION.menor_igual: {
                resultado = parseInt(op1) <= parseInt(op2);
                break;
            }
            case Exp_1.Exp.OPERACION.mayor_igual: {
                resultado = parseInt(op1) >= parseInt(op2);
                break;
            }
            case Exp_1.Exp.OPERACION.menor: {
                resultado = parseInt(op1) < parseInt(op2);
                break;
            }
            case Exp_1.Exp.OPERACION.mayor: {
                resultado = parseInt(op1) > parseInt(op2);
                break;
            }
            case Exp_1.Exp.OPERACION.igualacion: {
                resultado = parseInt(op1) == parseInt(op2);
                break;
            }
            case Exp_1.Exp.OPERACION.diferencia: {
                resultado = parseInt(op1) != parseInt(op2);
                break;
            }
        }
        return resultado;
    }
}
exports.Regla4_5 = Regla4_5;
//# sourceMappingURL=Regla4_5.js.map