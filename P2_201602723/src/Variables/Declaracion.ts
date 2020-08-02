import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { Tipo } from "./Tipo";
import { Exp } from '../Expresion/Exp';
import { auxExpresion } from '../Expresion/auxExpresion';
import { Informacion } from '../Datos/Informacion';
//import { auxDecla } from './auxDecla';
import { String } from '../Objectos/String';
import { Casting } from '../Expresion/Casteo/Casting';
import { ListaArreglo } from '../Arreglos/ListaArreglo';

export class Declaracion extends nodoAst{
    tipo: Tipo;
    ids: string[];
    tipoDecla: number;
    exp: Exp|null;


    constructor(tipo:Tipo, ids:string[], exp: Exp|null, tipoDecla:number, line:number, col:number) {
        super(line, col);
        this.tipo = tipo;
        this.ids = ids;
        this.tipoDecla = tipoDecla;
        this.exp = exp;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        //const resultado = new nodoCodigo();
        // PRIMERO ANALIZO SI ES ARREGLO
        if(this.tipo.arreglo)
            return this.GuardarArreglo(e);

        return this.GuardarVariable(e);
    }

    private GuardarVariable(e: Entorno): nodoCodigo{
        const resultado = new nodoCodigo();
        const tipoVariable = auxExpresion.GetTipo(this.tipo.tipo);;
        
        // ======================= SI ES NULL DE UNA VEZ LO GUARDO ======================= 
        if(this.exp == null){
            return this.VariableSinValor(e,tipoVariable);
        }
        else{
            // SI NO, OPERO Y ANALIZO
            let exp = this.exp.Ejecutar(e);

            // SI HUBO UN ERROR SUBIRLO
            if(exp.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return exp;

            // ======================= PRIMERO COMPRUEBO SI ES UN TIPO PRIMITIVO =======================
            if( !auxExpresion.IsPrimity(tipoVariable) ){
                // AQUI LLAMO UN METODO PARA LAS VARIABLES QUE NO SON PRIMITIVOS
                return this.VariableNoPrimitivo(e);
            }

            // COMPRUEBO SI LOS TIPO SON LO CORRECTOS
            if(tipoVariable != exp.tipo){
                /* SI NO SON IGUALES, TENDRIA QUE LLAMAR UN METODO DE CASTEO
                    PARA VER SI AUN SE PUEDE
                */
                exp = Casting.CasteoImplicito(tipoVariable,exp);
    
                if(exp.tipo == auxExpresion.COMBINACION_TIPOS.ERR){
                    Informacion.ErrSemantico("No se puede declarar la variable, los tipos no son los mismo", 
                        this.linea,this.columna);
                    resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
                    return resultado;
                }
            }

            // AGREGO EL CODIGO GENERADO DE LA EXPRESION
            resultado.Agregar_CodigoNodo( exp );
            resultado.Agregar_LineaCodigo("#=========== DECLARACION VARIABLES ===========");

            for(let id of this.ids){
                if(e.contador!=0){
                    let tem = resultado.Crear_Temporal();
                    resultado.Agregar_LineaCodigo(tem+"= P+"+e.contador);
                    resultado.Agregar_LineaCodigo( "Stack["+tem+"] = "+exp.cabeza );
                }else{
                    resultado.Agregar_LineaCodigo( "Stack[P] = "+exp.cabeza );
                }
                // AHORA LO AGREGO AL ENTORNO
                if( e.Agregar(id,tipoVariable,Entorno.ROL.VARIABLE_LOCAL,1) ){
                    // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                    Informacion.ErrSemantico("No se puede Declarar 2 variables con el mismo nombre en un mismo ambito", 
                            this.linea,this.columna);
                    resultado.BorrarError();
                    return resultado;
                }
            }
        }
        //resultado.Agregar_LineaCodigo("#=========== FIN DECLARACION VARIABLES ===========");
        return resultado;
    }


    private VariableSinValor(e: Entorno, tipo: any): nodoCodigo {
        const resultado = new nodoCodigo();
        resultado.Agregar_LineaCodigo("\n#=========== DECLARACION VARIABLES ===========");

        let valDefault ="";
        // PRIMERO VERIFICO SI ES UN STRING
        if(tipo == auxExpresion.COMBINACION_TIPOS.STRING){
            let defecto = String.GuardarDefault();
            valDefault = defecto.cabeza;
            resultado.Agregar_CodigoNodo( defecto );
        }else{
            valDefault = auxExpresion.GetDefault(tipo);
        }

        for(let id of this.ids){


            if(e.contador!=0){
                let tem = resultado.Crear_Temporal();
                resultado.Agregar_LineaCodigo(tem+"= P+"+e.contador);
                resultado.Agregar_LineaCodigo( "Stack["+tem+"] = "+valDefault );
            }else{
                resultado.Agregar_LineaCodigo( "Stack[P] = "+valDefault );
            }
            // AHORA LO AGREGO AL ENTORNO
            if( e.Agregar(id,tipo,Entorno.ROL.VARIABLE_LOCAL,1) ){
                // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                Informacion.ErrSemantico("No se puede Declarar 2 variables con el mismo nombre en un mismo ambito", 
                        this.linea,this.columna);
                resultado.BorrarError();
                return resultado;
            }
        }
        return resultado;
    }



    private GuardarArreglo(e: Entorno): nodoCodigo{
        const resultado = new nodoCodigo();
        if(this.exp instanceof ListaArreglo){
            const tipoVariable = auxExpresion.GetTipo(this.tipo.tipo);;
            this.exp.SetTipo(tipoVariable);

            let aux = this.exp.Ejecutar(e);
            if(aux.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return aux;
            
            resultado.Agregar_CodigoNodo(aux);

            for(let id of this.ids){
                // AHORA LO AGREGO AL ENTORNO
                if( e.Agregar(id,tipoVariable,Entorno.ROL.VARIABLE_LOCAL,this.exp.cont) ){
                    // SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR
                    Informacion.ErrSemantico("No se puede Declarar 2 Arreglos con el mismo nombre en un mismo ambito", 
                            this.linea,this.columna);
                    resultado.BorrarError();
                    return resultado;
                }
            }
            
        
        }
        else{
            Informacion.ErrSemantico("No se puede Declarar un arreglo con esta expresion", 
                    this.linea,this.columna);
            resultado.BorrarError();
            return resultado;
        }

        return resultado;
    }


    VariableNoPrimitivo(e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();

        // COMPRUEBO QUE SEA STRING
        if(this.tipo.tipo.toLowerCase() == "string"){

        }


        return resultado;
    }








    

    Graficar(): nodoGrafica {
        const resultado = new nodoGrafica();
        const tipo = new nodoGrafica();

        const cabeza = "Decla";

        // NODO DEL TIPO
        tipo.Crear_NodoInicial(this.tipo.tipo);
        resultado.Armar_NodoGrafica(cabeza,tipo,null);

        /* if(this.tipo.arreglo != null)
        {
            // NODO DEL ARREGLO
            const arreglo = this.tipo.arreglo.Graficar();
            resultado.Armar_NodoGrafica(cabeza,arreglo,null);
        } */
        // AGREGANDO LOS IDS
        for(let id of this.ids){
            const nombre = new nodoGrafica();
            nombre.Crear_NodoInicial(id);
            resultado.Armar_NodoGrafica(cabeza,nombre,null);
        }


        // AGREGANDO EXP SI EXISTE
        if(this.exp != null){
            const exp = this.exp.Graficar();
            resultado.Armar_NodoGrafica(cabeza,exp,null);
        }
    
        
        return resultado;
    }
    
}