"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
const Informacion_1 = require("../../Datos/Informacion");
const Casting_1 = require("../../Expresion/Casteo/Casting");
class Sentencia_Transferencia extends nodoAst_1.nodoAst {
    constructor(tipo, valor, line, col) {
        super(line, col);
        this.tipo = tipo;
        this.valor = valor;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        switch (this.tipo) {
            case 1: {
                resultado = this.EjecutarBreak(e);
                break;
            }
            case 2: {
                resultado = this.EjecutarContinue(e);
                break;
            }
            case 3: {
                resultado = this.EjecutarReturn1(e);
                break;
            }
            case 4: {
                resultado = this.EjecutarReturn2(e);
                break;
            }
        }
        return resultado;
    }
    EjecutarBreak(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // EMPIEZO A BUSCAR ALGUN ENTORNO PERMITICOS
        let aux = "";
        // SWITCH
        aux = e.Existe_Entorno("case");
        if (aux !== "-1") {
            return this.ArmarSalto(aux);
        }
        // WHILE
        aux = e.Existe_Entorno("while");
        if (aux !== "-1") {
            return this.ArmarSalto(aux);
        }
        // DOWHILE
        aux = e.Existe_Entorno("dowhile");
        if (aux !== "-1") {
            return this.ArmarSalto(aux);
        }
        // FOR
        aux = e.Existe_Entorno("for");
        if (aux !== "-1") {
            return this.ArmarSalto(aux);
        }
        // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
        Informacion_1.Informacion.ErrSemantico("No existe ningun entorno Switch o Ciclo para BREAK", this.linea, this.columna);
        resultado.BorrarError();
        return resultado;
    }
    EjecutarContinue(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // EMPIEZO A BUSCAR ALGUN ENTORNO PERMITICOS
        let aux = "";
        // WHILE
        aux = e.Existe_Continue("while");
        if (aux !== "-1") {
            return this.ArmarSalto(aux);
        }
        // DOWHILE
        aux = e.Existe_Continue("dowhile");
        if (aux !== "-1") {
            return this.ArmarSalto(aux);
        }
        // FOR
        aux = e.Existe_Continue("for");
        if (aux !== "-1") {
            return this.ArmarSalto(aux);
        }
        // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
        Informacion_1.Informacion.ErrSemantico("No existe ningun entorno Ciclo para CONTINUE", this.linea, this.columna);
        resultado.BorrarError();
        return resultado;
    }
    EjecutarReturn1(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let aux = e.Existe_Entorno("funcion");
        if (aux != "-1")
            return this.ArmarSalto(aux);
        // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
        Informacion_1.Informacion.ErrSemantico("No existe ningun entorno Funcion para Return", this.linea, this.columna);
        resultado.BorrarError();
        return resultado;
    }
    EjecutarReturn2(e) {
        var _a;
        let resultado = new nodoCodigo_1.nodoCodigo();
        let etq = e.Existe_Entorno("funcion");
        if (etq == "-1") {
            // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
            Informacion_1.Informacion.ErrSemantico("No existe ningun entorno Funcion para Return", this.linea, this.columna);
            resultado.BorrarError();
            return resultado;
        }
        let datos = e.Get("return");
        let valor = (_a = this.valor) === null || _a === void 0 ? void 0 : _a.Ejecutar(e);
        // VERIFICO QUE NO HAYA ALGUN ERROR
        if ((valor === null || valor === void 0 ? void 0 : valor.tipo) == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR) {
            return valor;
        }
        // COMPRUEBO TIPOS
        if ((datos === null || datos === void 0 ? void 0 : datos.tipo) != (valor === null || valor === void 0 ? void 0 : valor.tipo) && valor != null) {
            valor = Casting_1.Casting.CasteoImplicito(datos === null || datos === void 0 ? void 0 : datos.tipo, valor);
            if (valor.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR) {
                Informacion_1.Informacion.ErrSemantico("El tipo de return no coincide con el de la Funcion", this.linea, this.columna);
                resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                return resultado;
            }
        }
        // SI TODO ESTA BIEN, AGREGO EL RETURN EN LA PILA
        const tem = resultado.Crear_Temporal();
        if (valor != null)
            resultado.Agregar_CodigoNodo(valor);
        resultado.Agregar_LineaCodigo(tem + "= P+" + (datos === null || datos === void 0 ? void 0 : datos.posRelativa));
        resultado.Agregar_LineaCodigo("Stack[" + tem + "]= " + (valor === null || valor === void 0 ? void 0 : valor.cabeza));
        resultado.Agregar_CodigoNodo(this.ArmarSalto(etq));
        return resultado;
    }
    ArmarSalto(etq) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        resultado.Agregar_LineaCodigo("goto " + etq);
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        switch (this.tipo) {
            case 1: {
                resultado.Crear_NodoInicial("Break");
                break;
            }
            case 2: {
                resultado.Crear_NodoInicial("Continue");
                break;
            }
            case 3: {
                resultado.Crear_NodoInicial("Return");
                break;
            }
            case 4: {
                if (this.valor != null)
                    resultado.Armar_NodoGrafica("Return", this.valor.Graficar(), null);
                break;
            }
        }
        return resultado;
    }
}
exports.Sentencia_Transferencia = Sentencia_Transferencia;
//# sourceMappingURL=Sentencia_Transferencia.js.map