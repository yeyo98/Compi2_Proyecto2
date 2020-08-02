import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';
import { Casting } from '../../Expresion/Casteo/Casting';

export class Explicit extends nodoAst{
    valor: Exp;
    tipo: number;
    constructor(valor:Exp, tipo:number, line:number, col:number ) {
        super(line,col);
        this.valor = valor;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        let tipoVariable = this.SearchTipo();

        let valor = this.valor.Ejecutar(e);

        if(valor.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return valor;

        let combinacionTipo = auxExpresion.Evaluar_Tipos(tipoVariable,valor.tipo);

        switch(combinacionTipo){
            case auxExpresion.COMBINACION_TIPOS.CHAR_DOUBLE:{
                const tem1 = resultado.Crear_Temporal();
                const tem2 = resultado.Crear_Temporal();
                resultado.Agregar_CodigoNodo(valor);
                resultado.Agregar_LineaCodigo(tem1+"= "+valor.cabeza+"%1");
                resultado.Agregar_LineaCodigo(tem2+"= "+valor.cabeza+"-"+tem1)
                resultado.EstablecerCabeza(tem2,auxExpresion.COMBINACION_TIPOS.CHAR)
                //valor.tipo = auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.INTEGER_DOUBLE:{
                const tem1 = resultado.Crear_Temporal();
                const tem2 = resultado.Crear_Temporal();
                resultado.Agregar_CodigoNodo(valor);
                resultado.Agregar_LineaCodigo(tem1+"= "+valor.cabeza+"%1");
                resultado.Agregar_LineaCodigo(tem2+"= "+valor.cabeza+"-"+tem1)
                resultado.EstablecerCabeza(tem2,auxExpresion.COMBINACION_TIPOS.INTEGER)
                //valor.tipo = auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR_INTEGER:{
                valor.tipo = auxExpresion.COMBINACION_TIPOS.CHAR;
                return valor;
            }
            default:{
                Informacion.ErrSemantico("No existe este tipo de casteo",this.linea,this.columna);
                valor.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
                valor.BorrarError();
                return valor;
            }
        }
        return resultado;
    }

    private SearchTipo(): any{
        let tipo;
        switch (this.tipo) {
            case 1:{
                tipo = auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case 2:{
                tipo = auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case 3:{
                tipo = auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
        }
        return tipo;
    }


    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const cabeza = "Casteo";
        const tipo = new nodoGrafica();
        switch (this.tipo) {
            case 1:{
                tipo.Crear_NodoInicial("Double");
                break;
            }
            case 2:{
                tipo.Crear_NodoInicial("Integer");
                break;
            }
            case 3:{
                tipo.Crear_NodoInicial("Char");
                break;
            }
        }
        resultado.Armar_NodoGrafica(cabeza,tipo,null);
        resultado.Armar_NodoGrafica(cabeza,this.valor.Graficar(),null);
        return resultado;
    }

}