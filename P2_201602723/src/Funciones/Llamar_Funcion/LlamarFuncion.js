"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
const Informacion_1 = require("../../Datos/Informacion");
const String_1 = require("../../Objectos/String");
class LlamarFuncion extends nodoAst_1.nodoAst {
    constructor(id, parametros, line, col) {
        super(line, col);
        this.contador = 0;
        this.id = id;
        this.parametros = parametros;
        this.listaTemporales = [];
        this.listParametros = [];
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        if (this.parametros == null)
            resultado = this.LlamadaSinParametros(e);
        else
            resultado = this.LlamadaConParametros(e);
        return resultado;
    }
    LlamadaSinParametros(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let nombre = this.id + "_funcion";
        if (!e.Existe(nombre)) {
            Informacion_1.Informacion.ErrSemantico("No existe ningun metodo <" + nombre + ">, Revise parametros o el nombre", this.linea, this.columna);
            resultado.BorrarError();
            return resultado;
        }
        let datoFuncion = e.Get(nombre);
        resultado.Agregar_LineaCodigo("#======== CALL ========");
        // GUARDO LOS TERMINALES CREADOS
        let tem1 = resultado.Crear_Temporal();
        resultado.Agregar_CodigoNodo(this.GuardarTemporales(e, tem1));
        // CAMBIO ENTORNO (STACK)
        resultado.Agregar_LineaCodigo("P= P+" + (this.contador));
        // GUARDO PARAMETROS_RETURN
        let tem = resultado.Crear_Temporal();
        let valDefault = "";
        // PRIMERO VERIFICO SI ES UN STRING
        if ((datoFuncion === null || datoFuncion === void 0 ? void 0 : datoFuncion.tipo) == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING) {
            let defecto = String_1.String.GuardarDefault();
            valDefault = defecto.cabeza;
            resultado.Agregar_CodigoNodo(defecto);
        }
        else {
            valDefault = auxExpresion_1.auxExpresion.GetDefault(datoFuncion === null || datoFuncion === void 0 ? void 0 : datoFuncion.tipo);
        }
        // AGREGO AL NUEVO ENTORNO EL ESPACIO RESERVADO PARA EL RETORNO
        resultado.Agregar_LineaCodigo("Stack[P] = " + valDefault);
        // =============== CODIGO PARA LLAMAR A UNA FUNCION =============
        let id = nombre.split('_');
        resultado.Agregar_LineaCodigo("\tCall " + id[0]);
        // CABEZA DE REGRESO (ANALIZO STACK)
        resultado.Agregar_LineaCodigo("#======== RETORNO ========");
        let tem2 = resultado.Crear_Temporal();
        // OBTENGO EL VALOR DEL RETURN
        resultado.Agregar_LineaCodigo(tem2 + "= Stack[P]");
        resultado.EstablecerCabeza(tem2, datoFuncion === null || datoFuncion === void 0 ? void 0 : datoFuncion.tipo);
        // REGRESO AL ENTORNO (STACK)
        resultado.Agregar_LineaCodigo("P= P-" + (this.contador));
        // VUELVO LOS VALORES ORIGINALES DE LOS TEMPORALES
        resultado.Agregar_CodigoNodo(this.ObtenerTemporales(e, tem1));
        return resultado;
    }
    LlamadaConParametros(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // COMPILO LOS PARAMETROS
        if (this.parametros != null) {
            for (let param of this.parametros) {
                let aux = param.Ejecutar(e);
                if (aux.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
                    return aux;
                this.listParametros.push(aux);
            }
        }
        let nombre = this.ObtenerNombreFuncion();
        if (!e.Existe(nombre)) {
            Informacion_1.Informacion.ErrSemantico("No existe ningun metodo <" + nombre + ">, Revise parametros o el nombre", this.linea, this.columna);
            resultado.BorrarError();
            return resultado;
        }
        let datoFuncion = e.Get(nombre);
        resultado.Agregar_LineaCodigo("#======== CALL ========");
        // GUARDO LOS TERMINALES CREADOS
        let tem1 = resultado.Crear_Temporal();
        resultado.Agregar_CodigoNodo(this.GuardarTemporales(e, tem1));
        // AGREGO EL CODIGO DE LOS PARAMETROS
        for (let param of this.listParametros)
            resultado.Agregar_CodigoNodo(param);
        // CAMBIO ENTORNO (STACK)
        resultado.Agregar_LineaCodigo("P= P+" + (this.contador));
        // GUARDO PARAMETROS_RETURN
        let relativa = 0;
        let temP = resultado.Crear_Temporal();
        for (let param of this.listParametros) {
            //resultado.Agregar_CodigoNodo(param);
            if (relativa == 0) {
                resultado.Agregar_LineaCodigo("Stack[P]= " + param.cabeza);
            }
            else {
                resultado.Agregar_LineaCodigo(temP + "= P+" + relativa);
                resultado.Agregar_LineaCodigo("Stack[" + temP + "]= " + param.cabeza);
            }
            relativa++;
        }
        let tem = resultado.Crear_Temporal();
        let valDefault = "";
        // PRIMERO VERIFICO SI ES UN STRING
        if ((datoFuncion === null || datoFuncion === void 0 ? void 0 : datoFuncion.tipo) == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.STRING) {
            let defecto = String_1.String.GuardarDefault();
            valDefault = defecto.cabeza;
            resultado.Agregar_CodigoNodo(defecto);
        }
        else {
            valDefault = auxExpresion_1.auxExpresion.GetDefault(datoFuncion === null || datoFuncion === void 0 ? void 0 : datoFuncion.tipo);
        }
        // AGREGO AL NUEVO ENTORNO EL ESPACIO RESERVADO PARA EL RETORNO
        resultado.Agregar_LineaCodigo(temP + "= P+" + relativa);
        resultado.Agregar_LineaCodigo("Stack[" + temP + "]= " + valDefault);
        // =============== CODIGO PARA LLAMAR A UNA FUNCION =============
        let id = nombre.split('_');
        resultado.Agregar_LineaCodigo("\tCall " + id[0]);
        // CABEZA DE REGRESO (ANALIZO STACK)
        resultado.Agregar_LineaCodigo("#======== RETORNO ========");
        let tem2 = resultado.Crear_Temporal();
        // OBTENGO EL VALOR DEL RETURN
        resultado.Agregar_LineaCodigo(tem2 + "= Stack[" + temP + "]");
        resultado.EstablecerCabeza(tem2, datoFuncion === null || datoFuncion === void 0 ? void 0 : datoFuncion.tipo);
        // REGRESO AL ENTORNO (STACK)
        resultado.Agregar_LineaCodigo("P= P-" + (this.contador));
        // VUELVO LOS VALORES ORIGINALES DE LOS TEMPORALES
        resultado.Agregar_CodigoNodo(this.ObtenerTemporales(e, tem1));
        return resultado;
    }
    SetTemporales(temporales) {
        this.listaTemporales = temporales;
    }
    GuardarTemporales(e, tem1) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        this.contador = e.contador;
        for (let tem of this.listaTemporales) {
            resultado.Agregar_LineaCodigo(tem1 + "= P+" + this.contador++);
            resultado.Agregar_LineaCodigo("Stack[" + tem1 + "]= " + tem);
        }
        return resultado;
    }
    ObtenerTemporales(e, tem1) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        this.contador = e.contador;
        //let tem1 = resultado.Crear_Temporal();
        for (let tem of this.listaTemporales) {
            resultado.Agregar_LineaCodigo(tem1 + "= P+" + this.contador++);
            resultado.Agregar_LineaCodigo(tem + "= Stack[" + tem1 + "]");
        }
        return resultado;
    }
    ObtenerNombreFuncion() {
        let nombre = this.id;
        for (let param of this.listParametros)
            nombre += "_" + auxExpresion_1.auxExpresion.GetTipoString(param.tipo);
        return nombre;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "LlamarFuncion";
        let nombre = new nodoGrafica_1.nodoGrafica();
        nombre.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica(cabeza, nombre, null);
        if (this.parametros != null) {
            for (let param of this.parametros)
                resultado.Armar_NodoGrafica(cabeza, param.Graficar(), null);
        }
        return resultado;
    }
}
exports.LlamarFuncion = LlamarFuncion;
