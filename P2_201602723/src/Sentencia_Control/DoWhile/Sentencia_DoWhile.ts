import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';

export class Sentencia_DoWhile extends nodoAst{

    cond: Exp;
    cuerpo: nodoAst;

    constructor(cond: Exp,cuerpo: nodoAst,line: number, col: number) {
        super(line,col);
        this.cond = cond;
        this.cuerpo = cuerpo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();

        const etq1 = resultado.Crear_Etiqueta();
        const etqSalida = resultado.Crear_Etiqueta();
        //const etq3 = resultado.Crear_Etiqueta();

        const condicion = this.cond.Ejecutar(e);
        // VERIFICO QUE NO HAYA ERROR
        if(condicion.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return condicion;
        // VERIFICO QUE VENGA UN BOOLEANO
        if(condicion.tipo != auxExpresion.COMBINACION_TIPOS.BOOL){
            Informacion.ErrSemantico("Se necesita un valor Booleano en la condicion del DoWhile", 
                    this.cond.linea,this.cond.columna);
            resultado.BorrarError();
            return resultado;
        }
        
        // ================= CREO UN NUEVO ENTORNO =================
        let nuevoEntorno = new Entorno("dowhile",e,e.contador);
        nuevoEntorno.GuardarEtiqueta(etqSalida);
        nuevoEntorno.GuardarContinue(etq1);

        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // VERIFICO QUE NO HAYA ERROR
        if(cuerpo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        
        // CONSTRUYO EL CODIGO
        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA DoWHILE ===========");
        resultado.Agregar_LineaCodigo(etq1+":");
            resultado.Agregar_CodigoNodo(cuerpo);

            resultado.Agregar_CodigoNodo(condicion);
            resultado.Agregar_LineaCodigo("if("+condicion.cabeza+"== 1) goto "+etq1);
            resultado.Agregar_LineaCodigo(etqSalida+":");
            /* resultado.Agregar_LineaCodigo("goto "+etq3);
            resultado.Agregar_LineaCodigo(etq2+":");
            resultado.Agregar_LineaCodigo("goto "+etq1);
            resultado.Agregar_LineaCodigo(etq3+":"); */
        return resultado;
    }


    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "DoWhile";
        
        // GRAFICO EL CUERPO
        const cuerpo = this.cuerpo.Graficar();
        // GRAFICO LA CONDICION
        const condicion = this.cond.Graficar();

        resultado.Armar_NodoGrafica(cabeza,cuerpo,condicion);

        return resultado;
    }
}