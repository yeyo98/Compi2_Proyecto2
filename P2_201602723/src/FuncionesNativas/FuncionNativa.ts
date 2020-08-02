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
import { Funcion } from './Funcion';

export class FuncionNativa extends nodoAst{
    anterior: FuncionNativa | null;
    variable: string;
    funcion: Funcion;
    tipo: boolean;
    constructor(anterior: FuncionNativa|null, variable:string, funcion:Funcion,tipo:boolean, line:number, col:number){
        super(line,col);
        this.anterior = anterior;
        this.variable = variable;
        this.funcion = funcion;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        if(this.tipo){  // HOJA
            let variable = new Valor(this.variable,auxExpresion.COMBINACION_TIPOS.ID,this.linea,this.columna);
            let auxCodigo = variable.Ejecutar(e);
            if(auxCodigo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return auxCodigo;
            
            //resultado.Agregar_CodigoNodo(auxCodigo);
            auxCodigo.EliminarTemporales();
            if(auxCodigo.tipo == auxExpresion.COMBINACION_TIPOS.STRING){
               resultado = this.MetodosString(e,variable);
            }else{// ESTE CASO SERIA PARA ANALIZAR ALGUN ARREGLO

            }

        }else if(this.anterior != null){  // EN CADENA
            let auxCodigo = this.anterior?.Ejecutar(e);
            if(auxCodigo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return auxCodigo;
            auxCodigo.EliminarTemporales();
            if(auxCodigo.tipo == auxExpresion.COMBINACION_TIPOS.STRING){
                resultado = this.MetodosString(e,this.anterior);

             }else{// ESTE CASO SERIA PARA ANALIZAR ALGUN ARREGLO
 
             }
        }

        return resultado;
    }


    MetodosString(e:Entorno,variable:nodoAst):nodoCodigo{
        let resultado = new nodoCodigo();
        switch(this.funcion.nombre.toLowerCase()){
            case "tochararray":{

                break;
            }
            case "length":{
                let param=[]; param.push(variable); 
                let aux = new LlamarFuncion("length",param,this.linea,this.columna);
                resultado = aux.Ejecutar(e);
                break;
            }
            case "touppercase":{
                let param=[]; param.push(variable); 
                let aux = new LlamarFuncion("touppercase",param,this.linea,this.columna);
                resultado = aux.Ejecutar(e);
                break;
            }
            case "tolowercase":{
                let param=[]; param.push(variable); 
                let aux = new LlamarFuncion("tolowercase",param,this.linea,this.columna);
                resultado = aux.Ejecutar(e);
                break;
            }
            case "charat":{
                if(this.funcion.parametro != null){
                    let param=[]; param.push(variable); param.push(this.funcion.parametro);
                    let aux = new LlamarFuncion("charat",param,this.linea,this.columna);
                    resultado = aux.Ejecutar(e);
                }
                else{
                    Informacion.ErrSemantico("La funcion CharAt necesita una parametro numerico", 
                        this.linea,this.columna);
                    resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
                    return resultado;
                }
                break;
            }
        }

        return resultado;
    }


    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const cabeza = "FuncionNativa";
    
        if(this.tipo){
            let nombre = new nodoGrafica();
            nombre.Crear_NodoInicial(this.variable);
            resultado.Armar_NodoGrafica(this.funcion.nombre,nombre,null);
        }else{
            let aux = new nodoGrafica();
            aux.Crear_NodoInicial(this.funcion.nombre);
            if(this.anterior!=null)
                resultado.Armar_NodoGrafica(cabeza,this.anterior.Graficar(),aux);
        }
        return resultado;
    }

}