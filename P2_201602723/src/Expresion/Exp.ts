import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { Aritmetica } from "./Aritmetica";
import { auxExpresion } from "./auxExpresion";
import { Relacional } from "./Relacional";


enum OPERACION{
    // OPERACIONES ARITMETICAS
    suma,
    resta,
    multi,
    division,
    modulo,
    potencia,
    not,
    Umenos,
    // OPERACIONES RELACIONALES
    menor_igual,
    menor,  
    mayor_igual, 
    mayor, 
    igualdad_referencia,
    diferencia, 
    igualacion, 
    op_and,
    op_or,
    xor  
}

export class Exp extends nodoAst{
    
    static OPERACION = OPERACION;
    resultado: nodoCodigo | undefined;

    op1: nodoAst;
    op2: nodoAst;

    tipo: OPERACION | undefined;
    

    constructor(op1: nodoAst, op2: nodoAst, tipo:OPERACION, line: number, col: number){
        super(line,col);
        this.op1 = op1;
        this.op2 = op2; 
        this.tipo = tipo;
    }
    
    Ejecutar(e: Entorno): nodoCodigo {
        let operador1 =  this.op1.Ejecutar(e);

        if(operador1.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
            return operador1;
        
        let operador2;
        if(this.op2 != null){
            operador2 = this.op2.Ejecutar(e);
            if(operador2.tipo == auxExpresion.COMBINACION_TIPOS.ERR)
                return operador2;
        }else{
            operador2 = new nodoCodigo();
            operador2.EstablecerCabeza('-1',auxExpresion.COMBINACION_TIPOS.INTEGER);
        }

        let traductor = new Aritmetica(this.linea,this.columna);
        let traductor2 = new Relacional(this.linea,this.columna);
        let resultado = new nodoCodigo();

        switch(this.tipo){
            case OPERACION.xor:{
                resultado = traductor2.Traducir_Xor(operador1,operador2);
                break;  
            }
            case OPERACION.op_or:{
                resultado = traductor2.Traducir_Or(operador1,operador2);
                break;  
            }
            case OPERACION.op_and:{
                resultado = traductor2.Traducir_And(operador1,operador2);
                break;  
            }
            case OPERACION.diferencia:{
                resultado = traductor2.Traducir_Diferencia(operador1,operador2);
                break;  
            }
            case OPERACION.igualacion:{
                resultado = traductor2.Traducir_Igualacion(operador1,operador2);
                break;  
            }
            case OPERACION.igualdad_referencia:{
                resultado = traductor2.Traducir_IgualacionReferencia(operador1,operador2);
                break;  
            }
            case OPERACION.mayor:{
                resultado = traductor2.Traducir_Mayor(operador1,operador2);
                break;  
            }
            case OPERACION.mayor_igual:{
                resultado = traductor2.Traducir_Mayorigual(operador1,operador2);
                break;  
            }
            case OPERACION.menor:{
                resultado = traductor2.Traducir_Menor(operador1,operador2);
                break;  
            }
            case OPERACION.menor_igual:{
                resultado = traductor2.Traducir_MenorIgual(operador1,operador2);
                break;  
            }
            case OPERACION.suma:{
                resultado = traductor.Traducir_Suma(operador1,operador2);
                break;  
            }
            case OPERACION.resta:{
                resultado = traductor.Traducir_Resta(operador1,operador2);
                break;  
            }
            case OPERACION.multi:{
                resultado = traductor.Traducir_Multiplicacion(operador1,operador2);
                break;  
            }
            case OPERACION.division:{
                resultado = traductor.Traducir_Division(operador1,operador2);
                break;  
            }
            case OPERACION.modulo:{
                resultado = traductor.Traducir_Modulo(operador1,operador2);
                break;  
            }
            case OPERACION.potencia:{
                resultado = traductor.Traducir_Potencia(operador1,operador2);
                break;  
            }
            case OPERACION.not:{
                resultado = traductor.Traducir_Not(operador1,operador2);
                break;  
            }
            case OPERACION.Umenos:{
                resultado = traductor.Traducir_Umenos(operador1,operador2);
                break;  
            }
        }

        return resultado;
    }
    Graficar(): nodoGrafica {
        const raiz = new nodoGrafica();
        //raiz.Crear_NodoInicial("+");

        // OBTENGO EL ARBOL DEL OP1
        let op1 =  this.op1.Graficar();
        
        let op2 = null;
        // SI EXISTE OBTENGO EL ARBOL DEL op2
        if(this.op2 != null)
            op2 = this.op2.Graficar();
        
        switch(this.tipo){
            case OPERACION.xor:{
                raiz.Armar_NodoGrafica("^",op1,op2);
                break;
            }
            case OPERACION.op_or:{
                raiz.Armar_NodoGrafica("||",op1,op2);
                break;
            }
            case OPERACION.op_and:{
                raiz.Armar_NodoGrafica("&&",op1,op2);
                break;
            }
            case OPERACION.igualacion:{
                raiz.Armar_NodoGrafica("==",op1,op2);
                break;
            }
            case OPERACION.diferencia:{
                raiz.Armar_NodoGrafica("!=",op1,op2);
                break;
            }
            case OPERACION.igualdad_referencia:{
                raiz.Armar_NodoGrafica("===",op1,op2);
                break;
            }
            case OPERACION.mayor:{
                raiz.Armar_NodoGrafica(">",op1,op2);
                break;
            }
            case OPERACION.mayor_igual:{
                raiz.Armar_NodoGrafica(">=",op1,op2);
                break;
            }
            case OPERACION.menor:{
                raiz.Armar_NodoGrafica("<",op1,op2);
                break;
            }
            case OPERACION.menor_igual:{
                raiz.Armar_NodoGrafica("<=",op1,op2);
                break;
            }
            case OPERACION.suma:{
                raiz.Armar_NodoGrafica("+",op1,op2);
                break;
            }
            case OPERACION.resta:{
                raiz.Armar_NodoGrafica("-",op1,op2);
                break;
            }
            case OPERACION.multi:{
                raiz.Armar_NodoGrafica("*",op1,op2);
                break;
            }
            case OPERACION.division:{
                raiz.Armar_NodoGrafica("/",op1,op2);
                break;
            }
            case OPERACION.modulo:{
                raiz.Armar_NodoGrafica("%",op1,op2);
                break;
            }
            case OPERACION.potencia:{
                raiz.Armar_NodoGrafica("^^",op1,op2);
                break;
            }
            case OPERACION.not:{
                raiz.Armar_NodoGrafica("!",op1,op2);
                break;
            }
            case OPERACION.Umenos:{
                raiz.Armar_NodoGrafica("-",op1,op2);
                break;
            }
        }
        return raiz;
    }
}