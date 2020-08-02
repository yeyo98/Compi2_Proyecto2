"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
class Sentencia_Switch extends nodoAst_1.nodoAst {
    constructor(cond, lCase, line, col) {
        super(line, col);
        this.cond = cond;
        this.LCase = lCase;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // EVALUO LA CONDICION
        let condicion = this.cond.Ejecutar(e);
        // SI HUBO UN ERROR SOLO SUBO EL NODO
        if (condicion.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return condicion;
        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA SWITCH =========== ");
        resultado.Agregar_CodigoNodo(condicion);
        const etqSalida = resultado.Crear_Etiqueta();
        for (let caso of this.LCase) {
            // LIMPIO LAS LISTAS PARA QUE YA NO SE REPITAN Y ME QUEDE SOLO CON LO QUE ME INTERESA
            condicion.listaTemporal = [];
            condicion.linea_Codigo = [];
            // ENVIO LA CONDICION
            caso.EnviarCondicion(condicion);
            caso.EnviarEtiqueta(etqSalida);
            // EJECUTO
            let cuerpoCaso = caso.Ejecutar(e);
            // EVALUO SI HUBO ALGUN ERROR
            if (cuerpoCaso.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return cuerpoCaso;
            resultado.Agregar_CodigoNodo(cuerpoCaso);
        }
        resultado.Agregar_LineaCodigo(etqSalida + ":");
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Case";
        // OBTENGO LA GRAFICA DE LA CONDICION
        const cond = this.cond.Graficar();
        resultado.Armar_NodoGrafica(cabeza, cond, null);
        for (let caso of this.LCase) {
            resultado.Armar_NodoGrafica(cabeza, caso.Graficar(), null);
        }
        return resultado;
    }
}
exports.Sentencia_Switch = Sentencia_Switch;
//# sourceMappingURL=Sentencia_Switch.js.map