"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';
import { Relacional } from '../../Expresion/Relacional';
 */
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Exp_1 = require("../../Expresion/Exp");
const SumaResta_1 = require("./SumaResta");
const MultiDivision_1 = require("./MultiDivision");
class AsigOperacion extends nodoAst_1.nodoAst {
    constructor(id, op1, operador, op2, line, col) {
        super(line, col);
        this.id = id;
        this.op1 = op1;
        this.operador = operador;
        this.op2 = op2;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let suma_resta = new SumaResta_1.SumaResta(this.linea, this.columna);
        let mul_divi = new MultiDivision_1.MultiDivision(this.linea, this.columna);
        switch (this.operador) {
            case Exp_1.Exp.OPERACION.suma: {
                resultado = suma_resta.Optimizar(this.id, this.op1, this.op2, true);
                break;
            }
            case Exp_1.Exp.OPERACION.resta: {
                resultado = suma_resta.Optimizar(this.id, this.op1, this.op2, false);
                break;
            }
            case Exp_1.Exp.OPERACION.multi: {
                resultado = mul_divi.OptimizarMulti(this.id, this.op1, this.op2);
                break;
            }
            case Exp_1.Exp.OPERACION.division: {
                resultado = mul_divi.OptimizarDivi(this.id, this.op1, this.op2);
                break;
            }
            default: {
                resultado.Agregar_LineaCodigo(this.id + "=" + this.op1 + AsigOperacion.Simbolo(this.operador) + this.op2);
                break;
            }
        }
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Asig";
        let aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica(cabeza, aux, null);
        const operacion = new nodoGrafica_1.nodoGrafica();
        const sig = AsigOperacion.Simbolo(this.operador);
        aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.op1);
        operacion.Armar_NodoGrafica(sig, aux, null);
        aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.op2);
        operacion.Armar_NodoGrafica(sig, aux, null);
        resultado.Armar_NodoGrafica(cabeza, operacion, null);
        return resultado;
    }
    static Simbolo(tipo) {
        let resultado = "+";
        switch (tipo) {
            case Exp_1.Exp.OPERACION.igualacion: {
                resultado = "==";
                break;
            }
            case Exp_1.Exp.OPERACION.diferencia: {
                resultado = "<>";
                break;
            }
            case Exp_1.Exp.OPERACION.mayor: {
                resultado = ">";
                break;
            }
            case Exp_1.Exp.OPERACION.mayor_igual: {
                resultado = ">=";
                break;
            }
            case Exp_1.Exp.OPERACION.menor: {
                resultado = "<";
                break;
            }
            case Exp_1.Exp.OPERACION.menor_igual: {
                resultado = "<=";
                break;
            }
            case Exp_1.Exp.OPERACION.suma: {
                resultado = "+";
                break;
            }
            case Exp_1.Exp.OPERACION.resta: {
                resultado = "-";
                break;
            }
            case Exp_1.Exp.OPERACION.multi: {
                resultado = "*";
                break;
            }
            case Exp_1.Exp.OPERACION.division: {
                resultado = "/";
                break;
            }
            case Exp_1.Exp.OPERACION.modulo: {
                resultado = "%";
                break;
            }
        }
        return resultado;
    }
}
exports.AsigOperacion = AsigOperacion;
//# sourceMappingURL=AsigOperacion.js.map