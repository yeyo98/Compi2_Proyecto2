import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { AsigOperacion } from '../Operacion/AsigOperacion';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Goto } from '../Goto/Goto';
import { Informacion } from '../../Datos/Informacion';
import { If } from './If';
import { Etiqueta } from '../Etiqueta/Etiqueta';
import { Asignacion } from '../Operacion/Asignacion';

export class Regla3_7{
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
        const codigoOriginal = "if("+op1+AsigOperacion.Simbolo(operador)+op2+") goto "+id;
        
        let elemento = this.listaInstrucciones[this.cont];
        const e = new Entorno("",null,0);
        if(elemento instanceof Goto){   // SI TIENE UN GOTO APLICO REGLA 3
            const negado= this.Negar(op1,op2,operador);
            let optimizado = "if("+negado+") goto "+elemento.etiqueta;
            resultado.Agregar_LineaCodigo(optimizado);

            this.cont++;
            while(this.cont < this.listaInstrucciones.length){
                let aux = this.listaInstrucciones[this.cont++];
                // DEBO ENCONTRAR UNA ETIQUETA IGUAL
                if(aux instanceof Etiqueta){
                    let etq = aux.Ejecutar(e);
                    if(id === etq.cabeza)
                        continue;
                    resultado.Agregar_CodigoNodo(etq);
                    if(elemento.etiqueta === etq.cabeza)
                        break;
                }
                // CONDICIONES SOLO PARA IMPRIMIR EL CODIGO
                else if(aux instanceof If){
                    resultado.Agregar_LineaCodigo(aux.SinOptimizar());
                }else if(aux instanceof Goto){
                    resultado.Agregar_LineaCodigo(aux.SinOptimizar());
                }else if(elemento instanceof Asignacion){
                    resultado.Agregar_LineaCodigo(elemento.SinOptimizar());
                }
                // CUALQUIER OTRO SOLO LO AGREGO
                else{
                    resultado.Agregar_CodigoNodo( aux.Ejecutar(e) );
                }
            }
            Informacion.AddOptimizacion(
                codigoOriginal+" goto "+elemento.etiqueta,optimizado,this.line,this.col,3);
            return resultado;
            
        }else{ // SI NO APLICO REGLA 7
            // COMIENZO A BUSCAR LA ETIQUETA, LUEGO VER SI HAY UN GOTO
            let auxCuerpo = new nodoCodigo();
            let optimizado = "if("+op1+AsigOperacion.Simbolo(operador)+op2+") goto ";
            let flag = false;
            //this.cont--;

            for(let auxcont = this.cont; auxcont<this.listaInstrucciones.length ;auxcont++){
                elemento = this.listaInstrucciones[auxcont];

                if(flag){
                    if(elemento instanceof Goto){// SI ES CIERTO OPTIMIZO
                        auxCuerpo.Agregar_LineaCodigo("goto "+elemento.etiqueta);

                        this.cont = auxcont;
                        optimizado+=elemento.etiqueta;
                        resultado.Agregar_LineaCodigo(optimizado);
                        resultado.Agregar_CodigoNodo(auxCuerpo);
                        Informacion.AddOptimizacion(
                            codigoOriginal+" ..."+id+": goto "+elemento.etiqueta,
                            optimizado,this.line,this.col,7);
                        return resultado;
                    }else{ // SI NO CUMPLE DE UNA VEZ ME SALGO
                        break;
                    }
                }

                if(elemento instanceof Etiqueta){
                    let auxiliar = elemento.Ejecutar(e);
                    auxCuerpo.Agregar_CodigoNodo(auxiliar);
                    if(id === auxiliar.cabeza) // ANALIZO LA SIGUIENTE PARA VER SI ES UN GOTO
                        flag = true;
                    continue;
                }
                // CONDICIONES SOLO PARA IMPRIMIR EL CODIGO
                if(elemento instanceof Goto){
                    auxCuerpo.Agregar_LineaCodigo(elemento.SinOptimizar());
                }else if(elemento instanceof If){
                    auxCuerpo.Agregar_LineaCodigo(elemento.SinOptimizar());
                }else if(elemento instanceof Asignacion){
                    auxCuerpo.Agregar_LineaCodigo(elemento.SinOptimizar());
                }else{
                    auxCuerpo.Agregar_CodigoNodo(elemento.Ejecutar(e));
                }
            }
            // SI NO CUMPLIO CON NINGUNA, NO HAGO NADA

        }
        resultado.Agregar_LineaCodigo(codigoOriginal);
        return resultado;
    }

    private Negar(op1:string, op2:string, operador:any):string{
        let resultado = "";
        switch(operador){
            case Exp.OPERACION.menor_igual:{ 
                resultado=op1+">="+op2;
                break;
            }
            case Exp.OPERACION.mayor_igual:{ 
                resultado=op1+"<="+op2;
                break;
            }
            case Exp.OPERACION.menor:{ 
                resultado=op1+">"+op2;
                break;
            }
            case Exp.OPERACION.mayor:{ 
                resultado=op1+"<"+op2;
                break;
            }
            case Exp.OPERACION.igualacion:{ 
                resultado=op1+"<>"+op2;
                break;
            }
            case Exp.OPERACION.diferencia:{ 
                resultado=op1+"=="+op2;
                break;
            }
        }
        return resultado;
    }


}   


/**
 * // COMIENZO A BUSCAR LA ETIQUETA, LUEGO VER SI HAY UN GOTO
let auxcont = this.cont;
let auxCuerpo = new nodoCodigo();
let auxiliar = new nodoCodigo();
let optimizado = "if("+op1+AsigOperacion.Simbolo(operador)+op2+") goto ";

while(auxcont < this.listaInstrucciones.length){
    if(elemento instanceof Etiqueta){
        auxiliar = elemento.Ejecutar(e);
        auxCuerpo.Agregar_CodigoNodo(auxiliar);
        if(id === auxiliar.cabeza)
        {
            // ANALIZO LA SIGUIENTE PARA VER SI ES UN GOTO
            auxcont++;
            if(auxcont < this.listaInstrucciones.length){
                elemento = this.listaInstrucciones[auxcont];
                if(elemento instanceof Goto){// SI ES CIERTO OPTIMIZO
                    auxCuerpo.Agregar_LineaCodigo("goto "+elemento.etiqueta);

                    this.cont = auxcont;
                    optimizado+=elemento.etiqueta;
                    resultado.Agregar_LineaCodigo(optimizado);
                    resultado.Agregar_CodigoNodo(auxCuerpo);
                    Informacion.AddOptimizacion(
                        codigoOriginal+" ..."+id+": goto "+elemento.etiqueta,
                        optimizado,this.line,this.col,7);
                    return resultado;
                }else{
                    // SI NO CUMPLE DE UNA VEZ ME SALGO
                    break;
                }
            }
        }else{
            auxcont++;
            if(auxcont < this.listaInstrucciones.length){
                elemento = this.listaInstrucciones[auxcont]; continue;
            }else
                break;}
    }
    // CONDICIONES SOLO PARA IMPRIMIR EL CODIGO
    if(elemento instanceof Goto){
        auxCuerpo.Agregar_LineaCodigo(elemento.SinOptimizar());
    }else if(elemento instanceof If){
        auxCuerpo.Agregar_LineaCodigo(elemento.SinOptimizar());
    }else if(elemento instanceof Asignacion){
        auxCuerpo.Agregar_LineaCodigo(elemento.SinOptimizar());
    }else{
        auxCuerpo.Agregar_CodigoNodo(elemento.Ejecutar(e));
    }
    auxcont++;
    if(auxcont < this.listaInstrucciones.length){
        elemento = this.listaInstrucciones[auxcont];
    }else
        break;
}
// SI NO CUMPLIO CON NINGUNA, NO HAGO NADA

 */