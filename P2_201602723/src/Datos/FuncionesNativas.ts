import { Informacion } from './Informacion';
import { nodoCodigo } from '../Arbol/nodoCodigo';
import { Entorno } from './Entorno/Entorno';
import { auxExpresion } from '../Expresion/auxExpresion';
import { Relacional } from '../Expresion/Relacional'; 

export class FuncionesNativas{
    constructor(){}

    static CrearStringLength():nodoCodigo{
        let respuesta = new nodoCodigo();
        const tem1 = respuesta.Crear_Temporal();
        const tem2 = respuesta.Crear_Temporal();
        const tem3 = respuesta.Crear_Temporal();
        const tem4 = respuesta.Crear_Temporal();

        const etq1 = respuesta.Crear_Etiqueta();
        const etq2 = respuesta.Crear_Etiqueta();

        respuesta.Agregar_LineaCodigo("\n#");
        respuesta.Agregar_LineaCodigo("proc length begin::");
        respuesta.Agregar_LineaCodigo(tem1+"= Stack[P]");
        respuesta.Agregar_LineaCodigo(tem2+"=0");
        respuesta.Agregar_LineaCodigo(tem3+"="+tem1);
        respuesta.Agregar_LineaCodigo(etq1+":");
        respuesta.Agregar_LineaCodigo(tem4+"= Heap["+tem3+"]");
        respuesta.Agregar_LineaCodigo("if("+tem4+"==-1) goto "+etq2);
        respuesta.Agregar_LineaCodigo(tem2+"="+tem2+"+1");
        respuesta.Agregar_LineaCodigo(tem3+"="+tem3+"+1");
        respuesta.Agregar_LineaCodigo("goto "+etq1);
        respuesta.Agregar_LineaCodigo(etq2+":");
        respuesta.Agregar_LineaCodigo(tem4+"=P+1");
        respuesta.Agregar_LineaCodigo("Stack["+tem4+"]= "+tem2);
        respuesta.Agregar_LineaCodigo("end::");
        return respuesta;
    }

    static CrearToUpperCase():nodoCodigo{
        let respuesta = new nodoCodigo();
        const tem1 = respuesta.Crear_Temporal();
        const tem2 = respuesta.Crear_Temporal();
        const tem3 = respuesta.Crear_Temporal();
        const tem4 = respuesta.Crear_Temporal();

        const etq1 = respuesta.Crear_Etiqueta();
        const etq2 = respuesta.Crear_Etiqueta();
        const etq3 = respuesta.Crear_Etiqueta();
        const etq4 = respuesta.Crear_Etiqueta();

        respuesta.Agregar_LineaCodigo("\n#");
        respuesta.Agregar_LineaCodigo("proc touppercase begin::");
        respuesta.Agregar_LineaCodigo(tem1+"= Stack[P]");
        respuesta.Agregar_LineaCodigo(tem4+"= H");
        respuesta.Agregar_LineaCodigo(etq1+":");
        respuesta.Agregar_LineaCodigo(tem2+"= Heap["+tem1+"]");

        // PRIMERO EVALUO QUE NO SEA -1
        respuesta.Agregar_LineaCodigo("if("+tem2+"== -1) goto "+etq4);
            // CONSTRUYO LA CONDICION
            let condicion = this.HacerCondicion(tem2,"97","122");
            respuesta.Agregar_CodigoNodo( condicion );
            respuesta.Agregar_LineaCodigo("if("+condicion.cabeza+"==1) goto "+etq2);
            respuesta.Agregar_LineaCodigo("goto "+etq3);
            respuesta.Agregar_LineaCodigo(etq2+":");
            respuesta.Agregar_LineaCodigo(tem2+"="+tem2+"-32");
            respuesta.Agregar_LineaCodigo(etq3+":");

            respuesta.Agregar_LineaCodigo("Heap[H]="+tem2);
            respuesta.Agregar_LineaCodigo("H=H+1");
            respuesta.Agregar_LineaCodigo(tem1+"="+tem1+"+1");
            respuesta.Agregar_LineaCodigo("goto "+etq1);
        respuesta.Agregar_LineaCodigo(etq4+":");

        respuesta.Agregar_LineaCodigo("Heap[H]=-1");
        respuesta.Agregar_LineaCodigo("H=H+1");


        
        respuesta.Agregar_LineaCodigo(tem3+"=P+1");
        respuesta.Agregar_LineaCodigo("Stack["+tem3+"]= "+tem4);
        respuesta.Agregar_LineaCodigo("end::");
        return respuesta;
    }

    static CrearToLowerCase():nodoCodigo{
        let respuesta = new nodoCodigo();
        const tem1 = respuesta.Crear_Temporal();
        const tem2 = respuesta.Crear_Temporal();
        const tem3 = respuesta.Crear_Temporal();
        const tem4 = respuesta.Crear_Temporal();

        const etq1 = respuesta.Crear_Etiqueta();
        const etq2 = respuesta.Crear_Etiqueta();
        const etq3 = respuesta.Crear_Etiqueta();
        const etq4 = respuesta.Crear_Etiqueta();

        respuesta.Agregar_LineaCodigo("\n#");
        respuesta.Agregar_LineaCodigo("proc tolowercase begin::");
        respuesta.Agregar_LineaCodigo(tem1+"= Stack[P]");
        respuesta.Agregar_LineaCodigo(tem4+"= H");
        respuesta.Agregar_LineaCodigo(etq1+":");
        respuesta.Agregar_LineaCodigo(tem2+"= Heap["+tem1+"]");

        // PRIMERO EVALUO QUE NO SEA -1
        respuesta.Agregar_LineaCodigo("if("+tem2+"== -1) goto "+etq4);
            // CONSTRUYO LA CONDICION
            let condicion = this.HacerCondicion(tem2,"65","90");
            respuesta.Agregar_CodigoNodo( condicion );
            respuesta.Agregar_LineaCodigo("if("+condicion.cabeza+"==1) goto "+etq2);
            respuesta.Agregar_LineaCodigo("goto "+etq3);
            respuesta.Agregar_LineaCodigo(etq2+":");
            respuesta.Agregar_LineaCodigo(tem2+"="+tem2+"+32");
            respuesta.Agregar_LineaCodigo(etq3+":");

            respuesta.Agregar_LineaCodigo("Heap[H]="+tem2);
            respuesta.Agregar_LineaCodigo("H=H+1");
            respuesta.Agregar_LineaCodigo(tem1+"="+tem1+"+1");
            respuesta.Agregar_LineaCodigo("goto "+etq1);
        respuesta.Agregar_LineaCodigo(etq4+":");

        respuesta.Agregar_LineaCodigo("Heap[H]=-1");
        respuesta.Agregar_LineaCodigo("H=H+1");


        
        respuesta.Agregar_LineaCodigo(tem3+"=P+1");
        respuesta.Agregar_LineaCodigo("Stack["+tem3+"]= "+tem4);
        respuesta.Agregar_LineaCodigo("end::");
        return respuesta;
    }

    static CrearCharAt():nodoCodigo{
        let respuesta = new nodoCodigo();
        const tem1 = respuesta.Crear_Temporal();
        const tem2 = respuesta.Crear_Temporal();
        const tem3 = respuesta.Crear_Temporal();
        const tem4 = respuesta.Crear_Temporal();
        const tem5 = respuesta.Crear_Temporal();
        const tem6 = respuesta.Crear_Temporal();

        const etq1 = respuesta.Crear_Etiqueta();
        const etq2 = respuesta.Crear_Etiqueta();
        const etq3 = respuesta.Crear_Etiqueta();

        respuesta.Agregar_LineaCodigo("\n#");
        respuesta.Agregar_LineaCodigo("proc charat begin::");
        respuesta.Agregar_LineaCodigo(tem3+"= Stack[P]");   // CADENA
        respuesta.Agregar_LineaCodigo(tem1+"=P+1")                    
        respuesta.Agregar_LineaCodigo(tem5+"=Stack["+tem1+"]") //PARAMETRO
        respuesta.Agregar_LineaCodigo(tem2+"=0");
        respuesta.Agregar_LineaCodigo(tem6+"=0");
        respuesta.Agregar_LineaCodigo(etq1+":");
        respuesta.Agregar_LineaCodigo(tem4+"= Heap["+tem3+"]");
        respuesta.Agregar_LineaCodigo("if("+tem4+"==-1) goto "+etq2);
            respuesta.Agregar_LineaCodigo("if("+tem6+"=="+tem5+") goto "+etq3);

            respuesta.Agregar_LineaCodigo(tem6+"="+tem6+"+1");// CONTADOR  
            respuesta.Agregar_LineaCodigo(tem3+"="+tem3+"+1");// CONTADOR DEL CICLOCICLO
            respuesta.Agregar_LineaCodigo("goto "+etq1);
        
        respuesta.Agregar_LineaCodigo(etq3+":");
            respuesta.Agregar_LineaCodigo(tem2+"="+tem4);
        respuesta.Agregar_LineaCodigo(etq2+":");
        respuesta.Agregar_LineaCodigo(tem4+"=P+2");
        respuesta.Agregar_LineaCodigo("Stack["+tem4+"]= "+tem2);
        respuesta.Agregar_LineaCodigo("end::");
        return respuesta;
    }


    static AgregarEntorno(e: Entorno): void{
        let nombre = "";
        // AGREGO LENGTH
        nombre = "length_string";
        if( e.AgregarFuncion(nombre,auxExpresion.COMBINACION_TIPOS.INTEGER) ){// SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR                
            Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre "+nombre, 
                    0,0);
        }
        // AGREGO TOUPPERCASE
        nombre = "touppercase_string";
        if( e.AgregarFuncion(nombre,auxExpresion.COMBINACION_TIPOS.STRING) ){// SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR                
            Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre "+nombre, 
                    0,0);
        }
        // AGREGO TOLOWERCASE
        nombre = "tolowercase_string";
        if( e.AgregarFuncion(nombre,auxExpresion.COMBINACION_TIPOS.STRING) ){// SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR                
            Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre "+nombre, 
                    0,0);
        }
        // AGREGO CHARAT
        nombre = "charat_string_integer";
        if( e.AgregarFuncion(nombre,auxExpresion.COMBINACION_TIPOS.CHAR) ){// SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR                
            Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre "+nombre, 
                    0,0);
        }
    }


    static AgregarCodigo(): nodoCodigo{
        let resultado = new nodoCodigo();
        // AGREGO LENGTH
        resultado.Agregar_CodigoNodo( this.CrearStringLength() );
        resultado.Agregar_CodigoNodo( this.CrearToUpperCase() );
        resultado.Agregar_CodigoNodo( this.CrearToLowerCase() );
        resultado.Agregar_CodigoNodo( this.CrearCharAt() );

        return resultado;
    }

    static HacerCondicion(letra:string,l1:string,l2:string):nodoCodigo{
        // CONSTRUYO LA CONDICION
        let C1 = new Relacional(0,0);
        let aux1 = new nodoCodigo();
        aux1.cabeza=letra; aux1.tipo=auxExpresion.COMBINACION_TIPOS.INTEGER;
        let aux2 = new nodoCodigo();
        aux2.cabeza=l1; aux2.tipo=auxExpresion.COMBINACION_TIPOS.INTEGER;
        let res1= C1.Traducir_Mayorigual(aux1,aux2)   // CONDICION IZQUIERDA

        aux1 = new nodoCodigo();
        aux1.cabeza=letra; aux1.tipo=auxExpresion.COMBINACION_TIPOS.INTEGER;
        aux2 = new nodoCodigo();
        aux2.cabeza=l2; aux2.tipo=auxExpresion.COMBINACION_TIPOS.INTEGER;
        let res2 = C1.Traducir_MenorIgual(aux1,aux2);   // CONDICION DERECHA

        // OPERO EL AND Y AGREGO TODO EL CODIGO
        return C1.Traducir_And(res1,res2);
    }

}