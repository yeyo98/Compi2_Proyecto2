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

export class Funcion{
    nombre:string;
    parametro:nodoAst|null;
    constructor(nombre:string, parametro:nodoAst|null){
        this.nombre = nombre;
            this.parametro = parametro;
    }
    
}