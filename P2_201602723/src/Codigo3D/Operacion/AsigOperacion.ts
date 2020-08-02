/**
 * 
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';
import { Relacional } from '../../Expresion/Relacional';
 */
import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { SumaResta } from './SumaResta';
import { MultiDivision } from './MultiDivision';

export class AsigOperacion extends nodoAst{

    id:string; 
    op1: string; 
    operador: any; 
    op2: string;
    constructor(id:string, op1:string, operador:any, op2:string, line:number, col:number){
        super(line,col);
        this.id = id;
        this.op1 = op1;
        this.operador = operador;
        this.op2 = op2;
    }
    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        let suma_resta = new SumaResta(this.linea,this.columna);
        let mul_divi = new MultiDivision(this.linea,this.columna);

        switch(this.operador){
            
            case Exp.OPERACION.suma:{
                resultado=suma_resta.Optimizar(this.id,this.op1,this.op2,true);
                break;
            }
            case Exp.OPERACION.resta:{
                resultado=suma_resta.Optimizar(this.id,this.op1,this.op2,false);
                break;
            }
            case Exp.OPERACION.multi:{
                resultado = mul_divi.OptimizarMulti(this.id,this.op1,this.op2);
                break;
            }
            case Exp.OPERACION.division:{
                resultado = mul_divi.OptimizarDivi(this.id,this.op1,this.op2);
                break;
            }
            default:{
                resultado.Agregar_LineaCodigo(this.id+"="+this.op1+AsigOperacion.Simbolo(this.operador)+this.op2);
                break;
            }
        }

        return resultado;
    }



    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "Asig"
        let aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica(cabeza,aux,null);
        
        const operacion = new nodoGrafica();
        const sig = AsigOperacion.Simbolo(this.operador) ;


        aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.op1);
        operacion.Armar_NodoGrafica(sig,aux,null);

        aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.op2);
        operacion.Armar_NodoGrafica(sig,aux,null);

        resultado.Armar_NodoGrafica(cabeza,operacion,null);

        return resultado;
    }

    static Simbolo(tipo: any):string{
        let resultado = "+";
        switch(tipo){
            case Exp.OPERACION.igualacion:{
                resultado ="==";
                break;
            }
            case Exp.OPERACION.diferencia:{
                resultado ="<>"
                break;
            }
            case Exp.OPERACION.mayor:{
                resultado =">"
                break;
            }
            case Exp.OPERACION.mayor_igual:{
                resultado =">="
                break;
            }
            case Exp.OPERACION.menor:{
                resultado ="<"
                break;
            }
            case Exp.OPERACION.menor_igual:{
                resultado ="<="
                break;
            }
            case Exp.OPERACION.suma:{
                resultado ="+"
                break;
            }
            case Exp.OPERACION.resta:{
                resultado ="-"
                break;
            }
            case Exp.OPERACION.multi:{
                resultado ="*"
                break;
            }
            case Exp.OPERACION.division:{
                resultado ="/"
                break;
            }
            case Exp.OPERACION.modulo:{
                resultado ="%"
                break;
            }
        }
        return resultado;
    }

}