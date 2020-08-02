import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";

export class Call extends nodoAst{
    id:string; 
    constructor(id:string, line:number, col:number){
        super(line,col);
        this.id = id;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();
        resultado.Agregar_LineaCodigo("Call "+this.id);
        return resultado;
    }
    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const id = new nodoGrafica();
        id.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica("Call",id,null);
        return resultado;
    }

    
}