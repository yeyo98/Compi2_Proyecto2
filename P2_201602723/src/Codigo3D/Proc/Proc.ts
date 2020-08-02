import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Instruccion } from '../Instrucciones/Instruccion';

export class Proc extends nodoAst{
    id:string; 
    cuerpo:Instruccion; 
    constructor(id:string, cuerpo:Instruccion, line:number, col:number){
        super(line,col);
        this.id = id;
        this.cuerpo = cuerpo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();

        resultado.Agregar_LineaCodigo("proc "+this.id+" begin::");
        resultado.Agregar_CodigoNodo(this.cuerpo.Ejecutar(e));
        resultado.Agregar_LineaCodigo("end::");

        return resultado;
    }
    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const id = new nodoGrafica();
        id.Crear_NodoInicial(this.id);

        resultado.Armar_NodoGrafica("Proc",id,this.cuerpo.Graficar());
        return resultado;
    }

}