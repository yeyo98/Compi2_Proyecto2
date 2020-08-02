import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Sentencia_Case } from './Sentencia_Case';

export class Sentencia_Switch extends nodoAst {

    cond: Exp;
    LCase: Sentencia_Case[];

    constructor(cond: Exp, lCase: Sentencia_Case[] ,line: number, col: number) {
        super(line,col);
        this.cond = cond;
        this.LCase = lCase;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        // EVALUO LA CONDICION
        let condicion = this.cond.Ejecutar(e);
        // SI HUBO UN ERROR SOLO SUBO EL NODO
        if(condicion.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return condicion;

        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA SWITCH =========== ");
        resultado.Agregar_CodigoNodo(condicion);

        const etqSalida = resultado.Crear_Etiqueta();
        for(let caso of this.LCase ){
            // LIMPIO LAS LISTAS PARA QUE YA NO SE REPITAN Y ME QUEDE SOLO CON LO QUE ME INTERESA
            condicion.listaTemporal = [];
            condicion.linea_Codigo = [];
            // ENVIO LA CONDICION
            caso.EnviarCondicion(condicion);
            caso.EnviarEtiqueta(etqSalida);
            // EJECUTO
            let cuerpoCaso = caso.Ejecutar(e);

            // EVALUO SI HUBO ALGUN ERROR
            if(cuerpoCaso.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return cuerpoCaso;
            
            resultado.Agregar_CodigoNodo(cuerpoCaso);
        }
        resultado.Agregar_LineaCodigo(etqSalida+":");
        
        return resultado;
    }

    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "Case";

        // OBTENGO LA GRAFICA DE LA CONDICION
        const cond = this.cond.Graficar();

        resultado.Armar_NodoGrafica(cabeza,cond,null);
        for(let caso of this.LCase){
            resultado.Armar_NodoGrafica( cabeza, caso.Graficar(),null );
        }

        return resultado;
    }
}