import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';

export class SumaResta{
    line:number;
    col:number;
    constructor(line:number,col:number){this.line=line,this.col=col;}  

    Optimizar(id:string,op1:string,op2:string,tipo:boolean):nodoCodigo{
        let resultado = new nodoCodigo();
        const signo = (tipo)?'+':'-';
        const operacion = id+"="+op1+signo+op2;
        // SI ES CERO COMIENZO APLICAR ALGUNA REGLA
        if(op2==='0'){
            //AHORA ANALIZO SI ID Y OP1 SON IGUALES
            if(id===op1){
                const aux = (tipo)?8:9;
                Informacion.AddOptimizacion(operacion,"Eliminado",this.line,this.col,aux);
                return resultado;
            }else{
                const aux = (tipo)?12:13;
                resultado.Agregar_LineaCodigo(id+"="+op1)
                Informacion.AddOptimizacion(operacion,id+"="+op1,this.line,this.col,aux);
            }
        }else if(op1==='0'){
            //AHORA ANALIZO SI ID Y OP1 SON IGUALES
            if(id===op2){
                const aux = (tipo)?8:9;
                Informacion.AddOptimizacion(operacion,"Eliminado",this.line,this.col,aux);
                return resultado;
            }else{
                const aux = (tipo)?12:13;
                resultado.Agregar_LineaCodigo(id+"="+op2)
                Informacion.AddOptimizacion(operacion,id+"="+op2,this.line,this.col,aux);
            }
        }else{
            resultado.Agregar_LineaCodigo(operacion);
        }
        return resultado;
    }
}