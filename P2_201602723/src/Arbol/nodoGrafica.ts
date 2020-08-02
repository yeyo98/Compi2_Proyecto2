export class nodoGrafica{
    name: string;
    parent: string;
    children: nodoGrafica[];

    constructor()
    {
        this.name = "";
        this.parent = "null";
        this.children = [];
    }

    // AQUI CREO UN NODO, SOLO GUARDO EL NOMBRE PORQUE 
    Crear_NodoInicial(nombre:string):void{
        this.name = nombre;
    }

    Armar_NodoGrafica(nombre:string, Nodo1: nodoGrafica, Nodo2: nodoGrafica | null):void{
        // GUARDO EL NOMBRE DE LA NUEVA CABEZA
        this.name = nombre;

        // GUARDO EL PRIMER NODO
        if(Nodo1 != null){
            Nodo1.parent = nombre;
            this.children.push(Nodo1);
        }

        // GUARDO EL SIGUIENTE NODO SI NO ES NULL
        if(Nodo2 != null){
            Nodo2.parent = nombre;
            this.children.push(Nodo2);
        }
    }

    private Unir_Palabra(nombre: string){
        // GUARDO EL NOMBRE DE LA NUEVA CABEZA
        this.name = nombre;
    }
}


/*
export class nodoGrafica{
    cabeza: string;
    cuerpo: string[];

    constructor()
    {
        this.cabeza = "";
        this.cuerpo = [];
    }

    Crear_NodoInicial(nuevaCabeza:string, textoCabeza: string):void{
        // GUARDO EL NOMBRE DE LA NUEVA CABEZA
        this.cabeza = nuevaCabeza;
        // AHORA CREO EL NODO
        this.Nodo_Arbol(nuevaCabeza,textoCabeza);
    }

    Armar_NodoGrafica(nuevaCabeza:string, textoCabeza: string, Nodo1: nodoGrafica, Nodo2: nodoGrafica):void{
        // GUARDO EL NOMBRE DE LA NUEVA CABEZA
        this.cabeza = nuevaCabeza;
        // PRIMERO GUARDO EL CUERPO DEL NODO1
        for(let linea in Nodo1.cuerpo)
            this.cuerpo.push(linea);

        // PRIMERO GUARDO EL CUERPO DEL NODO2 SI EXISTE
        if(Nodo2 != null){
            for(let linea in Nodo2.cuerpo)
                this.cuerpo.push(linea);
        }

        // AHORA CREO EL NODO
        this.Nodo_Arbol(nuevaCabeza,textoCabeza);

        // POR ULTIMO ENLAZO LOS NODOS
        this.Enlazar_Nodos(nuevaCabeza,Nodo1,Nodo2);
    }

        /**
         * NOMBRENODO ES EL NOMBRE QUE TENDRA EL NODO
         * NOMBRELABEL ES EL NOMBRE QUE LLEVARA LA ETIQUETA PARA VER
         /
        private Nodo_Arbol(nombreNodo: string, nombreLabel: string): void{
            this.cuerpo.push("\""+nombreNodo+"\""+" [label=\""+nombreLabel+"\",style=filled,shape=box]");
        }
    
        private Enlazar_Nodos(cabeza: string, Nodo1: nodoGrafica, Nodo2: nodoGrafica): void{
            this.cuerpo.push("");
            this.cuerpo.push("\t"+"\""+cabeza +"\""+" -> "+"\""+Nodo1.cabeza+"\"");
            if(Nodo2 != null)
                this.cuerpo.push("\t"+"\""+cabeza +"\""+" -> "+"\""+Nodo2.cabeza+"\""); 
            this.cuerpo.push("");
        }
    
    }
     */