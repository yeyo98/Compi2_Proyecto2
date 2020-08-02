import { Exp } from "../Expresion/Exp";

export class Tipo{

    tipo: string;
    arreglo: boolean;

    constructor(tipo: string, arreglo:boolean) {
        this.tipo = tipo;
        this.arreglo = arreglo;
    }
}