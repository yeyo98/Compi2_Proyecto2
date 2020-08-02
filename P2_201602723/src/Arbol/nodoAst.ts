import { Entorno } from '../Datos/Entorno/Entorno';
import { nodoCodigo } from './nodoCodigo';
import { nodoGrafica } from './nodoGrafica'

export abstract class nodoAst{
    linea: number;
    columna: number;

    constructor(li:number, col:number){
        this.linea = li;
        this.columna = col;
    }
    abstract Ejecutar(e: Entorno): nodoCodigo;
    abstract Graficar(): nodoGrafica;
}