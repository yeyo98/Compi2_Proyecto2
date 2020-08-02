import { nodoAst } from '../Arbol/nodoAst';
import { nodoCodigo } from "../Arbol/nodoCodigo";
import { nodoGrafica } from "../Arbol/nodoGrafica";
import { Entorno } from "../Datos/Entorno/Entorno";
import { Exp } from '../Expresion/Exp';
import { auxExpresion } from '../Expresion/auxExpresion';
import { Informacion } from '../Datos/Informacion';
import { Valor } from '../Expresion/Valor';
import { Casting } from '../Expresion/Casteo/Casting';

const fs = require('fs');
const path = require('path');
const Gramatica = require('../Analizador/Gramatica');

export class Import extends nodoAst{

    ruta:string = path.join(process.cwd(),'src/routes/ArchivosEntrada');
    archivos:string[];
    constructor(archivos:string[],line:number,col:number){
        super(line,col);
        this.archivos = archivos;
    }

    Ejecutar(e: Entorno): nodoCodigo {
        let resultado = new nodoCodigo();

        for(let archivo of this.archivos){
            try{
                let codigo = "";
                codigo = fs.readFileSync(path.join(this.ruta,archivo),'utf-8');
                codigo = codigo.toLocaleLowerCase();
                // EJECUTO EL CODIGO
                let raiz = Gramatica.parse(codigo); 
                // ANTES DE EJECUTAR RAIZ METO LOS METODOS
                //Informacion.AddMetodosEntorno(e);
                // EJECUTO RAIZ POR SI TIENE UN IMPORT
                raiz.Ejecutar(e);
       
            }catch(err){
                Informacion.ErrSemantico("No existe un archivo con este Nombre <"+archivo+">", 
                this.linea,this.columna);
                resultado.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }
    Graficar(): nodoGrafica {
        let resultado = new nodoGrafica();
        const cabeza = "Import";

        for(let archivo of this.archivos){
            let aux = new nodoGrafica();
            aux.Crear_NodoInicial(archivo);
            resultado.Armar_NodoGrafica(cabeza,aux,null);
        }

        return resultado;
    }

}