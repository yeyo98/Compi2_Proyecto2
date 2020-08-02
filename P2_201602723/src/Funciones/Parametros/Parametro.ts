/* import { nodoAst } from '../../Arbol/nodoAst';
import { nodoCodigo } from "../../Arbol/nodoCodigo";
import { nodoGrafica } from "../../Arbol/nodoGrafica";
import { Entorno } from "../../Datos/Entorno/Entorno";
import { Exp } from '../../Expresion/Exp';
import { auxExpresion } from '../../Expresion/auxExpresion';
import { Informacion } from '../../Datos/Informacion';
import { String } from '../../Objectos/String';
import { Casting } from '../../Expresion/Casteo/Casting'; */
import { Tipo } from "../../Variables/Tipo";

export class Parametro{

    tipo: Tipo;
    id: string;

    constructor(tipo: Tipo, id: string){
        this.tipo = tipo;
        this.id = id;
    }

    /* Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        return resultado;
    }

    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const cabeza = "Parametro";

        // NODO DEL TIPO
        const tipo = new nodoGrafica();
        tipo.Crear_NodoInicial(this.tipo.tipo);
        resultado.Armar_NodoGrafica(cabeza,tipo,null);

        const nombre = new nodoGrafica();
        nombre.Crear_NodoInicial(this.id);
        resultado.Armar_NodoGrafica(cabeza,nombre,null);

        return resultado;
    } */

}

