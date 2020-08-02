import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';
import { If } from '../If/If';
import { Asignacion } from '../Operacion/Asignacion';
import { Goto } from '../Goto/Goto';

export class Instruccion extends nodoAst{
    listaInstrucciones: nodoAst[];

    constructor(nuevo: nodoAst){
        super(0,0);
        this.listaInstrucciones = [];
        this.listaInstrucciones.push(nuevo);
    }
    
    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        let cont:number=0;
        for(cont=0; cont<this.listaInstrucciones.length ;cont++){
            let elemento = this.listaInstrucciones[cont];
            let aux = new nodoCodigo();
            if(elemento instanceof If){
                elemento.PasarArbol(cont,this.listaInstrucciones);
                aux = elemento.Ejecutar(e);
                cont = elemento.cont;   // ACTUALIZO EL CONTADOR
                cont--;
            }else if(elemento instanceof Goto){
                elemento.PasarArbol(cont,this.listaInstrucciones);
                aux = elemento.Ejecutar(e);
                cont = elemento.cont;   // ACTUALIZO EL CONTADOR
                
            }else if(elemento instanceof Asignacion){
                elemento.PasarArbol(cont,this.listaInstrucciones);
                aux = elemento.Ejecutar(e);
                cont = elemento.cont; // ACTUALIZO EL CONTADOR
            }else{
                aux = elemento.Ejecutar(e);
            }
            resultado.Agregar_CodigoNodo(aux);
        }
        
        return resultado;
    }

    Graficar(): nodoGrafica {
        const raiz = new nodoGrafica();
        
        for(let elemento of this.listaInstrucciones ){
            const aux = elemento.Graficar();
            raiz.Armar_NodoGrafica("Instrucciones",aux,null);
        }
        return raiz;
    }

}