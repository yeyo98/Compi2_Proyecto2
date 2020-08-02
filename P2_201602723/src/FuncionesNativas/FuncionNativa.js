"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const Informacion_1 = require("../Datos/Informacion");
const Valor_1 = require("../Expresion/Valor");
const LlamarFuncion_1 = require("../Funciones/Llamar_Funcion/LlamarFuncion");
class FuncionNativa extends nodoAst_1.nodoAst {
    constructor(anterior, variable, funcion, tipo, line, col) {
        super(line, col);
        this.anterior = anterior;
        this.variable = variable;
        this.funcion = funcion;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        var _a;
        let resultado = new nodoCodigo_1.nodoCodigo();
        if (this.tipo) { // HOJA
            let variable = new Valor_1.Valor(this.variable, auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ID, this.linea, this.columna);
            let auxCodigo = variable.Ejecutar(e);
            if (auxCodigo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return auxCodigo;
            //resultado.Agregar_CodigoNodo(auxCodigo);
            auxCodigo.EliminarTemporales();
            if (auxCodigo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING) {
                resultado = this.MetodosString(e, variable);
            }
            else { // ESTE CASO SERIA PARA ANALIZAR ALGUN ARREGLO
            }
        }
        else if (this.anterior != null) { // EN CADENA
            let auxCodigo = (_a = this.anterior) === null || _a === void 0 ? void 0 : _a.Ejecutar(e);
            if (auxCodigo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return auxCodigo;
            auxCodigo.EliminarTemporales();
            if (auxCodigo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING) {
                resultado = this.MetodosString(e, this.anterior);
            }
            else { // ESTE CASO SERIA PARA ANALIZAR ALGUN ARREGLO
            }
        }
        return resultado;
    }
    MetodosString(e, variable) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        switch (this.funcion.nombre.toLowerCase()) {
            case "tochararray": {
                break;
            }
            case "length": {
                let param = [];
                param.push(variable);
                let aux = new LlamarFuncion_1.LlamarFuncion("length", param, this.linea, this.columna);
                resultado = aux.Ejecutar(e);
                break;
            }
            case "touppercase": {
                let param = [];
                param.push(variable);
                let aux = new LlamarFuncion_1.LlamarFuncion("touppercase", param, this.linea, this.columna);
                resultado = aux.Ejecutar(e);
                break;
            }
            case "tolowercase": {
                let param = [];
                param.push(variable);
                let aux = new LlamarFuncion_1.LlamarFuncion("tolowercase", param, this.linea, this.columna);
                resultado = aux.Ejecutar(e);
                break;
            }
            case "charat": {
                if (this.funcion.parametro != null) {
                    let param = [];
                    param.push(variable);
                    param.push(this.funcion.parametro);
                    let aux = new LlamarFuncion_1.LlamarFuncion("charat", param, this.linea, this.columna);
                    resultado = aux.Ejecutar(e);
                }
                else {
                    Informacion_1.Informacion.ErrSemantico("La funcion CharAt necesita una parametro numerico", this.linea, this.columna);
                    resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                    return resultado;
                }
                break;
            }
        }
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "FuncionNativa";
        if (this.tipo) {
            let nombre = new nodoGrafica_1.nodoGrafica();
            nombre.Crear_NodoInicial(this.variable);
            resultado.Armar_NodoGrafica(this.funcion.nombre, nombre, null);
        }
        else {
            let aux = new nodoGrafica_1.nodoGrafica();
            aux.Crear_NodoInicial(this.funcion.nombre);
            if (this.anterior != null)
                resultado.Armar_NodoGrafica(cabeza, this.anterior.Graficar(), aux);
        }
        return resultado;
    }
}
exports.FuncionNativa = FuncionNativa;
//# sourceMappingURL=FuncionNativa.js.map