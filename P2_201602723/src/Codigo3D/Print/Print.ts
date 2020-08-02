
import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';

export class Print extends nodoAst{
    valor:string; 
    tipo: number;

    constructor(valor:string, tipo:number, line:number, col:number){
        super(line,col);
        this.valor = valor;
        this.tipo = tipo;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();
        resultado.Agregar_LineaCodigo('print('+this.TipoPrint()+','+this.valor+')');
        return resultado;
    }
    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const cabeza = "Print";

        const tipo = new nodoGrafica();
        tipo.Crear_NodoInicial(this.TipoPrint());
        const valor = new nodoGrafica();
        valor.Crear_NodoInicial(this.valor);

        resultado.Armar_NodoGrafica(cabeza,tipo,valor);

        return resultado;
    }

    private TipoPrint():string{
        let resultado= "";
        switch(this.tipo){
            case 1:{
                resultado = '"%i"';
                break;
            }
            case 2:{
                resultado = '"%d"';
                break;
            }
            case 3:{
                resultado = '"%c"';
                break;
            }
        }
        return resultado;
    }
}