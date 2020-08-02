enum COMBINACION_TIPOS
{
    INTEGER_INTEGER,
    INTEGER_STRING,
    INTEGER_DOUBLE,
    INTEGER_CHAR,
    INTEGER_BOOL,

    STRING_INTEGER,
    STRING_STRING,
    STRING_DOUBLE,
    STRING_CHAR,
    STRING_BOOL,

    DOUBLE_INTEGER,
    DOUBLE_STRING,
    DOUBLE_DOUBLE,
    DOUBLE_CHAR,
    DOUBLE_BOOL,

    CHAR_INTEGER,
    CHAR_STRING,
    CHAR_DOUBLE,
    CHAR_CHAR,
    CHAR_BOOL,

    BOOL_INTEGER,
    BOOL_STRING,
    BOOL_DOUBLE,
    BOOL_CHAR,
    BOOL_BOOL,

    INTEGER,
    DOUBLE,
    BOOL,
    CHAR,
    STRING,

    ARR_INTEGER,
    ARR_DOUBLE,
    ARR_BOOL,
    ARR_CHAR,
    ARR_STRING,
    ARREGLO,
    ID,
    //NOTHING,
    VOID,
    ERR
}

export class auxExpresion{
    static COMBINACION_TIPOS = COMBINACION_TIPOS;

    static Evaluar_Tipos(op1:COMBINACION_TIPOS,op2:COMBINACION_TIPOS): COMBINACION_TIPOS{
            let respuesta: COMBINACION_TIPOS = COMBINACION_TIPOS.ERR;
            if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.INTEGER)
            {
                respuesta = COMBINACION_TIPOS.INTEGER_INTEGER;
            }else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.STRING)
            {
                respuesta = COMBINACION_TIPOS.INTEGER_STRING;
            }
            else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.DOUBLE)
            {
                respuesta = COMBINACION_TIPOS.INTEGER_DOUBLE
            }
            else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.CHAR)
            {
                respuesta = COMBINACION_TIPOS.INTEGER_CHAR
            }
            else if (op1 === COMBINACION_TIPOS.INTEGER && op2 === COMBINACION_TIPOS.BOOL)
            {
                respuesta = COMBINACION_TIPOS.INTEGER_BOOL
            }
            else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.INTEGER)
            {
                respuesta = COMBINACION_TIPOS.STRING_INTEGER;
            }
            else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.STRING)
            {
                respuesta = COMBINACION_TIPOS.STRING_STRING;
            }
            else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.DOUBLE)
            {
                respuesta = COMBINACION_TIPOS.STRING_DOUBLE;
            }
            else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.CHAR)
            {
                respuesta = COMBINACION_TIPOS.STRING_CHAR;
            }
            else if (op1 === COMBINACION_TIPOS.STRING && op2 === COMBINACION_TIPOS.BOOL)
            {
                respuesta = COMBINACION_TIPOS.STRING_BOOL;
            }
            else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.INTEGER)
            {
                respuesta = COMBINACION_TIPOS.DOUBLE_INTEGER;
            }
            else if(op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.STRING)
            {
                respuesta = COMBINACION_TIPOS.DOUBLE_STRING;
            }
            else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.DOUBLE)
            {
                respuesta = COMBINACION_TIPOS.DOUBLE_DOUBLE;
            }
            else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.CHAR)
            {
                respuesta = COMBINACION_TIPOS.DOUBLE_CHAR;
            }
            else if (op1 === COMBINACION_TIPOS.DOUBLE && op2 === COMBINACION_TIPOS.BOOL)
            {
                respuesta = COMBINACION_TIPOS.DOUBLE_BOOL;
            }
            else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.INTEGER)
            {
                respuesta = COMBINACION_TIPOS.CHAR_INTEGER;
            }
            else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.STRING)
            {
                respuesta = COMBINACION_TIPOS.CHAR_STRING;
            }
            else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.DOUBLE)
            {
                respuesta = COMBINACION_TIPOS.CHAR_DOUBLE;
            }
            else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.CHAR)
            {
                respuesta = COMBINACION_TIPOS.CHAR_CHAR;
            }
            else if (op1 === COMBINACION_TIPOS.CHAR && op2 === COMBINACION_TIPOS.BOOL)
            {
                respuesta = COMBINACION_TIPOS.CHAR_BOOL;
            }
            else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.INTEGER)
            {
                respuesta = COMBINACION_TIPOS.BOOL_INTEGER;
            }
            else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.STRING)
            {
                respuesta = COMBINACION_TIPOS.BOOL_STRING;
            }
            else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.DOUBLE)
            {
                respuesta = COMBINACION_TIPOS.BOOL_DOUBLE;
            }
            else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.CHAR)
            {
                respuesta = COMBINACION_TIPOS.BOOL_CHAR;
            }
            else if (op1 === COMBINACION_TIPOS.BOOL && op2 === COMBINACION_TIPOS.BOOL)
            {
                respuesta = COMBINACION_TIPOS.BOOL_BOOL;
            }
            return respuesta;
    }

    static GetDefault(tipo: any): string{
        let resultado="";
        switch(tipo){
            case auxExpresion.COMBINACION_TIPOS.INTEGER:{
                resultado = 0+"";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE:{
                resultado = 0+"";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR:{
                resultado = -1+"";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL:{
                resultado = 0+"";
                break;
            }
            default:{
                resultado = -1+"";
                break;
            }
        }
        return resultado;
    }

    static GetTipo(tipo: string): any{
        let resultado;
        tipo = tipo.toLowerCase();
        switch(tipo)
        {
            case "integer":{
                resultado = auxExpresion.COMBINACION_TIPOS.INTEGER;
                break;
            }
            case "double":{
                resultado = auxExpresion.COMBINACION_TIPOS.DOUBLE;
                break;
            }
            case "char":{
                resultado = auxExpresion.COMBINACION_TIPOS.CHAR;
                break;
            }
            case "boolean":{
                resultado = auxExpresion.COMBINACION_TIPOS.BOOL;
                break;
            }
            case "void":{
                resultado = auxExpresion.COMBINACION_TIPOS.VOID;
                break;
            }
            default: {
                if(tipo === "string"){
                    resultado = auxExpresion.COMBINACION_TIPOS.STRING;
                    break;
                }
                // CASO PARA CUANDO SEA UN IDENTIFICADOR
                resultado = auxExpresion.COMBINACION_TIPOS.ID;
            }
        }
        return resultado;
    }

    static GetTipoString(tipo: any): string{
        let resultado="";
        switch(tipo)
        {
            case auxExpresion.COMBINACION_TIPOS.INTEGER:{
                resultado = "integer";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.DOUBLE:{
                resultado = "double";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.CHAR:{
                resultado = "char";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.BOOL:{
                resultado = "boolean";
                break;
            }
            case auxExpresion.COMBINACION_TIPOS.VOID:{
                resultado = "void";
                break;
            }
            default: {
                if(tipo == auxExpresion.COMBINACION_TIPOS.STRING ){
                    resultado = "string";
                    break;
                }
                // CASO PARA CUANDO SEA UN IDENTIFICADOR
                //resultado = auxExpresion.COMBINACION_TIPOS.ID;
            }
        }
        return resultado;
    }

    static IsPrimity(tipo:any): boolean {
        if(tipo == auxExpresion.COMBINACION_TIPOS.INTEGER || tipo == auxExpresion.COMBINACION_TIPOS.DOUBLE
            || tipo == auxExpresion.COMBINACION_TIPOS.CHAR || tipo == auxExpresion.COMBINACION_TIPOS.BOOL
            || auxExpresion.COMBINACION_TIPOS.STRING)
                return true;
        
        return false;
    }
}

