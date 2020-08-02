import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';

export class Temporal extends nodoAst{
    ids: string[];
    constructor(ids:string[]){
        super(1,1);
        this.ids = ids;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        for(let id of this.ids){
            resultado.listaTemporal.push(id);
        }
        return resultado;
    }
    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "Temps";

        for(let id of this.ids){
            let aux = new nodoGrafica();
            aux.Crear_NodoInicial(id);
            resultado.Armar_NodoGrafica(cabeza,aux,null);
        }
        return resultado;
    }
}