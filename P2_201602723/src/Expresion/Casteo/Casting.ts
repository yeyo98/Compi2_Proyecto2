import { Informacion } from '../../Datos/Informacion'
import { nodoCodigo } from '../../Arbol/nodoCodigo';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Valor } from '../Valor';

export class Casting {
    constructor() {}

    static CasteoImplicito( tipoVariable: any, valor: nodoCodigo): nodoCodigo{
        let combinacionTipo = auxExpresion.Evaluar_Tipos(tipoVariable,valor.tipo);

        switch(combinacionTipo){
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR:{
                valor.tipo = auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER:{
                valor.tipo = auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR:{
                valor.tipo = auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            default:{
                valor.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
                break;
            }
        }
        return valor;

    }

    static CasteoExplicito(tipoVariable: any, valor: nodoCodigo): nodoCodigo{
        return new nodoCodigo();
    }


}