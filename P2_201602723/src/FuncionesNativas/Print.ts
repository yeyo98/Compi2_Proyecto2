import { nodoAst } from "../Arbol/nodoAst";
import { Entorno } from "../Datos/Entorno/Entorno";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { auxExpresion } from "../Expresion/auxExpresion";
import { String } from "../Objectos/String";

export class Print extends nodoAst{

    exp: nodoAst;
    constructor(exp: nodoAst, line: number, col: number){
        super(line,col);
        this.exp = exp;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        let valor = this.exp.Ejecutar(e);

        // SI HAY ERROR SOLO SUBO
        if(valor.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return valor;
        
        resultado = this.Imprimir(valor);

        return resultado;
    }

    Imprimir(valor: nodoCodigo): nodoCodigo{
        let resultado = new nodoCodigo();
        resultado.Agregar_Codigo2(valor,null);
        resultado.Agregar_LineaCodigo("\n#=========== METODO PRINT ===========");

        // PRIMERO VERIFICO SI ES UN VALOR PRIMITIVO
        switch(valor.tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER:{
                resultado.Agregar_LineaCodigo('print("%i",'+valor.cabeza+')');
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE:{
                resultado.Agregar_LineaCodigo('print("%d",'+valor.cabeza+')');
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR:{
                resultado.Agregar_LineaCodigo('print("%c",'+valor.cabeza+')');
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL:{
                resultado.Agregar_LineaCodigo('print("%i",'+valor.cabeza+')');
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.STRING :{
                resultado.Agregar_CodigoNodo(  String.ImprimirCadena(valor.cabeza)  );
                break;
            }
            // AQUI DEVERIAN IR LAS OTRAS ESTRUCTURAS
            default :{

            }
        }
        //resultado.Agregar_LineaCodigo("#=========== FIN METODO PRINT ===========");
        return resultado;
    }






    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        let valor = this.exp.Graficar();
        resultado.Armar_NodoGrafica("print",valor,null);
        return resultado;
    }





}