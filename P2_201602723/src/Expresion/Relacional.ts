/* 
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { Informacion } from "../Datos/Informacion";
import { Exp } from './Exp'
import { nodoAst } from '../Arbol/nodoAst'; */
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { auxExpresion } from './auxExpresion';
import { Informacion } from "../Datos/Informacion";
import { String } from "../Objectos/String";

export class Relacional{
    
    line: number;
    col: number;
    constructor(line:number, col:number){ this.line = line; this.col = col; }

    Traducir_Mayor(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '>' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    Traducir_Mayorigual(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'>=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '>=' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    Traducir_Menor(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '<' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    Traducir_MenorIgual(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<=',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '<=' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    Traducir_Igualacion(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING_STRING :{
                resultado.Agregar_Codigo2(op1,op2);
                let aux =String.CompararCadenas(op1.cabeza,op2.cabeza);
                resultado.Agregar_CodigoNodo(aux);
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL_BOOL :{
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '==' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    Traducir_Diferencia(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
    
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_CHAR :{
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_DOUBLE :{
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_CHAR :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                //op2.cabeza=op2.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING_STRING :{
                resultado.Agregar_Codigo2(op1,op2);
                let aux =String.CompararCadenas2(op1.cabeza,op2.cabeza);
                resultado.Agregar_CodigoNodo(aux);
                resultado.EstablecerCabeza(aux.cabeza,auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL_BOOL :{
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            // ========================== ESTA LAS AGREGUE YO ========================== -> 3
            case auxExpresion.COMBINACION_TIPOS.DOUBLE_INTEGER :{
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '!=' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    Traducir_IgualacionReferencia(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();

        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.STRING_STRING :{
                //op1.cabeza=op1.cabeza.charCodeAt(0)+"";
                resultado = this.GenerarCodigo(op1,op2,'==',auxExpresion.COMBINACION_TIPOS.BOOL);
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '===' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }

        return resultado;
    }

    Traducir_And(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.BOOL_BOOL :{
                //resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                const etq1 = resultado.Crear_Etiqueta();
                const etq2 = resultado.Crear_Etiqueta();
                const etq3 = resultado.Crear_Etiqueta();
                const etq4 = resultado.Crear_Etiqueta();
                //const etq5 = resultado.Crear_Etiqueta();
                
                resultado.Agregar_Codigo2(op1,op2);
                let tem = resultado.Crear_Temporal();
                resultado.EstablecerCabeza(tem,auxExpresion.COMBINACION_TIPOS.BOOL);

                resultado.Agregar_LineaCodigo("if( "+op1.cabeza+"== 1) goto "+etq1);
                resultado.Agregar_LineaCodigo("goto "+etq2);

                // VERDADERO
                resultado.Agregar_LineaCodigo(etq1+":");
                    resultado.Agregar_LineaCodigo("if( "+op2.cabeza+"== 1) goto "+etq4);
                    resultado.Agregar_LineaCodigo("goto "+etq2);

                    // VERDADERO
                    resultado.Agregar_LineaCodigo(etq4+":");
                    resultado.Agregar_LineaCodigo(tem +"= 1");
                    
                    resultado.Agregar_LineaCodigo("goto "+etq3);

                    //resultado.Agregar_LineaCodigo(etq5+":");
                // FALSO
                resultado.Agregar_LineaCodigo(etq2+":");
                resultado.Agregar_LineaCodigo(tem +"= 0");
                //ETIQUETA FINAL
                resultado.Agregar_LineaCodigo(etq3+":");

                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '&&' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    Traducir_Or(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.BOOL_BOOL :{
                //resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                const etq1 = resultado.Crear_Etiqueta();
                //const etq2 = resultado.Crear_Etiqueta();
                const etq3 = resultado.Crear_Etiqueta();
                //const etq4 = resultado.Crear_Etiqueta();
                const etq5 = resultado.Crear_Etiqueta();
                
                resultado.Agregar_Codigo2(op1,op2);
                let tem = resultado.Crear_Temporal();
                resultado.EstablecerCabeza(tem,auxExpresion.COMBINACION_TIPOS.BOOL);

                resultado.Agregar_LineaCodigo("if( "+op1.cabeza+"== 1) goto "+etq1);
                //resultado.Agregar_LineaCodigo("goto "+etq2);

                // VERDADERO
                //resultado.Agregar_LineaCodigo(etq2+":");
                    resultado.Agregar_LineaCodigo("if( "+op2.cabeza+"== 1) goto "+etq1);
                    resultado.Agregar_LineaCodigo("goto "+etq5);

                    // VERDADERO
                    resultado.Agregar_LineaCodigo(etq1+":");
                    //resultado.Agregar_LineaCodigo(etq4+":");

                    resultado.Agregar_LineaCodigo(tem +"= 1");
                    resultado.Agregar_LineaCodigo("goto "+etq3);

                    resultado.Agregar_LineaCodigo(etq5+":");
                // FALSO
                resultado.Agregar_LineaCodigo(tem +"= 0");
                //ETIQUETA FINAL
                resultado.Agregar_LineaCodigo(etq3+":");
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '||' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }
    
    Traducir_Xor(op1: nodoCodigo, op2: nodoCodigo): nodoCodigo{
        let tipo = auxExpresion.Evaluar_Tipos(op1.tipo,op2.tipo);
        let resultado = new nodoCodigo();
        
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.BOOL_BOOL :{
                //resultado = this.GenerarCodigo(op1,op2,'<>',auxExpresion.COMBINACION_TIPOS.BOOL);
                const etq1 = resultado.Crear_Etiqueta();
                //const etq2 = resultado.Crear_Etiqueta();
                const etq3 = resultado.Crear_Etiqueta();
                const etq4 = resultado.Crear_Etiqueta();
                //const etq5 = resultado.Crear_Etiqueta();
                //const etq6 = resultado.Crear_Etiqueta();
                const etq7 = resultado.Crear_Etiqueta();
                
                resultado.Agregar_Codigo2(op1,op2);
                let tem = resultado.Crear_Temporal();
                resultado.EstablecerCabeza(tem,auxExpresion.COMBINACION_TIPOS.BOOL);

                resultado.Agregar_LineaCodigo("if( "+op1.cabeza+"== 1) goto "+etq1);
                //resultado.Agregar_LineaCodigo("goto "+etq2);

                // FALSE
                //resultado.Agregar_LineaCodigo(etq2+":");
                    resultado.Agregar_LineaCodigo("if( "+op2.cabeza+"== 1) goto "+etq3);
                    resultado.Agregar_LineaCodigo("goto "+etq4);

                // VERDADERO
                resultado.Agregar_LineaCodigo(etq1+":");
                    resultado.Agregar_LineaCodigo("if( "+op2.cabeza+"== 1) goto "+etq4);
                    //resultado.Agregar_LineaCodigo("goto "+etq6);

                // VERDADERO
                resultado.Agregar_LineaCodigo(etq3+":");
                //resultado.Agregar_LineaCodigo(etq6+":");
                    resultado.Agregar_LineaCodigo(tem +"= 1");
                    resultado.Agregar_LineaCodigo("goto "+etq7);

                // FALSO
                //resultado.Agregar_LineaCodigo(etq5+":");
                resultado.Agregar_LineaCodigo(etq4+":");
                resultado.Agregar_LineaCodigo(tem +"= 0");
                //ETIQUETA FINAL
                resultado.Agregar_LineaCodigo(etq7+":");
                break;
            }
            default :{
                Informacion.ErrSemantico("No se puede usa '^' con estos tipos",this.line,this.col);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }

    private GenerarCodigo(op1: nodoCodigo, op2: nodoCodigo, signo: string, tipo:any): nodoCodigo{
        let resultado = new nodoCodigo();
        const etq1 = resultado.Crear_Etiqueta();
                const etq2 = resultado.Crear_Etiqueta();
                const etq3 = resultado.Crear_Etiqueta();
                
                resultado.Agregar_Codigo2(op1,op2);
                let tem = resultado.Crear_Temporal();
                resultado.EstablecerCabeza(tem,tipo);

                let line = "if( "+op1.cabeza+signo+op2.cabeza+") goto "+etq1;
                resultado.Agregar_LineaCodigo(line);
                line = "goto "+etq2;
                resultado.Agregar_LineaCodigo(line);

                // VERDADERO
                resultado.Agregar_LineaCodigo(etq1+":");
                line = tem +"= 1";
                resultado.Agregar_LineaCodigo(line);
                
                line = "goto "+etq3;
                resultado.Agregar_LineaCodigo(line);

                // FALSO
                resultado.Agregar_LineaCodigo(etq2+":");
                line = tem +"= 0";
                resultado.Agregar_LineaCodigo(line);
                //ETIQUETA FINAL
                resultado.Agregar_LineaCodigo(etq3+":");
        return resultado;
    }

}
// CODIGO CASI IDENTICO AL ANTERIOR SOLO CON ETIQUETAS CAMBIADAS
    /* 
    private GenerarCodigo2(op1: nodoCodigo, op2: nodoCodigo, signo: string, tipo:any): nodoCodigo{
        let resultado = new nodoCodigo();
        const etq1 = resultado.Crear_Etiqueta();
                const etq2 = resultado.Crear_Etiqueta();
                const etq3 = resultado.Crear_Etiqueta();
                
                resultado.Agregar_Codigo2(op1,op2);
                let tem = resultado.Crear_Temporal();
                resultado.EstablecerCabeza(tem,tipo);

                let line = "if( "+op1.cabeza+signo+op2.cabeza+") goto "+etq1;
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
        return resultado;
    } 
    */