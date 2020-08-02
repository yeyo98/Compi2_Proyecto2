export abstract class Prueba {
    public message: string;
    constructor(message:string){
        this.message = message;
    }

    abstract Mensaje(e:string): void;

    Suma(){
        console.log(2+2);
    }
}