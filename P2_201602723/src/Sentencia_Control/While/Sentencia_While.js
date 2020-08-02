"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Entorno_1 = require("../../Datos/Entorno/Entorno");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
const Informacion_1 = require("../../Datos/Informacion");
class Sentencia_While extends nodoAst_1.nodoAst {
    constructor(cond, cuerpo, line, col) {
        super(line, col);
        this.cond = cond;
        this.cuerpo = cuerpo;
    }
    Ejecutar(e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();
        const condicion = this.cond.Ejecutar(e);
        // VERIFICO QUE NO HAYA ERROR
        if (condicion.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return condicion;
        // VERIFICO QUE VENGA UN BOOLEANO
        if (condicion.tipo != auxExpresion_1.auxExpresion.COMBINACION_TIPOS.BOOL) {
            Informacion_1.Informacion.ErrSemantico("Se necesita un valor Booleano en la condicion del While", this.cond.linea, this.cond.columna);
            resultado.BorrarError();
            return resultado;
        }
        // ================= CREO UN NUEVO ENTORNO =================
        let nuevoEntorno = new Entorno_1.Entorno("while", e, e.contador);
        nuevoEntorno.GuardarEtiqueta(etq3);
        nuevoEntorno.GuardarContinue(etq1);
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // VERIFICO QUE NO HAYA ERROR
        if (cuerpo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        // CONSTRUYO EL CODIGO
        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA WHILE ===========");
        resultado.Agregar_LineaCodigo(etq1 + ":");
        resultado.Agregar_CodigoNodo(condicion);
        resultado.Agregar_LineaCodigo("if(" + condicion.cabeza + "== 1) goto " + etq2);
        resultado.Agregar_LineaCodigo("goto " + etq3);
        resultado.Agregar_LineaCodigo(etq2 + ":");
        resultado.Agregar_CodigoNodo(cuerpo);
        resultado.Agregar_LineaCodigo("goto " + etq1);
        resultado.Agregar_LineaCodigo(etq3 + ":");
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "While";
        // GRAFICO LA CONDICION
        const condicion = this.cond.Graficar();
        // GRAFICO EL CUERPO
        const cuerpo = this.cuerpo.Graficar();
        resultado.Armar_NodoGrafica(cabeza, condicion, cuerpo);
        return resultado;
    }
}
exports.Sentencia_While = Sentencia_While;
//# sourceMappingURL=Sentencia_While.js.map