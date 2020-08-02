import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { auxExpresion } from './auxExpresion';
import { String } from "../Objectos/String";
import { Informacion } from '../Datos/Informacion';

export class Valor extends nodoAst{

    valor: string;
    tipo: any;


    constructor(valor: string,tipo: any,linea: number, col: number){
        super(linea,col);
        this.valor = valor;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();
        // CREO EL OBJECTO CON EL CODIGO
        // PRIMERO VERIFICO SI NO ES UN VALOR PRIMITIVO
        switch(this.tipo){
            case auxExpresion.COMBINACION_TIPOS.STRING:{
                return String.GuardarCadena(this.valor);
            }
            case auxExpresion.COMBINACION_TIPOS.ID :{
                return this.ValorEntorno(e);
            }
        }
        //resultado.Agregar_LineaCodigo("\n#=========== VALOR ===========");
        if(this.tipo == auxExpresion.COMBINACION_TIPOS.CHAR)
            this.valor = this.valor.charCodeAt(0)+"";
        resultado.EstablecerCabeza(this.valor,this.tipo);
        return resultado;
    }

    private ValorEntorno(e: Entorno): nodoCodigo{
        const resultado = new nodoCodigo();
        if( !e.Existe(this.valor) ){
            // SI NO EXISTE SUBO EL ERROR
            Informacion.ErrSemantico("No existe una variable con este Nombre <"+this.valor+">", 
                this.linea,this.columna);
            resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            return resultado;
        }
            
        resultado.Agregar_LineaCodigo("#=========== USAR VARIABLE ===========");
        let valor = e.Get(this.valor);



        // COMPRUEBO SI ES UNA VARIABLE GLOBAL PARA SACARLO DEL HEAP
        if(valor?.rol == Entorno.ROL.VARIABLE_GLOBAL){
            const tem3 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem3+"= Heap["+valor.posHeap+"]");
            //tem2 = tem3;
            resultado.EstablecerCabeza(tem3,valor?.tipo);
            return resultado;
        }

        let tem2 = resultado.Crear_Temporal();
        // SI NO ES GLOBAL LO HAGO NORMAL
        if(valor?.posRelativa == 0){
            resultado.Agregar_LineaCodigo(tem2+"= Stack[P]");
        }
        else{
            const tem1 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem1+"= P+"+valor?.posRelativa);
            resultado.Agregar_LineaCodigo(tem2+"= Stack["+tem1+"]");
        }


        resultado.EstablecerCabeza(tem2,valor?.tipo);
        return resultado;
    }


    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();

        resultado.Crear_NodoInicial(this.valor);
        return resultado;
    }




}