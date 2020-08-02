"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Entorno_1 = require("../../Datos/Entorno/Entorno");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
const Relacional_1 = require("../../Expresion/Relacional");
class Sentencia_Case extends nodoAst_1.nodoAst {
    constructor(caso, cuerpo, tipo, line, col) {
        super(line, col);
        this.etqSalto = "";
        this.caso = caso;
        this.cuerpo = cuerpo;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        /**
         * NOTA AQUI SE DA EL INTERCAMBIO DE ETIQUETAS
         *  ES PORQUE GUARDO CUERPO DESPUES, PERO SUS ETIQUETAS FUERON CREADAS MUCHO ANTES QUE LAS DEMAS
         */
        // ================= CREO UN NUEVO ENTORNO =================
        let nuevoEntorno = new Entorno_1.Entorno("case", e, e.contador);
        nuevoEntorno.GuardarEtiqueta(this.etqSalto);
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // EVALUO SI VIENE UN ERROR
        if (cuerpo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        // EVALUO QUE TIPO ES
        if (this.tipo)
            return this.EjecutarCaso(this.cabezaCond, cuerpo, nuevoEntorno);
        return cuerpo;
    }
    EjecutarCaso(cond, cuerpo, e) {
        const resultado = new nodoCodigo_1.nodoCodigo();
        const relacion = new Relacional_1.Relacional(this.linea, this.columna);
        if (cond != undefined && this.caso != null) {
            // EJECUTO EL VALOR DEL CASO
            let valorCaso = this.caso.Ejecutar(e);
            // ANALIZO QUE TODO HAYA IDO BIEN
            if (valorCaso.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                return valorCaso;
            // HAGO LA COMPARACION
            let aux = relacion.Traducir_Igualacion(cond, valorCaso);
            resultado.Agregar_LineaCodigo("#=========== CASE =========== ");
            // AGREGO EL CODIGO NECESARIO PARA LA COMPARACION
            //resultado.Agregar_Codigo2(valorCaso,aux);
            resultado.Agregar_CodigoNodo(aux);
            const etq1 = resultado.Crear_Etiqueta();
            const etq2 = resultado.Crear_Etiqueta();
            resultado.Agregar_LineaCodigo("if(" + aux.cabeza + "== 1) goto " + etq1);
            resultado.Agregar_LineaCodigo("goto " + etq2);
            resultado.Agregar_LineaCodigo(etq1 + ":");
            resultado.Agregar_CodigoNodo(cuerpo);
            resultado.Agregar_LineaCodigo(etq2 + ":");
        }
        return resultado;
    }
    EnviarCondicion(cond) {
        this.cabezaCond = cond;
    }
    EnviarEtiqueta(etq) {
        this.etqSalto = etq;
    }
    Graficar() {
        var _a;
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Case";
        // OBTENGO EL NODO DEL CUERPO
        let cuerpo = this.cuerpo.Graficar();
        // PARA GRAFICAR EL DEFAULT
        if (!this.tipo) {
            const defecto = new nodoGrafica_1.nodoGrafica();
            defecto.Crear_NodoInicial("Default");
            resultado.Armar_NodoGrafica(cabeza, defecto, cuerpo);
            return resultado;
        }
        const cond = (_a = this.caso) === null || _a === void 0 ? void 0 : _a.Graficar();
        if (cond != null)
            resultado.Armar_NodoGrafica(cabeza, cond, cuerpo);
        return resultado;
    }
}
exports.Sentencia_Case = Sentencia_Case;
//# sourceMappingURL=Sentencia_Case.js.map