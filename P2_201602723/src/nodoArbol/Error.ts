import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { auxExpresion } from '../Expresion/auxExpresion';

export class Error extends nodoAst{
    constructor(li:number, col:number){
        super(li,col);
    }
    Ejecutar(e: Entorno): nodoCodigo {
        let r = new nodoCodigo();
        r.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
        return r;
    }
    Graficar(): nodoGrafica {
        const raiz = new nodoGrafica();

        raiz.Crear_NodoInicial('ERROR SINTACTICO!!');

        return raiz;
    }
}