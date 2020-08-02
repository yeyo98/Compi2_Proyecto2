import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { Casting } from '../../Expresion/Casteo/Casting';

export class Sentencia_Transferencia extends nodoAst{

    tipo: number;
    valor: nodoAst|null;

    constructor(tipo:number,valor:nodoAst|null,line:number, col:number){
        super(line,col);
        this.tipo = tipo;
        this.valor = valor;
    }


    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        switch(this.tipo){
            case 1:{
                resultado = this.EjecutarBreak(e);
                break;
            }
            case 2:{
                resultado = this.EjecutarContinue(e);
                break;
            }
            case 3:{
                resultado = this.EjecutarReturn1(e);
                break;
            }
            case 4:{
                resultado = this.EjecutarReturn2(e);
                break;
            }
        }

        return resultado;
    }

    private EjecutarBreak(e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();
        // EMPIEZO A BUSCAR ALGUN ENTORNO PERMITICOS
        let aux = "";
        // SWITCH
        aux = e.Existe_Entorno("case");
        if(aux !== "-1"){
            return this.ArmarSalto(aux);
        }
        // WHILE
        aux = e.Existe_Entorno("while");
        if(aux !== "-1"){
            return this.ArmarSalto(aux);
        }
        // DOWHILE
        aux = e.Existe_Entorno("dowhile");
        if(aux !== "-1"){
            return this.ArmarSalto(aux);
        }
        // FOR
        aux = e.Existe_Entorno("for");
        if(aux !== "-1"){
            return this.ArmarSalto(aux);
        }

        // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
        Informacion.ErrSemantico("No existe ningun entorno Switch o Ciclo para BREAK",this.linea,this.columna);
        resultado.BorrarError();
        return resultado;
    }


    private EjecutarContinue(e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();
        // EMPIEZO A BUSCAR ALGUN ENTORNO PERMITICOS
        let aux = "";
        // WHILE
        aux = e.Existe_Continue("while");
        if(aux !== "-1"){
            return this.ArmarSalto(aux);
        }
        // DOWHILE
        aux = e.Existe_Continue("dowhile");
        if(aux !== "-1"){
            return this.ArmarSalto(aux);
        }
        // FOR
        aux = e.Existe_Continue("for");
        if(aux !== "-1"){
            return this.ArmarSalto(aux);
        }

        // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
        Informacion.ErrSemantico("No existe ningun entorno Ciclo para CONTINUE",this.linea,this.columna);
        resultado.BorrarError();
        return resultado;
    }

    private EjecutarReturn1(e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();
        let aux = e.Existe_Entorno("funcion");

        if(aux != "-1")
            return this.ArmarSalto(aux);
        // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
        Informacion.ErrSemantico("No existe ningun entorno Funcion para Return",this.linea,this.columna);
        resultado.BorrarError();
        return resultado;
    }

    
    private EjecutarReturn2(e: Entorno): nodoCodigo{
        let resultado = new nodoCodigo();
        let etq = e.Existe_Entorno("funcion");

        if(etq == "-1"){
            // SI NO ENCONTRO NINGUNO ENVIAR UN ERROR
            Informacion.ErrSemantico("No existe ningun entorno Funcion para Return",this.linea,this.columna);
            resultado.BorrarError();
            return resultado;
        }
        let datos = e.Get("return");
        let valor = this.valor?.Ejecutar(e);
        // VERIFICO QUE NO HAYA ALGUN ERROR
        if(valor?.tipo == auxExpresion.COMBINACION_TIPOS.ERR){
            return valor;
        }
        
        // COMPRUEBO TIPOS
        if(datos?.tipo != valor?.tipo && valor != null)
        {
            valor = Casting.CasteoImplicito(datos?.tipo,valor);
            if(valor.tipo == auxExpresion.COMBINACION_TIPOS.ERR){
                Informacion.ErrSemantico("El tipo de return no coincide con el de la Funcion", 
                    this.linea,this.columna);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
                return resultado;
            }
        }

        // SI TODO ESTA BIEN, AGREGO EL RETURN EN LA PILA
        const tem = resultado.Crear_Temporal();
        if(valor != null)
            resultado.Agregar_CodigoNodo(valor);
        resultado.Agregar_LineaCodigo(tem+"= P+"+datos?.posRelativa);
        resultado.Agregar_LineaCodigo("Stack["+tem+"]= "+valor?.cabeza);
        resultado.Agregar_CodigoNodo( this.ArmarSalto(etq) );
        return resultado;
    }


    private ArmarSalto(etq: string): nodoCodigo{
        let resultado = new nodoCodigo();
        resultado.Agregar_LineaCodigo("goto "+etq);
        return resultado;
    }

    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        switch(this.tipo){
            case 1:{
                resultado.Crear_NodoInicial("Break");
                break;
            }
            case 2:{
                resultado.Crear_NodoInicial("Continue");
                break;
            }
            case 3:{
                resultado.Crear_NodoInicial("Return");
                break;
            }
            case 4:{
                if(this.valor != null)
                    resultado.Armar_NodoGrafica("Return",this.valor.Graficar(),null);
                break;
            }
        }

        return resultado;
    }

}