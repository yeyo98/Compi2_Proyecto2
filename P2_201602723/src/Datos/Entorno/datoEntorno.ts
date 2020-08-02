import { auxExpresion} from '../../Expresion/auxExpresion';
import { Entorno } from './Entorno';

export class datoEntorno{
    tipo: any;           // TIPO DE VARIABLE QUE ESTOY ALMACENADO
    rol: any;               // ROL QUE TIENE LA VARIABLE
    posRelativa: number;    // LA POSICION RELATIVA DE LA VARIABLES
    posHeap: string;        // POSICION ESPECIAL PARA GUARDAR VARIABLES GLOBALES
    tamanio: number;        // TAMANIO DE LA VARIABLE
    constructor(tipo: any, rol: any, posRelativa: number, tamanio:number){
        this.tipo = tipo;
        this.rol = rol;
        this.posRelativa = posRelativa;
        this.tamanio = tamanio;
        this.posHeap = "";
    }

    GetPosHeap(pos: string):void{
        this.posHeap = pos;
    }

    DevolverTipo():string{
        let resultado = "-";
        switch(this.tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER:{
                resultado = "Integer";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR:{
                resultado = "Char";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE:{
                resultado = "Double";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL:{
                resultado = "Bool";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.VOID:{
                resultado = "Void";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING:{
                resultado = "String";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.ARR_INTEGER:{
                resultado = "Integer";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.ARR_CHAR:{
                resultado = "ARR_Char";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.ARR_DOUBLE:{
                resultado = "ARR_Double";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.ARR_BOOL:{
                resultado = "ARR_Bool";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.ARR_STRING:{
                resultado = "ARR_String";
                break;
            }
        }
        return resultado
    }

    DevolverRol():string{
        let resultado = "-"

        switch(this.rol){
            case Entorno.ROL.VARIABLE_LOCAL:{
                resultado = "Var_Local";
                break;
            }
            case Entorno.ROL.VARIABLE_CONST:{
                resultado = "Var_Const";
                break;
            }
            case Entorno.ROL.VARIABLE_GLOBAL:{
                resultado = "Var_Global";
                break;
            }
            case Entorno.ROL.FUNCION:{
                resultado = "Funcion";
                break;
            }
        }

        return resultado;
    }


}