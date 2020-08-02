import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { Exp } from '../Expresion/Exp';
import { auxExpresion } from '../Expresion/auxExpresion';
import { Informacion } from '../Datos/Informacion';
import { Valor } from '../Expresion/Valor';
import { Casting } from '../Expresion/Casteo/Casting';
import { LlamarFuncion } from '../Funciones/Llamar_Funcion/LlamarFuncion';

export class ListaArreglo extends nodoAst{
    listaExp: nodoAst[];
    cont:number;

    tipoIdeal: any;
    unCambio:boolean = true;

    constructor(listaExp: nodoAst[],line:number, col:number){
        super(line,col);
        this.listaExp = listaExp;
        this.cont = 0;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        const tem1 = resultado.Crear_Temporal(); 

        resultado.Agregar_LineaCodigo(tem1+"=H");

        for(let exp of this.listaExp){
            let aux = exp.Ejecutar(e);

            if(this.tipoIdeal != aux.tipo){
                /* SI NO SON IGUALES, TENDRIA QUE LLAMAR UN METODO DE CASTEO
                    PARA VER SI AUN SE PUEDE
                */
                if(this.unCambio)
                    aux = Casting.CasteoImplicito(this.tipoIdeal,aux);
                else{ aux.tipo = auxExpresion.COMBINACION_TIPOS.ERR}
                this.unCambio = false;
                if(aux.tipo == auxExpresion.COMBINACION_TIPOS.ERR){
                    Informacion.ErrSemantico("No se puede crear este arreglo por ser de tipos distintos", 
                        this.linea,this.columna);
                    resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
                    return resultado;
                }
            }
            // AQUI TENDRIA QUE AGREGARLO AL HEAP
            resultado.Agregar_CodigoNodo(aux);
            resultado.Agregar_LineaCodigo("Heap[H]="+aux.cabeza);
            resultado.Agregar_LineaCodigo("H=H+1");
            this.cont++;
            
        }
        resultado.EstablecerCabeza(tem1,this.tipoIdeal);
        

        return resultado;
    }


    SetTipo(tipo:any):void{
        this.tipoIdeal = tipo;
    }
    


    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const cabeza = "List_Exp";

        for(let exp of this.listaExp)
            resultado.Armar_NodoGrafica(cabeza,exp.Graficar(),null);
        return resultado;
    }

}