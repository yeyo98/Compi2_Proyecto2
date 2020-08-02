import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";

export class AHeap_Stack extends nodoAst{
    pos:string;
    valor:string; 
    tipo:boolean;
    constructor(pos:string,valor:string, tipo:boolean, line:number, col:number){
        super(line,col);
        this.pos = pos;
        this.valor = valor;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();
        const nombre = (this.tipo)?"Stack":"Heap";

        resultado.Agregar_LineaCodigo(nombre+"["+this.pos+"]= "+this.valor);

        return resultado;
    }
    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const nombre = (this.tipo)?"Stack":"Heap";

        let aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.pos);
        resultado.Armar_NodoGrafica(nombre,aux,null);

        aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.valor);
        resultado.Armar_NodoGrafica(nombre,aux,null);

        return resultado;
    }
}