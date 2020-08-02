import { Terror } from './Terror';
import { nodoAst } from '../Arbol/nodoAst'
import { nodoCodigo } from '../Arbol/nodoCodigo';
import { CrearFuncion } from '../Funciones/Creacion_Funcion/CrearFuncion';
import { Entorno } from './Entorno/Entorno';
import { auxExpresion } from '../Expresion/auxExpresion';
import { FuncionesNativas } from './FuncionesNativas';

export class Informacion{

    // LISTA PARA GUARDAR ERRORES Y MENSAJES
    static lista_errores: Terror[] = [];
    static Mensaje_Consola: Terror[] = [];

    // LISTA PARA GUARDAR LA BITACORA DE LAS OPTIMIZACIONES
    static bitacotaOptimizacion: Terror[] = [];

    // LISTA PARA GURDAR LAS CREACIONES DE LOS METODOS
    static listaMetodos: CrearFuncion[] = [];
    // BANDERA PARA CONTAR
    static flagImport:boolean; 
    // ESTE CONTADOR SERVIRA PARA LLEVAR LA CUENTA DE CUANTOS METODOS IMPORTADOS LLEVO
    static noMetodosImport: number;

    // ESTOS SON LOS CONTADORES PARA LA CREACION DE TEMPORALES Y ETIQUETAS
    static contTemporal: number = 0;
    static contEtiqueta: number = 1;

    // ESTOS SON LOS APUNTADORES DE STACK Y HEAD
    static ptrStack: number = 0;
    static ptrHeap: number = 0;


    // AQUI GUARDO LA RAIZ DEL ARBOL
    static raiz: nodoAst | null;

    constructor(){
    }

    static Clear_Data(): void{
        this.lista_errores = [];
        this.Mensaje_Consola = [];

        this.bitacotaOptimizacion = [];
        this.listaMetodos = [];
        this.flagImport = false;
        this.noMetodosImport = 0;

        this.contTemporal = 0;
        this.contEtiqueta = 1;
        
        this.ptrStack = 0;
        this.ptrHeap = 0;

        this.raiz = null;
    }

    static AddMessage(message: string): void{
        this.Mensaje_Consola.push( new Terror('',0,0,'',message) );
    }

    static AddOptimizacion(exp:string,result:string,line:number, col:number, tipo:number):void{
        this.bitacotaOptimizacion.push( new Terror(exp,line,col,tipo+"",result) );
    }

    static AddMetodo(nuevo: CrearFuncion):void{
        if(this.flagImport)
            this.noMetodosImport++;
        this.listaMetodos.push(nuevo);
    }

    static ErrSemantico(message: string, line: number, col: number){
        this.Mensaje_Consola.push( new Terror('',0,0,'',"Error Semantico!! "
                                +message +" linea: "+line +" ,columna: "+col) );
        this.lista_errores.push( new Terror(message,line,col,"Semantico","") );
    }

    static AddMetodosEntorno(e:Entorno):void{
        // PRIMERO AGREGO LAS FUNCIONES NATIVAS
        FuncionesNativas.AgregarEntorno(e);

        for(let elemento of this.listaMetodos){
            let nombre = elemento.CrearNombre();
            nombre = nombre.toLowerCase();
            if( e.AgregarFuncion(nombre,elemento.GetTipo()) ){// SI ES TRUE ES PORQUE NO LO AGREGO YA QUE EXISTE, MANDAR ERROR                
                Informacion.ErrSemantico("No se puede Declarar 2 Funciones con el mismo nombre "+nombre, 
                        elemento.linea,elemento.columna);
                //resultado.BorrarError();
                //return resultado;
            }
        }
    }


    static AgregarPrincipal(nodo:nodoCodigo, e:Entorno):nodoCodigo{
        let aux = new nodoCodigo();
        let etq = aux.Crear_Etiqueta();
        // AGREGO EL CODIGO GENERADO DEL ARBOL
        aux.Agregar_CodigoNodo(nodo);

        // METODO LA LLAMADA PRINCIPAL
        aux.Agregar_LineaCodigo("Call principal");
        aux.Agregar_LineaCodigo("goto "+etq);
        

        // PRIMERO VERIFICO QUE VENGA METODOS IMPORTADOS
        while(this.noMetodosImport > 0){
            let metodo = this.listaMetodos.pop();
            if(metodo != undefined){
                const auxMetodo = metodo.Ejecutar(e);
                if(auxMetodo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                    continue;
                else
                    aux.Agregar_CodigoNodo(auxMetodo);
            }
            this.noMetodosImport--;
        }

        // AGREGO METODOS
        for(let metodo of this.listaMetodos){
            const auxMetodo = metodo.Ejecutar(e);
            if(auxMetodo.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                continue;
            else
                aux.Agregar_CodigoNodo(auxMetodo);
        }

        

        // AGREGO LAS FUNCIONES NATIVAS
        aux.Agregar_CodigoNodo( FuncionesNativas.AgregarCodigo() );

        aux.Agregar_LineaCodigo(etq+":");
        return aux;
    }
    
}