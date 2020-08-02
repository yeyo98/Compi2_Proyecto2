"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodoAst_1 = require("../Arbol/nodoAst");
const nodoCodigo_1 = require("../Arbol/nodoCodigo");
const nodoGrafica_1 = require("../Arbol/nodoGrafica");
const auxExpresion_1 = require("../Expresion/auxExpresion");
const Informacion_1 = require("../Datos/Informacion");
const fs = require('fs');
const path = require('path');
const Gramatica = require('../Analizador/Gramatica');
class Import extends nodoAst_1.nodoAst {
    constructor(archivos, line, col) {
        super(line, col);
        this.ruta = path.join(process.cwd(), 'src/routes/ArchivosEntrada');
        this.archivos = archivos;
    }
    Ejecutar(e) {
        let resultado = new nodoCodigo_1.nodoCodigo();
        for (let archivo of this.archivos) {
            try {
                let codigo = "";
                codigo = fs.readFileSync(path.join(this.ruta, archivo), 'utf-8');
                codigo = codigo.toLocaleLowerCase();
                // EJECUTO EL CODIGO
                let raiz = Gramatica.parse(codigo);
                // ANTES DE EJECUTAR RAIZ METO LOS METODOS
                //Informacion.AddMetodosEntorno(e);
                // EJECUTO RAIZ POR SI TIENE UN IMPORT
                raiz.Ejecutar(e);
            }
            catch (err) {
                Informacion_1.Informacion.ErrSemantico("No existe un archivo con este Nombre <" + archivo + ">", this.linea, this.columna);
                resultado.tipo = auxExpresion_1.auxExpresion.COMBINACION_TIPOS.ERR;
            }
        }
        return resultado;
    }
    Graficar() {
        let resultado = new nodoGrafica_1.nodoGrafica();
        const cabeza = "Import";
        for (let archivo of this.archivos) {
            let aux = new nodoGrafica_1.nodoGrafica();
            aux.Crear_NodoInicial(archivo);
            resultado.Armar_NodoGrafica(cabeza, aux, null);
        }
        return resultado;
    }
}
exports.Import = Import;
//# sourceMappingURL=Import.js.map