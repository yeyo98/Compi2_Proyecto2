import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';

export class MultiDivision{
    line:number;
    col:number;
    constructor(line:number,col:number){this.line=line,this.col=col;} 
    
    OptimizarMulti(id:string,op1:string,op2:string):nodoCodigo{
        let resultado = new nodoCodigo();
        const operacion = id+"="+op1+"*"+op2;

        if(op2==='0' || op1==='0'){
            let nuevo = id+"=0";
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion.AddOptimizacion(operacion,nuevo,this.line,this.col,17);
        }else if(op2==='1'){
            if(id===op1){
                Informacion.AddOptimizacion(operacion,"Eliminado",this.line,this.col,10);
                return resultado;
            }else{
                resultado.Agregar_LineaCodigo(id+"="+op1)
                Informacion.AddOptimizacion(operacion,id+"="+op1,this.line,this.col,14);
            }

        }else if(op1==='1'){
            if(id===op2){
                Informacion.AddOptimizacion(operacion,"Eliminado",this.line,this.col,10);
                return resultado;
            }else{
                resultado.Agregar_LineaCodigo(id+"="+op2)
                Informacion.AddOptimizacion(operacion,id+"="+op2,this.line,this.col,14);
            }

        }else if(op2==='2'){
            let nuevo = id+"="+op1+"+"+op1;
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion.AddOptimizacion(operacion,nuevo,this.line,this.col,16);
        }else if(op1==='2'){
            let nuevo = id+"="+op2+"+"+op2;
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion.AddOptimizacion(operacion,nuevo,this.line,this.col,16);
        }else{
            resultado.Agregar_LineaCodigo(operacion);
        }

        return resultado;
    }

    OptimizarDivi(id:string,op1:string,op2:string):nodoCodigo{
        let resultado = new nodoCodigo();
        const operacion = id+"="+op1+"/"+op2;

        if(op1==='0'){
            let nuevo = id+"=0";
            resultado.Agregar_LineaCodigo(nuevo);
            Informacion.AddOptimizacion(operacion,nuevo,this.line,this.col,18);
        }else if(op2==='1'){
            if(id===op1){
                Informacion.AddOptimizacion(operacion,"Eliminado",this.line,this.col,11);
                return resultado;
            }else{
                resultado.Agregar_LineaCodigo(id+"="+op1)
                Informacion.AddOptimizacion(operacion,id+"="+op1,this.line,this.col,15);
            }

        }else{
            resultado.Agregar_LineaCodigo(operacion);
        }

        return resultado;
    }
}