import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Valor } from '../../Expresion/Valor';
import { Casting } from '../../Expresion/Casteo/Casting';

export class Inicio extends nodoAst{

    archivo: nodoAst;
    ins: nodoAst;
    constructor(archivos:nodoAst, ins: nodoAst){
        super(0,0);
        this.archivo = archivos;
        this.ins = ins;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        //Informacion.flagImport = true;
        resultado.Agregar_CodigoNodo( this.archivo.Ejecutar(e) );
        Informacion.flagImport = false;
        
        resultado.Agregar_CodigoNodo( this.ins.Ejecutar(e) );
        return resultado;
    }
    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        resultado.Armar_NodoGrafica("Inicio",this.archivo.Graficar(),this.ins.Graficar());
        return resultado;
    }

}