import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { AsigOperacion } from '../Operacion/AsigOperacion';
import { Regla4_5 } from './Regla4_5';
import { Regla3_7 } from './Regla3_7';

export class If extends nodoAst{
    op1: string;
    op2: string;
    operador: any;
    etiqueta:string; 

    // VARIABLES PARA SEGUIR CON EL CORRIMIENTO 
    listaInstrucciones: nodoAst[];
    cont:number;

    constructor(op1:string, op2:string, operador:any,id:string, line:number, col:number){
        super(line,col);
        this.op1 = op1;
        this.op2 = op2;
        this.operador = operador;
        this.etiqueta = id;

        this.listaInstrucciones = [];
        this.cont = 0;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        resultado = this.Analizar_Regla();

        return resultado;
    }

    Analizar_Regla(): nodoCodigo{
        let resultado = new nodoCodigo();

        // SI AMBOS SON CONSTANTES NUMERICOS ANALIZO REGLA 4 O 5
        if(!isNaN( parseInt(this.op1,10)) && !isNaN( parseInt(this.op2,10)) ){
            this.cont++;
            const regla = new Regla4_5(this.cont,this.listaInstrucciones,this.linea,this.columna);
            resultado = regla.Optimizar(this.op1,this.op2,this.operador,this.etiqueta);
            this.cont = regla.cont;
            //this.cont--;
        }
        // SI NO ANALIZO REGLA 3 O 7
        else{
            this.cont++;
            const regla = new Regla3_7(this.cont,this.listaInstrucciones,this.linea,this.columna);
            resultado = regla.Optimizar(this.op1,this.op2,this.operador,this.etiqueta);
            this.cont = regla.cont;
            //this.cont--;
        }

        return resultado;
    }
    

    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "IF";
        
        let aux = new nodoGrafica();

        const operacion = new nodoGrafica();
        const sig = AsigOperacion.Simbolo(this.operador) ;

        aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.op1);
        operacion.Armar_NodoGrafica(sig,aux,null);

        aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.op2);
        operacion.Armar_NodoGrafica(sig,aux,null);

        
        aux = new nodoGrafica();
        aux.Crear_NodoInicial(this.etiqueta);
        resultado.Armar_NodoGrafica(cabeza,operacion,aux);

        return resultado;
    }

    PasarArbol(cont:number,lista:nodoAst[]):void{
        this.cont = cont;
        this.listaInstrucciones = lista;
    }

    SinOptimizar():string{
        return "if("+this.op1+AsigOperacion.Simbolo(this.operador)+this.op2+") goto "+this.etiqueta;
    }

}
