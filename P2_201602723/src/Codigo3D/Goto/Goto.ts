import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { AsigOperacion } from '../Operacion/AsigOperacion';
import { Etiqueta } from '../Etiqueta/Etiqueta';
import { If } from '../If/If';
import { Asignacion } from '../Operacion/Asignacion';
import { Informacion } from '../../Datos/Informacion';
import { Proc } from '../Proc/Proc';

export class Goto extends nodoAst{
    etiqueta:string; 

    // VARIABLES PARA SEGUIR CON EL CORRIMIENTO 
    listaInstrucciones: nodoAst[];
    cont:number;

    constructor(id:string, line:number, col:number){
        super(line,col);
        this.etiqueta = id;

        this.listaInstrucciones = [];
        this.cont = 0;
    }
    Ejecutar(e: Entorno): nodoCodigo {
        return this.Regla2_6();
    }

    Regla2_6(): nodoCodigo{
        let resultado = new nodoCodigo();
        let codigoOriginal = "goto "+this.etiqueta;
        let flag = false;
        let auxcuerpo = new nodoCodigo();
        let e = new Entorno("",null,0);

        let auxcont=0;
        this.cont++;
        for(auxcont=this.cont;auxcont<this.listaInstrucciones.length;auxcont++){
            let instruccion = this.listaInstrucciones[auxcont];

            if(flag){
                if(instruccion instanceof Goto){// SI ES CIERTO ES REGLA 6
                    this.cont = auxcont;
                    let aux = instruccion.Ejecutar(e);
                    resultado.Agregar_CodigoNodo(aux);
                    resultado.Agregar_CodigoNodo(auxcuerpo);
                    resultado.Agregar_CodigoNodo(aux);
                    const optimizacion = "goto "+instruccion.etiqueta;
                    Informacion.AddOptimizacion(
                        codigoOriginal+"... "+this.etiqueta+": "+optimizacion, 
                        optimizacion+"... "+this.etiqueta+": "+optimizacion,this.linea,this.columna,6);
                    return resultado;
                }else{// SI ES FALSO ES REGLA 2
                    auxcont--;
                    this.cont = auxcont;
                    let optimizacion = this.etiqueta+":";
                    resultado.Agregar_LineaCodigo(optimizacion);
                    Informacion.AddOptimizacion(
                        codigoOriginal+"..."+optimizacion, optimizacion,this.linea,this.columna,2);
                    return resultado;
                }
            }

            if(instruccion instanceof Etiqueta){
                let aux = instruccion.Ejecutar(e);
                if(this.etiqueta === aux.cabeza){    // SI SON IGUAL YA CUMPLE CON REGLA 2
                    flag = true;
                    auxcuerpo.Agregar_CodigoNodo(instruccion.Ejecutar(e));
                    continue;
                }else{  // SI NO ME SALGO
                    break;
                }

            }else if(instruccion instanceof Goto){
                auxcuerpo.Agregar_LineaCodigo( instruccion.SinOptimizar() );
            }else if(instruccion instanceof If){
                auxcuerpo.Agregar_LineaCodigo( instruccion.SinOptimizar() );
            }else if(instruccion instanceof Asignacion){
                auxcuerpo.Agregar_LineaCodigo( instruccion.SinOptimizar() );
            }else{
                auxcuerpo.Agregar_CodigoNodo(instruccion.Ejecutar(e));
            }
            /* else if(instruccion instanceof Proc){
                break;
            } */
        }
        /* if(flag){// VERIFICAR UNA ULTIMA VEZ PARA REGLA 2
            auxcont--;
            this.cont = auxcont;
            let optimizacion = this.etiqueta+":";
            resultado.Agregar_LineaCodigo(optimizacion);
            Informacion.AddOptimizacion(
            codigoOriginal+"..."+optimizacion, optimizacion,this.linea,this.columna,2);
            return resultado;
        } */
        resultado.Agregar_LineaCodigo(codigoOriginal);
        this.cont--;
        return resultado;
    }

    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.etiqueta);
        resultado.Armar_NodoGrafica("Goto",aux,null);
        return resultado;
    }

    PasarArbol(cont:number,lista:nodoAst[]):void{
        this.cont = cont;
        this.listaInstrucciones = lista;
    }
    
    SinOptimizar():string{
        return "goto "+this.etiqueta;
    }
}