import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";

export class DHeap_Stack extends nodoAst{
    pos:string;
    id:string; 
    tipo:boolean;
    constructor(id:string,pos:string, tipo:boolean, line:number, col:number){
        super(line,col);
        this.pos = pos;
        this.id = id;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();
        const nombre = (this.tipo)?"Stack":"Heap";

        resultado.Agregar_LineaCodigo(this.id+"= "+nombre+"["+this.pos+"]");

        return resultado;
    }
    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const nombre = (this.tipo)?"Stack":"Heap";

        let aux = new nodoGrafica();
        aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica(nombre,aux,null);

        aux.Crear_NodoInicial(this.pos);
        resultado.Armar_NodoGrafica(nombre,aux,null);
        return resultado;
    }
}