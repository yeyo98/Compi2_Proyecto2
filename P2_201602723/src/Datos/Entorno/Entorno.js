"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datoEntorno_1 = require("./datoEntorno");
var ROL;
(function (ROL) {
    ROL[ROL["VARIABLE_LOCAL"] = 0] = "VARIABLE_LOCAL";
    ROL[ROL["VARIABLE_GLOBAL"] = 1] = "VARIABLE_GLOBAL";
    ROL[ROL["VARIABLE_CONST"] = 2] = "VARIABLE_CONST";
    ROL[ROL["FUNCION"] = 3] = "FUNCION";
})(ROL || (ROL = {}));
;
class Entorno {
    constructor(ambito, anterior, inicio) {
        this.tabla = new Map();
        this.ambito = ambito;
        this.anterior = anterior;
        this.tamanio = 0;
        this.contador = inicio;
        this.etqAmbito = "-1";
        this.etqContinue = "-1";
    }
    Agregar(llave, tipo, rol, tamanioVar) {
        let e;
        this.tamanio += tamanioVar;
        llave = llave.toLowerCase();
        for (e = this; e != null; e = e.anterior) {
            let encontrado = e.tabla.has(llave);
            if (!encontrado) {
                let contenido = new datoEntorno_1.datoEntorno(tipo, rol, this.contador++, tamanioVar);
                this.tabla.set(llave, contenido);
                return false;
            }
        }
        return true;
    }
    GuardarEtiqueta(etq) {
        this.etqAmbito = etq;
    }
    GuardarContinue(etq) {
        this.etqContinue = etq;
    }
    AgregarGlobal(llave, tipo, rol, posHeap, tamanioVar) {
        let e;
        this.tamanio += tamanioVar;
        llave = llave.toLowerCase();
        for (e = this; e != null; e = e.anterior) {
            if (e.anterior == null) {
                let encontrado = e.tabla.has(llave);
                if (!encontrado) {
                    let contenido = new datoEntorno_1.datoEntorno(tipo, rol, 0, tamanioVar);
                    contenido.GetPosHeap(posHeap);
                    e.tabla.set(llave, contenido);
                    return false;
                }
            }
        }
        return true;
    }
    AgregarFuncion(llave, tipo) {
        let e;
        //this.tamanio += tamanioVar;
        llave = llave.toLowerCase();
        for (e = this; e != null; e = e.anterior) {
            if (e.anterior == null) {
                let encontrado = e.tabla.has(llave);
                if (!encontrado) {
                    let contenido = new datoEntorno_1.datoEntorno(tipo, Entorno.ROL.FUNCION, -1, 1);
                    e.tabla.set(llave, contenido);
                    return false;
                }
            }
        }
        return true;
    }
    /* public AgregarTabla(llave: string, contenido: datoEntorno):void{
        let e ;
        for(e = this; e!= null; e=e.anterior){
            let encontrado = e.tabla.has(llave);

            if(!encontrado){
                this.tabla.set(llave,contenido);
            }
        }
    } */
    Existe(llave) {
        let e;
        llave = llave.toLowerCase();
        for (e = this; e != null; e = e.anterior) {
            if (e.tabla.has(llave))
                return true;
        }
        return false;
    }
    Existe_Entorno(tipo) {
        let e;
        for (e = this; e != null; e = e.anterior) {
            if (e.ambito === tipo)
                return e.etqAmbito;
        }
        return "-1";
    }
    Existe_Continue(tipo) {
        let e;
        for (e = this; e != null; e = e.anterior) {
            if (e.ambito === tipo)
                return e.etqContinue;
        }
        return "-1";
    }
    Get(llave) {
        let e;
        llave = llave.toLowerCase();
        for (e = this; e != null; e = e.anterior) {
            if (e.tabla.has(llave))
                return e.tabla.get(llave);
        }
        return undefined;
    }
    DevolverJSON() {
        let json = [{ "nombre": "Global", "Tipo": "Void", "Ambito": this.ambito, "Rol": "-",
                "Posicion": "-", "Tamanio": this.tamanio }];
        for (let llave of this.tabla.keys()) {
            let valor = this.tabla.get(llave);
            if (valor != undefined)
                json.push({ "nombre": llave, "Tipo": valor.DevolverTipo(), "Ambito": this.ambito,
                    "Rol": valor.DevolverRol(), "Posicion": valor.posRelativa + "", "Tamanio": valor.tamanio });
        }
        return JSON.stringify(json);
    }
}
exports.Entorno = Entorno;
Entorno.ROL = ROL;
