import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';

export class Cabecera extends nodoAst{

    variable: nodoAst;
    //stack: nodoAst;
    //heap: nodoAst;
    //ptr1: nodoAst;
    //ptr2: nodoAst;
    cuerpo: nodoAst;

    constructor(variable: nodoAst, cuerpo: nodoAst){
        super(0,0);
        this.variable = variable;
        /*this.stack = stack;
        this.heap = heap;
        this.ptr1 = ptr1;
        this.ptr2 = ptr2;*/
        this.cuerpo = cuerpo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        resultado.Agregar_CodigoNodo(this.variable.Ejecutar(e));
        /*resultado.Agregar_CodigoNodo(this.stack.Ejecutar(e));
        resultado.Agregar_CodigoNodo(this.heap.Ejecutar(e));
        resultado.Agregar_CodigoNodo(this.ptr1.Ejecutar(e));
        resultado.Agregar_CodigoNodo(this.ptr2.Ejecutar(e));*/
        resultado.Agregar_CodigoNodo(this.cuerpo.Ejecutar(e));
        return resultado;
    }
    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "Inicio";

        // AGREGO TEMPS Y STACK
        resultado.Armar_NodoGrafica(cabeza,this.variable.Graficar(),this.cuerpo.Graficar());
        // AGREGO HEAP Y PTR1
        /*resultado.Armar_NodoGrafica(cabeza,this.heap.Graficar(),this.ptr1.Graficar());
        // AGREGO PTR2 Y CUERPO
        resultado.Armar_NodoGrafica(cabeza, this.ptr2.Graficar(),this.stack.Graficar());*/
        return resultado;
    }
}