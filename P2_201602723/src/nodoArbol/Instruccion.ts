import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { auxExpresion } from '../Expresion/auxExpresion';
import { Informacion } from '../Datos/Informacion';
import { LlamarFuncion } from '../Funciones/Llamar_Funcion/LlamarFuncion';
import { CrearFuncion } from '../Funciones/Creacion_Funcion/CrearFuncion';

export class Instruccion extends nodoAst{
    listaInstrucciones: nodoAst[];

    constructor(nuevo: nodoAst, lista: nodoAst){
        super(0,0);
        this.listaInstrucciones = [];
        // TENGO QUE AGREGAR LAS LISTAS
        if(lista != null)
            this.listaInstrucciones = (<Instruccion> lista).listaInstrucciones;
        this.listaInstrucciones.push(nuevo);

    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        
        for(let elemento of this.listaInstrucciones){

            if(elemento instanceof CrearFuncion)
                continue;
                
            let aux = elemento.Ejecutar(e);
            
           // VERIFICO SI HUBO ALGUN ERROR
           if(aux.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return aux;
           
           resultado.Agregar_CodigoNodo(aux);
        }

        return resultado;
    }
/**
 * if(elemento instanceof LlamarFuncion){
                elemento.SetTemporales(resultado.listaTemporal);
            }
 */
    
    Graficar(): nodoGrafica {
        const raiz = new nodoGrafica();
        
        for(let elemento of this.listaInstrucciones ){
            const aux = elemento.Graficar();
            raiz.Armar_NodoGrafica("Instrucciones",aux,null);
        }

        return raiz;
    }

}