import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { AsigOperacion } from '../Operacion/AsigOperacion';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Goto } from '../Goto/Goto';
import { Informacion } from '../../Datos/Informacion';

export class Regla4_5{
    // VARIABLES PARA SEGUIR CON EL CORRIMIENTO 
    listaInstrucciones: nodoAst[];
    cont:number;

    line:number;
    col:number;
    constructor(cont:number,lista:nodoAst[],line:number, col:number){
        this.listaInstrucciones = lista;
        this.cont = cont;
        this.line=line; this.col=col;
    }

    Optimizar(op1:string, op2:string, operador:any,id:string):nodoCodigo{
        const resultado = new nodoCodigo();
        const condicion = this.Operar(op1,op2,operador);
        const codigo = "if("+op1+AsigOperacion.Simbolo(operador)+op2+") goto "+id;
        
        if(condicion){// APLICO LA REGLA 4
            //VERIFICO SI EL SIGUIENTE ES UN GOTO
            const elemento = this.listaInstrucciones[this.cont];
            const optimizado = "goto "+id;
            if(elemento instanceof Goto){
                this.cont++;
                resultado.Agregar_LineaCodigo(optimizado);
                Informacion.AddOptimizacion(codigo+" goto "+elemento.etiqueta,optimizado,this.line,this.col,4);
                return resultado;
            }
            resultado.Agregar_LineaCodigo(optimizado);
            Informacion.AddOptimizacion(codigo,optimizado,this.line,this.col,4);
        }else{// APLICO LA REGLA 5
            const elemento = this.listaInstrucciones[this.cont];
            if(elemento instanceof Goto){
                this.cont++;
                const optimizado = "goto "+elemento.etiqueta;
                resultado.Agregar_LineaCodigo(optimizado);
                Informacion.AddOptimizacion(codigo+" goto "+elemento.etiqueta,optimizado,this.line,this.col,5);
                return resultado;
            }
            Informacion.AddOptimizacion(codigo,"Eliminado",this.line,this.col,5);
        }
        return resultado;
    }


    private Operar(op1:string, op2:string, operador:any):boolean{
        let resultado = false;
        switch(operador){
            case Exp.OPERACION.menor_igual:{ 
                resultado = parseInt(op1) <= parseInt(op2);
                break;
            }
            case Exp.OPERACION.mayor_igual:{ 
                resultado = parseInt(op1) >= parseInt(op2);
                break;
            }
            case Exp.OPERACION.menor:{ 
                resultado = parseInt(op1) < parseInt(op2);
                break;
            }
            case Exp.OPERACION.mayor:{ 
                resultado = parseInt(op1) > parseInt(op2);
                break;
            }
            case Exp.OPERACION.igualacion:{ 
                resultado = parseInt(op1) == parseInt(op2);
                break;
            }
            case Exp.OPERACION.diferencia:{ 
                resultado = parseInt(op1) != parseInt(op2);
                break;
            }
        }
        return resultado;
    }

}