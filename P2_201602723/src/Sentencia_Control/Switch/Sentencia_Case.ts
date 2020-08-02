import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Relacional } from '../../Expresion/Relacional';

export class Sentencia_Case extends nodoAst{
    
    caso: Exp|null;
    cuerpo: nodoAst;
    tipo: boolean;

    cabezaCond: nodoCodigo | undefined;
    etqSalto: string = "";

    constructor(caso: Exp|null,cuerpo: nodoAst ,tipo: boolean,line:number, col:number) {
        super(line,col);
        this.caso = caso;
        this.cuerpo = cuerpo;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        /**
         * NOTA AQUI SE DA EL INTERCAMBIO DE ETIQUETAS
         *  ES PORQUE GUARDO CUERPO DESPUES, PERO SUS ETIQUETAS FUERON CREADAS MUCHO ANTES QUE LAS DEMAS
         */
        // ================= CREO UN NUEVO ENTORNO =================
        let nuevoEntorno = new Entorno("case",e,e.contador);
        nuevoEntorno.GuardarEtiqueta(this.etqSalto);
        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);

        // EVALUO SI VIENE UN ERROR
        if(cuerpo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;
        

        // EVALUO QUE TIPO ES
        if(this.tipo)
            return this.EjecutarCaso(this.cabezaCond,cuerpo,nuevoEntorno);
        
        return cuerpo;
    }


    EjecutarCaso(cond: nodoCodigo|undefined,cuerpo: nodoCodigo, e: Entorno):nodoCodigo{
        const resultado = new nodoCodigo();

        const relacion = new Relacional(this.linea,this.columna);
        if(cond != undefined && this.caso != null){
            // EJECUTO EL VALOR DEL CASO
            let valorCaso = this.caso.Ejecutar(e);
            // ANALIZO QUE TODO HAYA IDO BIEN
            if(valorCaso.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return valorCaso;

            // HAGO LA COMPARACION
            let aux = relacion.Traducir_Igualacion(cond, valorCaso);

            resultado.Agregar_LineaCodigo("#=========== CASE =========== ");
            // AGREGO EL CODIGO NECESARIO PARA LA COMPARACION
            //resultado.Agregar_Codigo2(valorCaso,aux);
            resultado.Agregar_CodigoNodo(aux);
            const etq1 = resultado.Crear_Etiqueta();
            const etq2 = resultado.Crear_Etiqueta();

            resultado.Agregar_LineaCodigo("if("+aux.cabeza+"== 1) goto "+etq1);
            resultado.Agregar_LineaCodigo("goto "+etq2)
            resultado.Agregar_LineaCodigo(etq1+":")
                resultado.Agregar_CodigoNodo(cuerpo);
            resultado.Agregar_LineaCodigo(etq2+":");
        }

        return resultado;
    }




    EnviarCondicion(cond: nodoCodigo):void{
        this.cabezaCond = cond;
    }

    EnviarEtiqueta(etq: string):void{
        this.etqSalto = etq;
    }

    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const cabeza = "Case";
        // OBTENGO EL NODO DEL CUERPO
        let cuerpo = this.cuerpo.Graficar();

        // PARA GRAFICAR EL DEFAULT
        if(!this.tipo){
            const defecto = new nodoGrafica();
            defecto.Crear_NodoInicial("Default");

            resultado.Armar_NodoGrafica(cabeza,defecto,cuerpo);
            return resultado;
        }
        const cond = this.caso?.Graficar();

        if(cond != null)
            resultado.Armar_NodoGrafica(cabeza,cond,cuerpo);

        return resultado;
    }
}
