import { Prueba } from "../Prueba";

export class Perro extends Prueba{
    public cond:boolean;
    constructor(cond:boolean){
        super('Mensaje');
        this.cond = cond;
    }

    Imprimir_Mensaje(){
        if(this.cond){
            this.Mensaje('df');
        }else{
            this.Suma();
        }
    }

    Mensaje(e: string){
        console.log('Provando las clases abstractas');
    }
}