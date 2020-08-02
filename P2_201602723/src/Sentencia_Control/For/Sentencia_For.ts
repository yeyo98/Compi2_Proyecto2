import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';

export class Sentencia_For extends nodoAst{

    inicio: nodoAst|null;
    cond: nodoAst|null;
    final: nodoAst|null;
    cuerpo: nodoAst;

    constructor(inicio: nodoAst|null, cond: nodoAst|null, final: nodoAst|null, cuerpo: nodoAst,
                    line: number, col:number){
        super(line,col);
        this.inicio = inicio;
        this.cond = cond;
        this.final = final;
        this.cuerpo = cuerpo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        const resultado = new nodoCodigo();
        
        const etq1 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();
        const etqContinue = resultado.Crear_Etiqueta();

        // ================= CREO UN NUEVO ENTORNO =================
        let nuevoEntorno = new Entorno("for",e,e.contador);
        nuevoEntorno.GuardarEtiqueta(etq3);
        nuevoEntorno.GuardarContinue(etqContinue);

        let inicio;
        if(this.inicio != null){
            inicio = this.inicio.Ejecutar(nuevoEntorno);
            // VERIFICO QUE NO HAY ALGUN ERROR
            if(inicio.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return inicio;
        }

        let condicion;
        if(this.cond != null){
            condicion = this.cond.Ejecutar(nuevoEntorno);
            // VERIFICO QUE NO HAYA ERROR
            if(condicion.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return condicion;
            // VERIFICO QUE VENGA UN BOOLEANO
            if(condicion.tipo != auxExpresion.COMBINACION_TIPOS.BOOL){
                Informacion.ErrSemantico("Se necesita un valor Booleano en la condicion del For", 
                        this.cond.linea,this.cond.columna);
                resultado.BorrarError();
                return resultado;
            }
        }
        
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // VERIFICO QUE NO HAYA ERROR
        if(cuerpo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
            
        let final;
        if(this.final != null){
            final = this.final.Ejecutar(nuevoEntorno);
            // VERIFICO QUE NO HAYA ALGUN ERROR
            if(final.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return final;
        }

        // CONSTRUYO EL CODIGO
        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA FOR ===========");
        // AGREGO EL INICIO SI ES QUE HAY UNO
        if(inicio != null)
            resultado.Agregar_CodigoNodo(inicio);
        resultado.Agregar_LineaCodigo(etq1+":");
        // AGREGO LA CONDICION SI ES QUE HAY UNO
            if(condicion != null){
                const etq2 = resultado.Crear_Etiqueta();
                resultado.Agregar_CodigoNodo(condicion);
                resultado.Agregar_LineaCodigo("if("+condicion.cabeza+"== 1) goto "+etq2);
                resultado.Agregar_LineaCodigo("goto "+etq3);
            
                resultado.Agregar_LineaCodigo(etq2+":");
            }
            // AGREGO EL CUERPO
            resultado.Agregar_CodigoNodo(cuerpo);

            resultado.Agregar_LineaCodigo(etqContinue+":");
        // AGREGO EL FINAL SI ES QUE HAY UNO
            if(final != null)
                resultado.Agregar_CodigoNodo(final);
            resultado.Agregar_LineaCodigo("goto "+etq1);
        resultado.Agregar_LineaCodigo(etq3+":");

        return resultado;
    }




    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "For";

        if(this.inicio != null){
            resultado.Armar_NodoGrafica(cabeza, this.inicio.Graficar(), null );
        }

        if(this.cond != null){
            resultado.Armar_NodoGrafica(cabeza, this.cond.Graficar(), null);
        }

        if(this.final != null){
            resultado.Armar_NodoGrafica(cabeza, this.final.Graficar(), null);
        }

        resultado.Armar_NodoGrafica(cabeza, this.cuerpo.Graficar(), null);

        return resultado;
    }

}