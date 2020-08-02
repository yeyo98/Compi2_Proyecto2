import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { Exp } from '../Expresion/Exp';
import { auxExpresion } from '../Expresion/auxExpresion';
import { Informacion } from '../Datos/Informacion';
import { Instruccion } from '../nodoArbol/Instruccion';

export class Sentencia_if extends nodoAst{

    condicion: Exp;
    cuerpo: Instruccion;
    continuar: nodoAst|null;
    tipo: number;

    constructor(condicion: Exp, cuerpo: Instruccion, continuar: nodoAst|null, tipo:number, 
                line: number, col:number) {
        super(line,col);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.continuar = continuar;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        // OPTENGO EL CODIGO DE LA CONDICION
        let cond = this.condicion.Ejecutar(e);

        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if(cond.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cond;
        
        // SI NO ES UN BOOLEANO ERROR
        if(cond.tipo != auxExpresion.COMBINACION_TIPOS.BOOL){
            // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
            Informacion.ErrSemantico("Para la sentencia if se necesita un valor Booleano", 
            this.linea,this.columna);
            cond.BorrarError();
            return cond;
        }
        
        switch(this.tipo){
            case 1:{
                resultado = this.CodigoIf(cond,e);
                break;
            }
            case 2:{
                resultado = this.CodigoIfElse(cond,e);
                break;
            }
            case 3:{
                resultado = this.CodigoIfIfElse(cond,e);
                break;
            }
        }

        return resultado;
    }

    CodigoIf(cond: nodoCodigo, e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();

        // CREO EL NUEVO ENTORNO PARA EL CUERPO DEL IF
        let nuevoEntorno = new Entorno("if",e,e.contador);

        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if(cuerpo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;

        // SI TODO SALIO BIEN COMIENZO ARMAR EL IF
        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();

        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA IF =========== ");
        resultado.Agregar_CodigoNodo(cond);
        resultado.Agregar_LineaCodigo("if("+cond.cabeza+"==1) goto "+etq1);
        resultado.Agregar_LineaCodigo("goto "+etq2);
        resultado.Agregar_LineaCodigo(etq1+":");
            resultado.Agregar_CodigoNodo(cuerpo);
        resultado.Agregar_LineaCodigo(etq2+":");

        return resultado;
    }

    CodigoIfElse(cond: nodoCodigo, e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();

        // CREO EL NUEVO ENTORNO PARA EL CUERPO DEL IF
        let nuevoEntorno = new Entorno("if",e,e.contador);

        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if(cuerpo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;

        let cuerpoElse = this.continuar?.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if(cuerpoElse?.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpoElse;


        // SI TODO SALIO BIEN COMIENZO ARMAR EL IF
        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();

        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA IF =========== ");
        resultado.Agregar_CodigoNodo(cond);
        resultado.Agregar_LineaCodigo("if("+cond.cabeza+"==1) goto "+etq1);
        resultado.Agregar_LineaCodigo("goto "+etq2);
        resultado.Agregar_LineaCodigo(etq1+":");
            resultado.Agregar_CodigoNodo(cuerpo);
            resultado.Agregar_LineaCodigo("goto "+etq3);
        resultado.Agregar_LineaCodigo(etq2+":");
            if(cuerpoElse!= null)
                resultado.Agregar_CodigoNodo(cuerpoElse);
        resultado.Agregar_LineaCodigo(etq3+":");


        return resultado;
    }


    CodigoIfIfElse(cond: nodoCodigo, e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();

        // CREO EL NUEVO ENTORNO PARA EL CUERPO DEL IF
        let nuevoEntorno = new Entorno("if",e,e.contador);

        let cuerpo = this.cuerpo.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if(cuerpo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpo;

        let cuerpoElse = this.continuar?.Ejecutar(nuevoEntorno);
        // ==================== SI HUBO UN ERROR LO SUBO ==================== 
        if(cuerpoElse?.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return cuerpoElse;


        // SI TODO SALIO BIEN COMIENZO ARMAR EL IF
        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();

        resultado.Agregar_LineaCodigo("\n#=========== SENTENCIA IF =========== ");
        resultado.Agregar_CodigoNodo(cond);
        resultado.Agregar_LineaCodigo("if("+cond.cabeza+"==1) goto "+etq1);
        resultado.Agregar_LineaCodigo("goto "+etq2);
        resultado.Agregar_LineaCodigo(etq1+":");
            resultado.Agregar_CodigoNodo(cuerpo);
            resultado.Agregar_LineaCodigo("goto "+etq3);
        resultado.Agregar_LineaCodigo(etq2+":");
            if(cuerpoElse!= null)
                resultado.Agregar_CodigoNodo(cuerpoElse);
        resultado.Agregar_LineaCodigo(etq3+":");
        return resultado;
    }


    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const cabeza = "Sentencia_If";
        //resultado.Crear_NodoInicial("Sentencia_If")

        // OBTENGO NODO CONDICION
        let cond = this.condicion.Graficar();
        // OBTENGO NODO CUERPO
        let cuerpo = this.cuerpo.Graficar();

        resultado.Armar_NodoGrafica(cabeza,cond,cuerpo);
        if(this.continuar != null){
            // OBTENGO NODO SIGUIENTE
            let sig = this.continuar.Graficar();
            resultado.Armar_NodoGrafica(cabeza,sig,null);
        }

        return resultado;
    }
}