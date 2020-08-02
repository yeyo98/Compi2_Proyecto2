export class Terror {
    lexema :string;
    tipo: string; 
    descripcion :string; 
    line: number
    columna: number;
    
    constructor(le: string,li: number, co: number, tipo: string, de: string){
        this.lexema = le;
        this.line = li;
        this.columna = co;
        this.tipo = tipo;
        this.descripcion = de;
    }
}