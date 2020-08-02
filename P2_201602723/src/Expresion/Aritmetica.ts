/* 
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { Informacion } from "../Datos/Informacion";
import { Exp } from './Exp' */
import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { auxExpresion } from './auxExpresion';
import { String } from '../Objectos/String';
import { Informacion } from '../Datos/Informacion';
import { Valor } from '../Expresion/Valor';

export class Aritmetica{

    line: number;
    col: number;
    constructor(line:number, col:number){ this.line = line; this.col = col; }

    //================================ SUMA ================================ 
    Traducir_Suma(op1: nodoCodigo, op2: nodoCodigo):nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo)
        {
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                ////op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_STRING :{
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_STRING :{
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                ////op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                let aux = String.GuardarLetra(op1.cabeza);
                resultado.Agregar_CodigoNodo( aux );
                resultado.Agregar_CodigoNodo( String.GuardarLetra(op2.cabeza) );

                resultado.Agregar_LineaCodigo('Heap[H] = -1');
                resultado.Agregar_LineaCodigo( 'H = H+1' );
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_STRING :{
                let aux = String.GuardarLetra(op1.cabeza);
                resultado.Agregar_CodigoNodo(op2);
                resultado.Agregar_CodigoNodo( aux );
                resultado.Agregar_CodigoNodo( String.GuardarPalabra(op2.cabeza) );

                resultado.Agregar_LineaCodigo('Heap[H] = -1');
                resultado.Agregar_LineaCodigo( 'H = H+1' );
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING_STRING :{
                resultado.Agregar_Codigo2(op1,op2);
                let aux = String.SumarCadenas(op1.cabeza,op2.cabeza);
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
                resultado.Agregar_CodigoNodo(aux);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING_BOOL :{

                resultado.Agregar_CodigoNodo(op1);
                let aux = String.GuardarPalabra(op1.cabeza);
                resultado.Agregar_CodigoNodo(aux);

                let bool=(op2.cabeza==="0")?"false":"true";
                resultado.Agregar_CodigoNodo( String.GuardarCadena2(bool) );

                resultado.Agregar_LineaCodigo('Heap[H] = -1');
                resultado.Agregar_LineaCodigo( 'H = H+1' );
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 7
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"+",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING_INTEGER :{
                
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING_DOUBLE :{
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING_CHAR :{
                let aux = String.GuardarPalabra(op1.cabeza);
                resultado.Agregar_CodigoNodo(op1);
                resultado.Agregar_CodigoNodo( aux );
                resultado.Agregar_CodigoNodo( String.GuardarLetra(op2.cabeza) );

                resultado.Agregar_LineaCodigo('Heap[H] = -1');
                resultado.Agregar_LineaCodigo( 'H = H+1' );
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL_STRING :{
                let bool=(op1.cabeza==="0")?"false":"true";

                let aux = String.GuardarCadena2(bool);
                resultado.Agregar_CodigoNodo(aux);
                resultado.Agregar_CodigoNodo(op2);
                resultado.Agregar_CodigoNodo( String.GuardarPalabra(op2.cabeza) );

                resultado.Agregar_LineaCodigo('Heap[H] = -1');
                resultado.Agregar_LineaCodigo( 'H = H+1' );
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede hacer una SUMA con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    //================================ RESTA ================================ 
    Traducir_Resta(op1: nodoCodigo, op2: nodoCodigo):nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo)
        {
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"-",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede hacer una RESTA con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    //================================ MULTIPLICACION ================================ 
    Traducir_Multiplicacion(op1: nodoCodigo, op2: nodoCodigo):nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo)
        {
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede hacer una MULTIPLICACION con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    //================================ DIVISION ================================  
    Traducir_Division(op1: nodoCodigo, op2: nodoCodigo):nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo)
        {
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,"/",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede hacer una DIVISION con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    //================================ MODULO ================================ 
    Traducir_Modulo(op1: nodoCodigo, op2: nodoCodigo):nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER:{
                resultado = this.GenerarCodigo(op1,op2,"%",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede sacar MODULO con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    //================================ POTENCIA ================================ 
    Traducir_Potencia(op1: nodoCodigo, op2: nodoCodigo):nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER:{
                const tem1 = resultado.Crear_Temporal();
                const tem2 = resultado.Crear_Temporal();
                const etq1 = resultado.Crear_Etiqueta();
                const etq2 = resultado.Crear_Etiqueta();

                resultado.Agregar_LineaCodigo(tem1+"= "+op2.cabeza);
                resultado.Agregar_LineaCodigo(tem2+"= 1");
                resultado.Agregar_LineaCodigo(etq1+":");
                resultado.Agregar_LineaCodigo("if("+tem1+"== 0) goto "+etq2);
                resultado.Agregar_LineaCodigo(tem2+"= "+tem2+"*"+op1.cabeza);
                resultado.Agregar_LineaCodigo(tem1+"= "+tem1+"-1");
                resultado.Agregar_LineaCodigo("goto "+etq1);
                resultado.Agregar_LineaCodigo(etq2+":");

                resultado.EstablecerCabeza(tem2,auxExpresion.COMBINACION_TIPOS.INTEGER);
                //resultado = this.GenerarCodigo(op1,op2,"%",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede sacar POTENCIA con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        
        return resultado;
    }
    //================================ UMENOS ================================ 
    Traducir_Umenos(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER:{
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.INTEGER);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE:{
                resultado = this.GenerarCodigo(op1,op2,"*",auxExpresion.COMBINACION_TIPOS.DOUBLE);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede EL VALOR NEGATIVO con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }
    //================================ NOT ================================ 
    Traducir_Not(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.BOOL_INTEGER:{
                const etq1 = resultado.Crear_Etiqueta();
                const etq2 = resultado.Crear_Etiqueta();
                const etq3 = resultado.Crear_Etiqueta();
                
                resultado.Agregar_CodigoNodo(op1);
                let tem = resultado.Crear_Temporal();
                resultado.EstablecerCabeza(tem,tipo);

                let line = "if( "+op1.cabeza+" == 1) goto "+etq1;
                resultado.Agregar_LineaCodigo(line);
                line = "goto "+etq2;
                resultado.Agregar_LineaCodigo(line);

                // VERDADERO
                resultado.Agregar_LineaCodigo(etq2+":");
                line = tem +"= 1";
                resultado.Agregar_LineaCodigo(line);
                
                line = "goto "+etq3;
                resultado.Agregar_LineaCodigo(line);

                // FALSO
                resultado.Agregar_LineaCodigo(etq1+":");
                line = tem +"= 0";
                resultado.Agregar_LineaCodigo(line);
                //ETIQUETA FINAL
                resultado.Agregar_LineaCodigo(etq3+":");
                
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede sacar EL CONTRARIO con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }




    private GenerarCodigo(op1: nodoCodigo, op2: nodoCodigo, signo: string, tipo:any): nodoCodigo{
        let resultado = new nodoCodigo();
        resultado.Agregar_Codigo2(op1,op2);

        let tem = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(tem,tipo);

        const line = tem+"= "+op1.cabeza+signo+op2.cabeza;
        resultado.Agregar_LineaCodigo(line);
        return resultado;
    }
}