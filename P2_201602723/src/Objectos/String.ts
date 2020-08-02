import { Informacion } from '../Datos/Informacion';
import { Instruccion } from '../nodoArbol/Instruccion';
import { nodoCodigo } from '../Arbol/nodoCodigo';
import { auxExpresion } from '../Expresion/auxExpresion';

export class String{
    constructor(){}

    static GuardarCadena(cadena: string): nodoCodigo{
        const resultado = new nodoCodigo();
        let tem = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(tem,auxExpresion.COMBINACION_TIPOS.STRING);
        //resultado.EstablecerCabeza(Informacion.ptrHeap+"",auxExpresion.COMBINACION_TIPOS.STRING);
        resultado.Agregar_LineaCodigo(tem+"= H");

        let aux = cadena.split('');

        for(let i=0; i<aux.length ;i++){
            let letra = aux[i];

            // EVALUO SI HAY ALGUN CARACTER ESPECIAL
            if(letra == '\\'){
                i++;
                letra = aux[i];
                switch(letra){
                    case '"':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+34);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case '\\':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+92);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case 'n':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+10);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case 'r':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+13);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case 't':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+9);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }default :{
                        i--;
                        letra = aux[i];
                    }
                }
            }
            resultado.Agregar_LineaCodigo('Heap[H] = '+letra.charCodeAt(0));
            resultado.Agregar_LineaCodigo( 'H = H+1' );
        }

        /*for(let letra of aux){
            if(letra == '\\'){

            }
            resultado.Agregar_LineaCodigo('Heap[H] = '+letra.charCodeAt(0));
            resultado.Agregar_LineaCodigo( 'H = H+1' );
            //Informacion.ptrHeap = Informacion.ptrHeap++
        }*/
        
        resultado.Agregar_LineaCodigo('Heap[H] = -1');
        resultado.Agregar_LineaCodigo( 'H = H+1' );
        //Informacion.ptrHeap = Informacion.ptrHeap++
        return resultado;
    }

    
    static GuardarCadena2(cadena: string): nodoCodigo{
        const resultado = new nodoCodigo();
        let tem = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(tem,auxExpresion.COMBINACION_TIPOS.STRING);
        resultado.Agregar_LineaCodigo(tem+"= H");

        let aux = cadena.split('');

        for(let i=0; i<aux.length ;i++){
            let letra = aux[i];
            // EVALUO SI HAY ALGUN CARACTER ESPECIAL
            if(letra == '\\'){
                i++;
                letra = aux[i];
                switch(letra){
                    case '"':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+34);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case '\\':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+92);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case 'n':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+10);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case 'r':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+13);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }
                    case 't':{
                        resultado.Agregar_LineaCodigo('Heap[H] = '+9);
                        resultado.Agregar_LineaCodigo( 'H = H+1' );
                        continue;
                    }default :{
                        i--;
                        letra = aux[i];
                    }
                }
            }
            resultado.Agregar_LineaCodigo('Heap[H] = '+letra.charCodeAt(0));
            resultado.Agregar_LineaCodigo( 'H = H+1' );
        }
        return resultado;
    }


    static GuardarLetra(letra: string): nodoCodigo{
        const resultado = new nodoCodigo();
        let cabeza = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
        resultado.Agregar_LineaCodigo(cabeza+"= H");

        // AQUI AGREGO LA NUEVA CADENA
        resultado.Agregar_LineaCodigo('Heap[H] = '+letra);
        resultado.Agregar_LineaCodigo( 'H = H+1' );

        return resultado;
    }

    static GuardarPalabra(palabra: string): nodoCodigo{
        const resultado = new nodoCodigo();
        let cabeza = resultado.Crear_Temporal();
        let tem = resultado.Crear_Temporal();
        let tem2 = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
        resultado.Agregar_LineaCodigo(cabeza+"= H");

        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();

        //tn = cad1
        resultado.Agregar_LineaCodigo(tem+"= "+palabra);
        // Ln:
        resultado.Agregar_LineaCodigo(etq1+":");
        // tm = Heap[tn]    
        resultado.Agregar_LineaCodigo(tem2+" = Heap["+tem+"]");
        // if(tem == -1) goto etq
        resultado.Agregar_LineaCodigo("if("+tem2+"==-1) goto "+etq2);
        // AQUI AGREGO LA NUEVA CADENA
        resultado.Agregar_LineaCodigo('Heap[H] = '+tem2);
        resultado.Agregar_LineaCodigo( 'H = H+1' );

        // tem = tem + 1:
        resultado.Agregar_LineaCodigo(tem+"= "+tem+"+1");
        // goto eti
        resultado.Agregar_LineaCodigo("goto "+etq1);
        // Ln:
        resultado.Agregar_LineaCodigo(etq2+":");
        return resultado;
    }

    static GuardarDefault(): nodoCodigo{
        const resultado = new nodoCodigo();

        let tem = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(tem,auxExpresion.COMBINACION_TIPOS.STRING);
        resultado.Agregar_LineaCodigo(tem+"= H");
        resultado.Agregar_LineaCodigo('Heap[H] = -1');
        resultado.Agregar_LineaCodigo( 'H = H+1' );
        return resultado;
    }

    static ObtenerCadena(ptr: string): nodoCodigo{
        const resultado = new nodoCodigo();
        let tem = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(tem,auxExpresion.COMBINACION_TIPOS.STRING);
        resultado.Agregar_LineaCodigo(tem+"= H");
        return resultado;
    }

    static SumarCadenas(cad1: string,cad2: string): nodoCodigo{
        const resultado = new nodoCodigo();
        let cabeza = resultado.Crear_Temporal();
        let tem = resultado.Crear_Temporal();
        let tem2 = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
        resultado.Agregar_LineaCodigo(cabeza+"= H");

        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();
        const etq4 = resultado.Crear_Etiqueta();

        //tn = cad1
        resultado.Agregar_LineaCodigo(tem+"= "+cad1);
        // Ln:
        resultado.Agregar_LineaCodigo(etq1+":");
        // tm = Heap[tn]    
        resultado.Agregar_LineaCodigo(tem2+" = Heap["+tem+"]");
        // if(tem == -1) goto etq
        resultado.Agregar_LineaCodigo("if("+tem2+"==-1) goto "+etq2);
        // AQUI AGREGO LA NUEVA CADENA
        resultado.Agregar_LineaCodigo('Heap[H] = '+tem2);
        resultado.Agregar_LineaCodigo( 'H = H+1' );

        // tem = tem + 1:
        resultado.Agregar_LineaCodigo(tem+"= "+tem+"+1");
        // goto eti
        resultado.Agregar_LineaCodigo("goto "+etq1);
        // Ln:
        resultado.Agregar_LineaCodigo(etq2+":");

        //=================== AGREGO LA OTRA CADENA ==============
        //tn = cad1
        resultado.Agregar_LineaCodigo(tem+"= "+cad2);
        // Ln:
        resultado.Agregar_LineaCodigo(etq3+":");
        // tm = Heap[tn]    
        resultado.Agregar_LineaCodigo(tem2+" = Heap["+tem+"]");

        // if(tem == -1) goto etq
        resultado.Agregar_LineaCodigo("if("+tem2+"==-1) goto "+etq4);
        // AQUI AGREGO LA NUEVA CADENA
        resultado.Agregar_LineaCodigo('Heap[H] = '+tem2);
        resultado.Agregar_LineaCodigo( 'H = H+1' );

        // tem = tem + 1:
        resultado.Agregar_LineaCodigo(tem+"= "+tem+"+1");
        // goto eti
        resultado.Agregar_LineaCodigo("goto "+etq3);
        // Ln:
        resultado.Agregar_LineaCodigo(etq4+":");

        // AGREGO EL DOLLAR
        resultado.Agregar_LineaCodigo('Heap[H] = -1');
        resultado.Agregar_LineaCodigo( 'H = H+1' );
        return resultado;
    }

    static CompararCadenas(cad1: string, cad2: string): nodoCodigo{
        let resultado = new nodoCodigo();
        let cabeza = resultado.Crear_Temporal();
        let tem1 = resultado.Crear_Temporal();
        let tem2 = resultado.Crear_Temporal();
        let tem3 = resultado.Crear_Temporal();
        let tem4 = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(cabeza,auxExpresion.COMBINACION_TIPOS.BOOL);

        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();
        const etq4 = resultado.Crear_Etiqueta();

        resultado.Agregar_LineaCodigo(tem1+"= "+cad1);
        resultado.Agregar_LineaCodigo(tem3+"= "+cad2);
        resultado.Agregar_LineaCodigo(etq1+":");
        resultado.Agregar_LineaCodigo(tem2+" = Heap["+tem1+"]");
        resultado.Agregar_LineaCodigo(tem4+" = Heap["+tem3+"]");
        // ANALIZO SI VIENE EL -1
        resultado.Agregar_LineaCodigo("if("+tem2+"<>-1) goto "+etq3);
        resultado.Agregar_LineaCodigo("if("+tem4+"<>-1) goto "+etq3);
        // EN TEORIA SI ENTRA AQUI YA ES VERDADERO
        resultado.Agregar_LineaCodigo(cabeza+"= 1");

        resultado.Agregar_LineaCodigo("goto "+etq4);
        resultado.Agregar_LineaCodigo(etq3+":");
        resultado.Agregar_LineaCodigo("if("+tem2+"<>"+tem4+") goto "+etq2);
        resultado.Agregar_LineaCodigo(tem1+"= "+tem1+"+1");
        resultado.Agregar_LineaCodigo(tem3+"= "+tem3+"+1");
        resultado.Agregar_LineaCodigo("goto "+etq1);

        resultado.Agregar_LineaCodigo(etq2+":");
        // EN TEORIA SI ENTRA AQUI ES FALSO
        resultado.Agregar_LineaCodigo(cabeza+"= 0");
        resultado.Agregar_LineaCodigo(etq4+":");

        return resultado;
    }

    static CompararCadenas2(cad1: string, cad2: string): nodoCodigo{
        let resultado = new nodoCodigo();
        let cabeza = resultado.Crear_Temporal();
        let tem1 = resultado.Crear_Temporal();
        let tem2 = resultado.Crear_Temporal();
        let tem3 = resultado.Crear_Temporal();
        let tem4 = resultado.Crear_Temporal();
        resultado.EstablecerCabeza(cabeza,auxExpresion.COMBINACION_TIPOS.BOOL);

        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();
        const etq3 = resultado.Crear_Etiqueta();
        const etq4 = resultado.Crear_Etiqueta();

        resultado.Agregar_LineaCodigo(tem1+"= "+cad1);
        resultado.Agregar_LineaCodigo(tem3+"= "+cad2);
        resultado.Agregar_LineaCodigo(etq1+":");
        resultado.Agregar_LineaCodigo(tem2+" = Heap["+tem1+"]");
        resultado.Agregar_LineaCodigo(tem4+" = Heap["+tem3+"]");
        // ANALIZO SI VIENE EL -1
        resultado.Agregar_LineaCodigo("if("+tem2+"<>-1) goto "+etq3);
        resultado.Agregar_LineaCodigo("if("+tem4+"<>-1) goto "+etq3);
        // EN TEORIA SI ENTRA AQUI YA ES VERDADERO
        resultado.Agregar_LineaCodigo(cabeza+"= 0");

        resultado.Agregar_LineaCodigo("goto "+etq4);
        resultado.Agregar_LineaCodigo(etq3+":");
        resultado.Agregar_LineaCodigo("if("+tem2+"<>"+tem4+") goto "+etq2);
        resultado.Agregar_LineaCodigo(tem1+"= "+tem1+"+1");
        resultado.Agregar_LineaCodigo(tem3+"= "+tem3+"+1");
        resultado.Agregar_LineaCodigo("goto "+etq1);

        resultado.Agregar_LineaCodigo(etq2+":");
        // EN TEORIA SI ENTRA AQUI ES FALSO
        resultado.Agregar_LineaCodigo(cabeza+"= 1");
        resultado.Agregar_LineaCodigo(etq4+":");

        return resultado;
    }


    static ImprimirCadena(cad1: string): nodoCodigo{
        const resultado = new nodoCodigo();
        //let cabeza = resultado.Crear_Temporal();
        let tem = resultado.Crear_Temporal();
        let tem2 = resultado.Crear_Temporal();
        //resultado.EstablecerCabeza(cabeza,auxExpresion.COMBINACION_TIPOS.STRING);
        //resultado.Agregar_LineaCodigo(cabeza+"= H");

        const etq1 = resultado.Crear_Etiqueta();
        const etq2 = resultado.Crear_Etiqueta();

        //tn = cad1
        resultado.Agregar_LineaCodigo(tem+"= "+cad1);
        // Ln:
        resultado.Agregar_LineaCodigo(etq1+":");
        // tm = Heap[tn]    
        resultado.Agregar_LineaCodigo(tem2+" = Heap["+tem+"]");
        // if(tem == -1) goto etq
        resultado.Agregar_LineaCodigo("if("+tem2+"==-1) goto "+etq2);
        // AQUI IMPRIMI LA LETRA DE LA CADENA
        
        resultado.Agregar_LineaCodigo('print("%c",'+tem2+')');
        //resultado.Agregar_LineaCodigo( 'H = H+1' );

        // tem = tem + 1:
        resultado.Agregar_LineaCodigo(tem+"= "+tem+"+1");
        // goto eti
        resultado.Agregar_LineaCodigo("goto "+etq1);
        // Ln:
        resultado.Agregar_LineaCodigo(etq2+":");

        return resultado;
    }
}