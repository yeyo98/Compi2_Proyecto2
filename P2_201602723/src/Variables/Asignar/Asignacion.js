"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Entorno_1 = require("../../Datos/Entorno/Entorno");
const auxExpresion_1 = require("../../Expresion/auxExpresion");
const Informacion_1 = require("../../Datos/Informacion");
const Casting_1 = require("../../Expresion/Casteo/Casting");
class Asignacion extends nodoAst_1.nodoAst {
    constructor(id, valor, line, col) {
        super(line, col);
        this.id = id;
        this.valor = valor;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        // PRIMERO VERIFICO SI EXISTE LA VARIABLE
        if (!e.Existe(this.id)) {
            // SI NO EXISTE SUBO EL ERROR
            Informacion_1.Informacion.ErrSemantico("No existe una variable con este Nombre <" + this.id + ">", this.linea, this.columna);
            resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
            return resultado;
        }
        let variable = e.Get(this.id);
        // ANTES VERIFICO QUE NO SEA UNA CONSTANTE
        if ((variable === null || variable === void 0 ? void 0 : variable.rol) == Entorno_1.Entorno.ROL.VARIABLE_CONST) {
            Informacion_1.Informacion.ErrSemantico("No se puede modificar una variable Constante <" + this.id + ">", this.linea, this.columna);
            resultado.BorrarError();
            return resultado;
        }
        //================ OBTENGO EL NUEVO VALOR ================ 
        let valor = this.valor.Ejecutar(e);
        // ANALIZO SI HUBO ALGUN ERROR
        if (valor.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR)
            return valor;
        // AHORA VERIFICO QUE TENGAN EL MISMO TIPO
        if ((variable === null || variable === void 0 ? void 0 : variable.tipo) != valor.tipo) {
            /* SI NO SON IGUALES, TENDRIA QUE LLAMAR UN METODO DE CASTEO
                PARA VER SI AUN SE PUEDE
            */
            valor = Casting_1.Casting.CasteoImplicito(variable === null || variable === void 0 ? void 0 : variable.tipo, valor);
            if (valor.tipo == auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR) {
                Informacion_1.Informacion.ErrSemantico("El tipo de la Expresion no coincide con el tipo de la Variable", this.valor.linea, this.valor.columna);
                resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
                return resultado;
            }
        }
        resultado.Agregar_CodigoNodo(valor);
        resultado.Agregar_LineaCodigo("#=========== ASIGNACION ===========");
        // COMPRUEBO SI ES UNA VARIABLE GLOBAL PARA SACARLO DEL HEAP
        if ((variable === null || variable === void 0 ? void 0 : variable.rol) == Entorno_1.Entorno.ROL.VARIABLE_GLOBAL) {
            //============== CAMBIO EL VALOR ============== 
            resultado.Agregar_LineaCodigo("Heap[" + variable.posHeap + "]= " + valor.cabeza);
            //variable.posHeap
            return resultado;
        }
        if ((variable === null || variable === void 0 ? void 0 : variable.posRelativa) == 0) {
            resultado.Agregar_LineaCodigo("Stack[P]= " + valor.cabeza);
        }
        else {
            const tem1 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem1 + "= P+" + (variable === null || variable === void 0 ? void 0 : variable.posRelativa));
            resultado.Agregar_LineaCodigo("Stack[" + tem1 + "]= " + valor.cabeza);
        }
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        let id = new nodoGrafica_1.nodoGrafica();
        id.Crear_NodoInicial(this.id);
        let valor = this.valor.Graficar();
        resultado.Armar_NodoGrafica("Asignacion", id, valor);
        return resultado;
    }
}
exports.Asignacion = Asignacion;
