import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { AsigOperacion } from '../Operacion/AsigOperacion';
import { Goto } from '../Goto/Goto';
import { If } from '../If/If';
import { Etiqueta } from '../Etiqueta/Etiqueta';
import { Informacion } from '../../Datos/Informacion';

export class Asignacion extends nodoAst{
    id:string; 
    valor:string;

    // VARIABLES PARA SEGUIR CON EL CORRIMIENTO 
    listaInstrucciones: nodoAst[];
    cont:number;

    constructor(id:string, valor:string, line:number, col:number){
        super(line,col);
        this.id = id;
        this.valor = valor;

        this.listaInstrucciones = [];
        this.cont = 0;
    }
    Ejecutar(e: Entorno): nodoCodigo {
        return this. Regla1();
    }

    Regla1():nodoCodigo{
        let resultado = new nodoCodigo();
        let codigoOriginal = this.id +"="+this.valor;
        //let flag = false;
        let auxcuerpo = new nodoCodigo();
        let e = new Entorno("",null,0);

        
        this.cont++;
        for(let auxcont=this.cont;auxcont<this.listaInstrucciones.length;auxcont++){
            let instruccion = this.listaInstrucciones[auxcont];
            

            if(instruccion instanceof Asignacion){
                if( ((instruccion.id === this.id) && (instruccion.valor === this.valor)) ||
                ((this.id === instruccion.valor) && (this.valor === instruccion.id))   )
                { // SI CUMPLE HAY REDUNDANCIA
                    this.cont = auxcont;
                    resultado.Agregar_LineaCodigo(codigoOriginal);
                    resultado.Agregar_CodigoNodo(auxcuerpo);
                    Informacion.AddOptimizacion(
                        codigoOriginal+"... "+instruccion.id+"= "+instruccion.valor, 
                        codigoOriginal,instruccion.linea,instruccion.columna,1);
                    return resultado;
                }else if(this.id === instruccion.id || this.id === instruccion.valor){// SI CUMPLE YA SE USO
                    break;
                }else if(this.valor === instruccion.id || this.valor === instruccion.valor){// SI CUMPLE YA SE USO
                    break;
                }
                
                auxcuerpo.Agregar_LineaCodigo(instruccion.id+"="+instruccion.valor);

            }else if(instruccion instanceof Goto){
                auxcuerpo.Agregar_LineaCodigo( instruccion.SinOptimizar() );
                //break;
            }else if(instruccion instanceof If){
                auxcuerpo.Agregar_LineaCodigo( instruccion.SinOptimizar() );
            }else if(instruccion instanceof Etiqueta){// ME SALGO
                break;
            }else{
                auxcuerpo.Agregar_CodigoNodo(instruccion.Ejecutar(e));
            }
        }
        resultado.Agregar_LineaCodigo(codigoOriginal);
        this.cont--;
        return resultado;
    }


    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const id = new nodoGrafica();
        id.Crear_NodoInicial(this.id);
        const valor = new nodoGrafica();
        valor.Crear_NodoInicial(this.valor);

        resultado.Armar_NodoGrafica("Asig",id,valor);
        return resultado;
    }
    
    SinOptimizar():string{
        return this.id+"= "+this.valor;
    }

    PasarArbol(cont:number,lista:nodoAst[]):void{
        this.cont = cont;
        this.listaInstrucciones = lista;
    }
}