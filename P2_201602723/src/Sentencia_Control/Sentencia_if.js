"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const Entorno_1 = require("../Datos/Entorno/Entorno");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const Informacion_1 = require("../Datos/Informacion");
class Sentencia_if extends nodoAst_1.nodoAst {
    constructor(condicion, cuerpo, continuar, tipo, line, col) {
        super(line, col);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.continuar = continuar;
        this.tipo = tipo;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // OPTENGO EL CODIGO DE LA CONDICION
        let cond = this.condicion.Ejecutar(e);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if (cond.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cond;
        // SI NO ES UN BOOLEANO ERROR
        if (cond.tipo != auxExpresion_1.auxExpresion.COMBINACION_TIPOS.BOOL) {
            // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
            Informacion_1.Informacion.ErrSemantico("Para la sentencia if se necesita un valor Booleano", this.linea, this.columna);
            cond.BorrarError();
            return cond;
        }
        switch (this.tipo) {
            case 1: {
                resultado = this.CodigoIf(cond, e);
                break;
            }
            case 2: {
                resultado = this.CodigoIfElse(cond, e);
                break;
            }
            case 3: {
                resultado = this.CodigoIfIfElse(cond, e);
                break;
            }
        }
        return resultado;
    }
    CodigoIf(cond, e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // CREO EL NUEVO ENTORNO PARA EL CUERPO DEL IF
        let nuevoEntorno = new Entorno_1.Entorno("if", e, e.contador);
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if (cuerpo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        // SI TODO SALIO BIEN COMIENZO ARMAR EL IF
        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA IF =========== ");
        resultado.Agregar_CodigoNodo(cond);
        resultado.Agregar_LineaCodigo("if(" + cond.cabeza + "==1) goto " + etq1);
        resultado.Agregar_LineaCodigo("goto " + etq2);
        resultado.Agregar_LineaCodigo(etq1 + ":");
        resultado.Agregar_CodigoNodo(cuerpo);
        resultado.Agregar_LineaCodigo(etq2 + ":");
        return resultado;
    }
    CodigoIfElse(cond, e) {
        var _a;
        let resultado = new nodoCodigo_1.nodoCodigo();
        // CREO EL NUEVO ENTORNO PARA EL CUERPO DEL IF
        let nuevoEntorno = new Entorno_1.Entorno("if", e, e.contador);
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if (cuerpo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        let cuerpoElse = (_a = this.continuar) === null || _a === void 0 ? void 0 : _a.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if ((cuerpoElse === null || cuerpoElse === void 0 ? void 0 : cuerpoElse.tipo) == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpoElse;
        // SI TODO SALIO BIEN COMIENZO ARMAR EL IF
        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();
        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA IF =========== ");
        resultado.Agregar_CodigoNodo(cond);
        resultado.Agregar_LineaCodigo("if(" + cond.cabeza + "==1) goto " + etq1);
        resultado.Agregar_LineaCodigo("goto " + etq2);
        resultado.Agregar_LineaCodigo(etq1 + ":");
        resultado.Agregar_CodigoNodo(cuerpo);
        resultado.Agregar_LineaCodigo("goto " + etq3);
        resultado.Agregar_LineaCodigo(etq2 + ":");
        if (cuerpoElse != null)
            resultado.Agregar_CodigoNodo(cuerpoElse);
        resultado.Agregar_LineaCodigo(etq3 + ":");
        return resultado;
    }
    CodigoIfIfElse(cond, e) {
        var _a;
        let resultado = new nodoCodigo_1.nodoCodigo();
        // CREO EL NUEVO ENTORNO PARA EL CUERPO DEL IF
        let nuevoEntorno = new Entorno_1.Entorno("if", e, e.contador);
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if (cuerpo.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        let cuerpoElse = (_a = this.continuar) === null || _a === void 0 ? void 0 : _a.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if ((cuerpoElse === null || cuerpoElse === void 0 ? void 0 : cuerpoElse.tipo) == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpoElse;
        // SI TODO SALIO BIEN COMIENZO ARMAR EL IF
        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();
        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA IF =========== ");
        resultado.Agregar_CodigoNodo(cond);
        resultado.Agregar_LineaCodigo("if(" + cond.cabeza + "==1) goto " + etq1);
        resultado.Agregar_LineaCodigo("goto " + etq2);
        resultado.Agregar_LineaCodigo(etq1 + ":");
        resultado.Agregar_CodigoNodo(cuerpo);
        resultado.Agregar_LineaCodigo("goto " + etq3);
        resultado.Agregar_LineaCodigo(etq2 + ":");
        if (cuerpoElse != null)
            resultado.Agregar_CodigoNodo(cuerpoElse);
        resultado.Agregar_LineaCodigo(etq3 + ":");
        return resultado;
    }
    Graficar() {
        const resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Sentencia_If";
        //resultado.Crear_NodoInicial("Sentencia_If")
        // OBTENGO NODO CONDICION
        let cond = this.condicion.Graficar();
        // OBTENGO NODO CUERPO
        let cuerpo = this.cuerpo.Graficar();
        resultado.Armar_NodoGrafica(cabeza, cond, cuerpo);
        if (this.continuar != null) {
            // OBTENGO NODO SIGUIENTE
            let sig = this.continuar.Graficar();
            resultado.Armar_NodoGrafica(cabeza, sig, null);
        }
        return resultado;
    }
}
exports.Sentencia_if = Sentencia_if;
//# sourceMappingURL=Sentencia_if.js.map