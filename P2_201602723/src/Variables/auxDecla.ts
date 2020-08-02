import { auxExpresion } from "../Expresion/auxExpresion";


export class auxDecla {
    constructor() {
        
    }

    static GetTipo(tipo: string): any{
        let resultado;
        tipo = tipo.toLowerCase();
        switch(tipo)
        {
            case "integer":{
                resultado = auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case "double":{
                resultado = auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case "char":{
                resultado = auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
            case "boolean":{
                resultado = auxExpresion.COMBINACION_TIPOS.BOOL;
                break;
            }
            default: {
                if(tipo === "string"){
                    resultado = auxExpresion.COMBINACION_TIPOS.STRING;
                    break;
                }
                // CASO PARA CUANDO SEA UN IDENTIFICADOR
                resultado = auxExpresion.COMBINACION_TIPOS.ID;
            }
        }
        return resultado;
    }

    static GetDefault(tipo: any): string{
        let resultado="";
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER:{
                resultado = 0+"";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE:{
                resultado = 0+"";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR:{
                resultado = -1+"";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL:{
                resultado = 0+"";
                break;
            }
            default:{
                resultado = -1+"";
                break;
            }
        }
        return resultado;
    }


    static IsPrimity(tipo:any): boolean {
        if(tipo == auxExpresion.COMBINACION_TIPOS.INTEGER || tipo == auxExpresion.COMBINACION_TIPOS.DOUBLE
            || tipo == auxExpresion.COMBINACION_TIPOS.CHAR || tipo == auxExpresion.COMBINACION_TIPOS.BOOL
            || auxExpresion.COMBINACION_TIPOS.STRING)
                return true;
        
        return false;
    }

}