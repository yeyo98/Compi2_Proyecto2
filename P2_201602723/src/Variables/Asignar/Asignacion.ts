import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';
import { Casting } from '../../Expresion/Casteo/Casting';

export class Asignacion extends nodoAst{

    id: string;
    valor: Exp;
    constructor(id:string, valor:Exp, line:number, col:number){
        super(line,col);
        this.id = id;
        this.valor = valor;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        // PRIMERO VERIFICO SI EXISTE LA VARIABLE
        if( !e.Existe(this.id) ){
            // SI NO EXISTE SUBO EL ERROR
            Informacion.ErrSemantico("No existe una variable con este Nombre <"+this.id+">", 
                this.linea,this.columna);
            resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            return resultado;
        }
        let variable = e.Get(this.id);
        
        // ANTES VERIFICO QUE NO SEA UNA CONSTANTE
        if(variable?.rol == Entorno.ROL.VARIABLE_CONST){
            Informacion.ErrSemantico("No se puede modificar una variable Constante <"+this.id+">", 
                    this.linea,this.columna);
            resultado.BorrarError();
            return resultado;
        }

        //================ OBTENGO EL NUEVO VALOR ================ 
        let valor = this.valor.Ejecutar(e);
        // ANALIZO SI HUBO ALGUN ERROR
        if(valor.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return valor;

        // AHORA VERIFICO QUE TENGAN EL MISMO TIPO
        if(variable?.tipo != valor.tipo){
            /* SI NO SON IGUALES, TENDRIA QUE LLAMAR UN METODO DE CASTEO
                PARA VER SI AUN SE PUEDE
            */
            valor = Casting.CasteoImplicito(variable?.tipo,valor);

            if(valor.tipo == auxExpresion.COMBINACION_TIPOS.ERR){
                Informacion.ErrSemantico("El tipo de la Expresion no coincide con el tipo de la Variable", 
                        this.valor.linea,this.valor.columna);
                    resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
                    return resultado;
            }
        }
        
        resultado.Agregar_CodigoNodo(valor);
        resultado.Agregar_LineaCodigo("#=========== ASIGNACION ===========");

        // COMPRUEBO SI ES UNA VARIABLE GLOBAL PARA SACARLO DEL HEAP
        if(variable?.rol == Entorno.ROL.VARIABLE_GLOBAL){

            //============== CAMBIO EL VALOR ============== 
            resultado.Agregar_LineaCodigo("Heap["+variable.posHeap+"]= "+valor.cabeza); 
            //variable.posHeap

            return resultado;
        }

        if(variable?.posRelativa == 0){
            resultado.Agregar_LineaCodigo("Stack[P]= "+valor.cabeza);
        }
        else{
            const tem1 = resultado.Crear_Temporal();
            resultado.Agregar_LineaCodigo(tem1+"= P+"+variable?.posRelativa);
            resultado.Agregar_LineaCodigo("Stack["+tem1+"]= "+valor.cabeza);
        }
        

        return resultado;
    }
    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();

        let id = new nodoGrafica();
        id.Crear_NodoInicial(this.id);

        let valor = this.valor.Graficar();

        resultado.Armar_NodoGrafica("Asignacion",id,valor)
        return resultado;
    }

}