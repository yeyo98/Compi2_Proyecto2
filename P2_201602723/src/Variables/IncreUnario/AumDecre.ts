import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';

export class AumDecre extends nodoAst{

    id: string;
    tipo: boolean;
    constructor(id:string, tipo:boolean, line:number, col:number){
        super(line, col);
        this.id = id;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        // VERIFICO QUE EXISTA LA VARIABLE
        if( !e.Existe(this.id) ){
            // SI NO EXISTE SUBO EL ERROR
            Informacion.ErrSemantico("No existe una variable con este Nombre <"+this.id+">", 
                this.linea,this.columna);
            resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            return resultado;
        }
        let valor = e.Get(this.id);

        // ANTES VERIFICO QUE NO SEA UNA CONSTANTE
        if(valor?.rol == Entorno.ROL.VARIABLE_CONST){
            Informacion.ErrSemantico("No se puede modificar una variables Constante", 
                    this.linea,this.columna);
            resultado.BorrarError();
            return resultado;
        }
        // VERIFICO QUE SEA TIPO INTEGER/DOUBLE/CHAR
        if(valor?.tipo == auxExpresion.COMBINACION_TIPOS.BOOL 
            || valor?.tipo == auxExpresion.COMBINACION_TIPOS.STRING ){
            Informacion.ErrSemantico("No se puede aplicar este operador al tipo String, Boolean o Estructura", 
                    this.linea,this.columna);
            resultado.BorrarError();
            return resultado;
        }

        resultado.Agregar_LineaCodigo("#=========== AUMENTAR/DISMINUIR ===========");
        // EN ESTE TEMPORAL GUARDO EL DATO
        let tem2 = resultado.Crear_Temporal();
        let auxTemporal="";

        if(valor?.posRelativa == 0){
            resultado.Agregar_LineaCodigo(tem2+"= Stack[P]");
        }
        else{
            const tem1 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem1+"= P+"+valor?.posRelativa);
            auxTemporal = tem1;
            resultado.Agregar_LineaCodigo(tem2+"= Stack["+tem1+"]");
        }
        // COMPRUEBO SI ES UNA VARIABLE GLOBAL PARA SACARLO DEL HEAP
        if(valor?.rol == Entorno.ROL.VARIABLE_GLOBAL){
            const tem3 = resultado.Crear_Temporal();
            const tem4 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem3+"= Heap["+tem2+"]");
            resultado.Agregar_LineaCodigo(tem4+"="+tem3);

            //============== CAMBIO EL VALOR ============== 
            if(this.tipo)
                resultado.Agregar_LineaCodigo(tem3+"="+tem3+"+ 1");
            else
                resultado.Agregar_LineaCodigo(tem3+"="+tem3+"- 1");
            
            // LO VUELVO A INGRESAR
            resultado.Agregar_LineaCodigo("Heap["+tem2+"]= "+tem3); 
            resultado.EstablecerCabeza(tem4,valor?.tipo);
            return resultado;
        }

        const tem4 = resultado.Crear_Temporal();
        resultado.Agregar_LineaCodigo(tem4+"="+tem2);
        //============== CAMBIO EL VALOR ============== 
        if(this.tipo)
            resultado.Agregar_LineaCodigo(tem2+"="+tem2+"+ 1");
        else
            resultado.Agregar_LineaCodigo(tem2+"="+tem2+"- 1");
        
        if(valor?.posRelativa == 0)
            resultado.Agregar_LineaCodigo("Stack[P]= "+tem2);
        else
            resultado.Agregar_LineaCodigo("Stack["+auxTemporal+"]= "+tem2);

        resultado.EstablecerCabeza(tem4,valor?.tipo);
        return resultado;
    }


    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const id =  new nodoGrafica();
        id.Crear_NodoInicial(this.id);

        if(this.tipo)
            resultado.Armar_NodoGrafica("++",id,null);
        else
            resultado.Armar_NodoGrafica("--",id,null);
        
        return resultado;
    }

}