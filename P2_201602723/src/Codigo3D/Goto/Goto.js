"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../../Arbol/nodoAst");
const nodoCodigo_1 = require("../../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../../Arbol/nodoGrafica");
const Entorno_1 = require("../../Datos/Entorno/Entorno");
const Etiqueta_1 = require("../Etiqueta/Etiqueta");
const If_1 = require("../If/If");
const Asignacion_1 = require("../Operacion/Asignacion");
const Informacion_1 = require("../../Datos/Informacion");
class Goto extends nodoAst_1.nodoAst {
    constructor(id, line, col) {
        super(line, col);
        this.etiqueta = id;
        this.listaInstrucciones = [];
        this.cont = 0;
    }
    Ejecutar(e) {
        return this.Regla2_6();
    }
    Regla2_6() {
        let resultado = new nodoCodigo_1.nodoCodigo();
        let codigoOriginal = "goto " + this.etiqueta;
        let flag = false;
        let auxcuerpo = new nodoCodigo_1.nodoCodigo();
        let e = new Entorno_1.Entorno("", null, 0);
        let auxcont = 0;
        this.cont++;
        for (auxcont = this.cont; auxcont < this.listaInstrucciones.length; auxcont++) {
            let instruccion = this.listaInstrucciones[auxcont];
            if (flag) {
                if (instruccion instanceof Goto) { // SI ES CIERTO ES REGLA 6
                    this.cont = auxcont;
                    let aux = instruccion.Ejecutar(e);
                    resultado.Agregar_CodigoNodo(aux);
                    resultado.Agregar_CodigoNodo(auxcuerpo);
                    resultado.Agregar_CodigoNodo(aux);
                    const optimizacion = "goto " + instruccion.etiqueta;
                    Informacion_1.Informacion.AddOptimizacion(codigoOriginal + "... " + this.etiqueta + ": " + optimizacion, optimizacion + "... " + this.etiqueta + ": " + optimizacion, this.linea, this.columna, 6);
                    return resultado;
                }
                else { // SI ES FALSO ES REGLA 2
                    auxcont--;
                    this.cont = auxcont;
                    let optimizacion = this.etiqueta + ":";
                    resultado.Agregar_LineaCodigo(optimizacion);
                    Informacion_1.Informacion.AddOptimizacion(codigoOriginal + "..." + optimizacion, optimizacion, this.linea, this.columna, 2);
                    return resultado;
                }
            }
            if (instruccion instanceof Etiqueta_1.Etiqueta) {
                let aux = instruccion.Ejecutar(e);
                if (this.etiqueta === aux.cabeza) { // SI SON IGUAL YA CUMPLE CON REGLA 2
                    flag = true;
                    auxcuerpo.Agregar_CodigoNodo(instruccion.Ejecutar(e));
                    continue;
                }
                else { // SI NO ME SALGO
                    break;
                }
            }
            else if (instruccion instanceof Goto) {
                auxcuerpo.Agregar_LineaCodigo(instruccion.SinOptimizar());
            }
            else if (instruccion instanceof If_1.If) {
                auxcuerpo.Agregar_LineaCodigo(instruccion.SinOptimizar());
            }
            else if (instruccion instanceof Asignacion_1.Asignacion) {
                auxcuerpo.Agregar_LineaCodigo(instruccion.SinOptimizar());
            }
            else {
                auxcuerpo.Agregar_CodigoNodo(instruccion.Ejecutar(e));
            }
            /* else if(instruccion instanceof Proc){
                break;
            } */
        }
        /* if(flag){// VERIFICAR UNA ULTIMA VEZ PARA REGLA 2
            auxcont--;
            this.cont = auxcont;
            let optimizacion = this.etiqueta+":";
            resultado.Agregar_LineaCodigo(optimizacion);
            Informacion.AddOptimizacion(
            codigoOriginal+"..."+optimizacion, optimizacion,this.linea,this.columna,2);
            return resultado;
        } */
        resultado.Agregar_LineaCodigo(codigoOriginal);
        this.cont--;
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const aux = new nodoGrafica_1.nodoGrafica();
        aux.Crear_NodoInicial(this.etiqueta);
        resultado.Armar_NodoGrafica("Goto", aux, null);
        return resultado;
    }
    PasarArbol(cont, lista) {
        this.cont = cont;
        this.listaInstrucciones = lista;
    }
    SinOptimizar() {
        return "goto " + this.etiqueta;
    }
}
exports.Goto = Goto;
//# sourceMappingURL=Goto.js.map