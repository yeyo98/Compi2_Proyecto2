import {datoEntorno} from './datoEntorno';

enum ROL{
    VARIABLE_LOCAL,
    VARIABLE_GLOBAL,
    VARIABLE_CONST,
    FUNCION
};

export class Entorno{
    static ROL = ROL;
    
    anterior: Entorno | null;
    ambito: string;         // ME DICE EN QUE AMBITO ESTOY
    private etqAmbito: string;  // GUARDO LA ETIQUETA QUE ME SERVIRA PARA ALGUNA TRANSFERENCIA BREAK
    private etqContinue: string;  // GUARDO LA ETIQUETA QUE ME SERVIRA PARA ALGUNA TRANSFERENCIA CONTINUE
    tabla = new Map<string,datoEntorno>();


    tamanio: number;        // TAMAÑO EN DATOS QUE TIENE ESTE ENTORNO
    contador: number;   // CONTADOR QUE AYUDA PARA SEGUIR CONTANDO

    constructor(ambito: string, anterior: Entorno|null, inicio:number){
        this.ambito = ambito;
        this.anterior = anterior;
        this.tamanio = 0;
        this.contador = inicio;

        this.etqAmbito = "-1";
        this.etqContinue = "-1";
    }


    public Agregar(llave: string, tipo: any ,rol: any, tamanioVar: number): boolean{
        let e ;
        this.tamanio += tamanioVar;
        llave = llave.toLowerCase();
        
        for(e = this; e!= null; e=e.anterior){
            let encontrado = e.tabla.has(llave);

            if(!encontrado){
                let contenido = new datoEntorno(tipo,rol,this.contador++,tamanioVar);
                this.tabla.set(llave,contenido);
                return false;
            }
        }
        return true;
    }

    public GuardarEtiqueta(etq: string):void{
        this.etqAmbito = etq;
    }
    public GuardarContinue(etq: string):void{
        this.etqContinue = etq;
    }


    public AgregarGlobal(llave: string, tipo: any ,rol: any, posHeap: string, tamanioVar: number): boolean{
        let e ;
        this.tamanio += tamanioVar;
        llave = llave.toLowerCase();
        
        for(e = this; e!= null; e=e.anterior){
            if(e.anterior == null){
                let encontrado = e.tabla.has(llave);

                if(!encontrado){
                    let contenido = new datoEntorno(tipo,rol,0,tamanioVar);
                    contenido.GetPosHeap(posHeap);
                    e.tabla.set(llave,contenido);
                    return false;
                }
            }
        }
        return true;
    }

    public AgregarFuncion(llave: string, tipo: any): boolean{
        let e ;
        //this.tamanio += tamanioVar;
        llave = llave.toLowerCase();
        
        for(e = this; e!= null; e=e.anterior){
            if(e.anterior == null){
                let encontrado = e.tabla.has(llave);
                if(!encontrado){
                    let contenido = new datoEntorno(tipo,Entorno.ROL.FUNCION,-1,1);
                    e.tabla.set(llave,contenido);
                    return false;
                }
            }
        }
        return true;
    }

    /* public AgregarTabla(llave: string, contenido: datoEntorno):void{
        let e ;
        for(e = this; e!= null; e=e.anterior){
            let encontrado = e.tabla.has(llave);

            if(!encontrado){
                this.tabla.set(llave,contenido);
            }
        }
    } */

    Existe(llave: string): boolean{
        let e ;
        llave = llave.toLowerCase();
        for(e = this; e!= null; e=e.anterior){
            if(e.tabla.has(llave))
                return true;
        }
        return false;
    }

    Existe_Entorno(tipo: string): string{
        let e ;
        for(e = this; e!= null; e=e.anterior){
            if(e.ambito === tipo)
                return e.etqAmbito;
        }
        return "-1";
    }

    Existe_Continue(tipo: string): string{
        let e ;
        for(e = this; e!= null; e=e.anterior){
            if(e.ambito === tipo)
                return e.etqContinue;
        }
        return "-1";
    }

    Get(llave: string): datoEntorno|undefined{
        let e ;
        llave = llave.toLowerCase();
        for(e = this; e!= null; e=e.anterior){
            if(e.tabla.has(llave))
                return e.tabla.get(llave);
        }
        return undefined;
    }


    DevolverJSON():string{ 
        let json = [{"nombre":"Global","Tipo":"Void","Ambito":this.ambito,"Rol":"-"
                    ,"Posicion":"-","Tamanio":this.tamanio}];

        for(let llave of this.tabla.keys()){
            let valor = this.tabla.get(llave);
            if(valor != undefined)
                json.push( {"nombre":llave,"Tipo":valor.DevolverTipo(),"Ambito":this.ambito,
                "Rol":valor.DevolverRol(),"Posicion":valor.posRelativa+"","Tamanio":valor.tamanio} );
        }

        return JSON.stringify(json);

    }
}