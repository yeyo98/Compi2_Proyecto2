import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";

export class Etiqueta extends nodoAst{
    id:string; 
    constructor(id:string, line:number, col:number){
        super(line,col);
        this.id = id;
    }
    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();
        resultado.cabeza = this.id;
        resultado.Agregar_LineaCodigo(this.id+":");
        return resultado;
    }
    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        resultado.Crear_NodoInicial(this.id);
        return resultado;
    }

}