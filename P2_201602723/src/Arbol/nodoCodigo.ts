import { auxExpresion } from '../Expresion/auxExpresion';
import { Informacion } from '../Datos/Informacion';

export class nodoCodigo{

    listaTemporal: string[];
    linea_Codigo: string[];

    cabeza: string;
    tipo: any;
    constructor(){
        this.listaTemporal = [];
        this.linea_Codigo = [];

        this.cabeza = "";
        this.tipo = auxExpresion.COMBINACION_TIPOS.VOID;
    }

    EstablecerCabeza(cabeza:string, tipo:any): void{
        this.cabeza = cabeza;
        this.tipo = tipo;
    }

    Crear_Temporal(): string{
        let tem = "t"+ Informacion.contTemporal++;
        this.listaTemporal.push(tem);
        return tem;
    }

    Crear_Etiqueta(): string{
        return "L"+Informacion.contEtiqueta++;
    }

    Agregar_CodigoNodo(nodo: nodoCodigo): void{
        for(let temp of nodo.listaTemporal)
            this.listaTemporal.push(temp);
        
        for(let linea of nodo.linea_Codigo)
            this.linea_Codigo.push(linea);
    }

    Agregar_Codigo2(nodo1: nodoCodigo, nodo2: nodoCodigo | null): void{
        for(let temp of nodo1.listaTemporal)
        this.listaTemporal.push(temp);
    
        for(let linea of nodo1.linea_Codigo)
            this.linea_Codigo.push(linea);

        if(nodo2 != null){
            for(let temp of nodo2.listaTemporal)
                this.listaTemporal.push(temp);
        
            for(let linea of nodo2.linea_Codigo)
                this.linea_Codigo.push(linea);
        }
    }

    Agregar_LineaCodigo(linea:string):void{
        this.linea_Codigo.push(linea);
    }

    EliminarTemporales():void{
        while(this.listaTemporal.length != 0){
            this.listaTemporal.pop();
            Informacion.contTemporal--;
        }
    }

    BorrarError(): void{
        this.listaTemporal = [];
        this.linea_Codigo = [];

        this.cabeza = "";
        this.tipo = auxExpresion.COMBINACION_TIPOS.ERR;
    }


}