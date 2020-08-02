/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

 %{
	/* const Valor = require('../Expresion/Valor');
	const Explicit = require('../Expresion/Casteo/Explicit');
	const Print = require('../FuncionesNativas/Print');
	const Declaracion = require('../Variables/Declaracion');
	const Declaracion2 = require('../Variables/Declaracion2');
	const Tipo = require('../Variables/Tipo');
	const AumDecre = require('../Variables/IncreUnario/AumDecre');
	const Asignacion = require('../Variables/Asignar/Asignacion');

	const Sentencia_if = require('../Sentencia_Control/Sentencia_if');
	const Sentencia_Case = require('../Sentencia_Control/Switch/Sentencia_Case');
	const Sentencia_Switch = require('../Sentencia_Control/Switch/Sentencia_Switch');
	const Sentencia_While = require('../Sentencia_Control/While/Sentencia_While');
	const Sentencia_DoWhile = require('../Sentencia_Control/DoWhile/Sentencia_DoWhile');
	const Sentencia_For = require('../Sentencia_Control/For/Sentencia_For');
	const Sentencia_Transferencia = require('../Sentencia_Control/Transferencia/Sentencia_Transferencia');

	const Parametro = require('../Funciones/Parametros/Parametro');
	const CrearFuncion = require('../Funciones/Creacion_Funcion/CrearFuncion');
	const LlamarFuncion = require('../Funciones/Llamar_Funcion/LlamarFuncion'); */
	const Informacion = require('../Datos/Informacion');
	const Exp = require('../Expresion/Exp');
	const Instruccion = require('../Codigo3D/Instrucciones/Instruccion');
	const Error = require('../nodoArbol/Error');
    const Terror = require('../Datos/Terror');
	const auxExpresion = require('../Expresion/auxExpresion');
    const Cabecera = require('../Codigo3D/Cabecera/Cabecera');
    const Temporal = require('../Codigo3D/Cabecera/Temporal');
    const AsigOperacion = require('../Codigo3D/Operacion/AsigOperacion');
	const Print = require('../Codigo3D/Print/Print');
	const Call = require('../Codigo3D/Call/Call');
	const Proc = require('../Codigo3D/Proc/Proc');
	const Etiqueta = require('../Codigo3D/Etiqueta/Etiqueta');
	const DHeap_Stack = require('../Codigo3D/Stack_Heap/DHeap_Stack');
	const AHeap_Stack = require('../Codigo3D/Stack_Heap/AHeap_Stack');
	const If = require('../Codigo3D/If/If');
	const Goto = require('../Codigo3D/Goto/Goto');
    const Asignacion= require('../Codigo3D/Operacion/Asignacion');

 %}

/* Definición Léxica */
%lex

%options case-insensitive
%options yylinemo
%locations

%x string comment
%%
/* Espacios en blanco */
[ \r\t]+            {}
\n                  {}
"#".*										// comentario simple línea
[#][*][^*]*[*]+([^#*][^*]*[*]+)*[#]			// comentario multiple líneas
//========================= PALABRAS RESERVADAS =======================
"var"				return 'tk_var';
"stack"				return 'tk_stack';
"heap"				return 'tk_heap';
"goto"				return 'tk_goto';
"begin"				return 'tk_begin';
"end"				return 'tk_end';
"call"				return 'tk_call';
"if"				return 'tk_if';
"print"             return 'tk_print';

"proc"			 	return 'tk_proc';


//========================= SIMBOLOS RESERVADAS =======================
";"                 return 'ptcoma';
"("                 return 'para';
")"                 return 'parc';
"["                 return 'corizq';
"]"                 return 'corder';
":"                 return 'dospts';
","                 return 'coma';
//'"'                return 'comilla';


"+"                 return 'mas';
"-"                 return 'menos';
"*"                 return 'por';
"/"                 return 'div';
["]"%i"["]                return 'pInt';
["]"%d"["]                return 'pDouble';
["]"%c"["]                return 'pChar';
"%"					return 'modulo';

"<="                return 'menor_igual';
">="                return 'mayor_igual';
"<>"                return 'diferencia';
"<"                 return 'menor';
">"                 return 'mayor';
"=="                return 'igualacion';
"="                 return 'equal';

//t[0-9]+                             return 'temporal';  
l[0-9]+                             return 'etiqueta';
[0-9]+"."[0-9]+\b    				return 'decimal';
[0-9]+\b                			return 'numero';
[a-zA-Z_][_a-zA-Z0-9nÑ]*\b			return 'identificador';



<<EOF>>                 return 'EOF';

.                       { 	console.log('Error léxico: "' + yytext + '", en la linea: ' 
							+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);
							Informacion.Informacion.AddMessage('Error léxico: "' + yytext + '", en la linea: ' 
							+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);
							 Informacion.Informacion.lista_errores.push( 
								 new Terror.Terror(yytext,yylloc.first_line,yylloc.first_column,'Lexico','') ); }
/lex

%start INICIO

%% /* Definición de la gramática */

INICIO
	: DECLARAR_VARIABLES DECLARAR_STACK DECLARAR_HEAP DECLARAR_PUNTEROS DECLARAR_PUNTEROS
       INSTRUCCIONES EOF				
       { return new Cabecera.Cabecera($1,$6); }
;

//===================== DECLARAR VARIABLES =====================
DECLARAR_VARIABLES:
                tk_var LISTA_ID ptcoma          { $$ = new Temporal.Temporal($2); }
;
LISTA_ID: LISTA_ID coma identificador			{ $1.push($3); $$ = $1;  }
        | identificador							{ $$ = []; $$.push($1); }
;

//===================== DECLARAR STACK =====================
DECLARAR_STACK:
            tk_var tk_stack corizq corder ptcoma    
;
//===================== DECLARAR HEAP =====================
DECLARAR_HEAP:
            tk_var tk_heap corizq corder ptcoma     
;

//===================== PUNTEROS =====================
DECLARAR_PUNTEROS:
            tk_var identificador equal numero ptcoma 
;


INSTRUCCIONES
	: INSTRUCCIONES	INSTRUCCION 	{ if($1 instanceof Instruccion.Instruccion) $1.listaInstrucciones.push($2); $$ = $1; }
	| INSTRUCCION					{ $$ = new Instruccion.Instruccion($1); }
	| error  { console.log('Error Sintactico: "' + yytext + '", en la linea: '+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.AddMessage('Error Sintactico: "' + yytext + '", en la linea: ' 
				+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.lista_errores.push( 
				new Terror.Terror(yytext,this._$.first_line,this._$.first_column,'Sintactico','') );
				$$ = new Error.Error(this._$.first_line,this._$.first_column);  }
;

INSTRUCCION
	: ASIGNACION    			{ $$ = $1; }
    | DESTINO_SALTO             { $$ = $1; }   
    | SALTO_INCONDICIONAL ptcoma    { $$ = $1; }
    | SALTO_CONDICIONAL ptcoma      { $$ = $1; }
    | DECLARAR_METODO               { $$ = $1; }
    | LLAMAR_METODO                 { $$ = $1; }
    | PRINT		            		{ $$ = $1; }
    | ASIGNAR_HEAP                  { $$ = $1; }
    | ASIGNAR_STACK                 { $$ = $1; }
;

PROGRAMA:
		PROGRAMA PROGRAMA_SENTENCIA		{ if($1 instanceof Instruccion.Instruccion) $1.listaInstrucciones.push($2); $$ = $1; }
	  | PROGRAMA_SENTENCIA			{ $$ = new Instruccion.Instruccion($1); }
	| error { console.log('Error Sintactico: "' + yytext + '", en la linea: '+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.AddMessage('Error Sintactico: "' + yytext + '", en la linea: ' 
				+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.lista_errores.push( 
				new Terror.Terror(yytext,this._$.first_line,this._$.first_column,'Sintactico','') );
				$$ = new Error.Error(this._$.first_line,this._$.first_column);  }
;

PROGRAMA_SENTENCIA
				: ASIGNACION    			    { $$ = $1; }
                | DESTINO_SALTO                 { $$ = $1; }    
                | SALTO_INCONDICIONAL ptcoma    { $$ = $1; }
                | SALTO_CONDICIONAL ptcoma      { $$ = $1; }
                | LLAMAR_METODO                 { $$ = $1; }
                | PRINT     				    { $$ = $1; }
                | ASIGNAR_HEAP                  { $$ = $1; }
                | ASIGNAR_STACK                 { $$ = $1; }
;

//===================== ASIGNAR VARIABLES =====================
ASIGNACION: identificador equal VALOR OPERACION VALOR ptcoma    
									{ $$ = new AsigOperacion.AsigOperacion($1,$3,$4,$5
									,@1.first_line,@1.first_column); }
            | identificador equal VALOR ptcoma					
									{ $$ = new Asignacion.Asignacion($1,$3
									,@1.first_line,@1.first_column); }

            | ASIGNAR_MEMORIA ptcoma                            { $$ = $1; }
;

ASIGNAR_MEMORIA: identificador equal tk_stack corizq VALOR corder	
											{ $$ = new DHeap_Stack.DHeap_Stack($1,$5,true
													,@1.first_line,@1.first_column); }
                | identificador equal tk_heap corizq VALOR corder	
											{ $$ = new DHeap_Stack.DHeap_Stack($1,$5,false
													,@1.first_line,@1.first_column); }
;

VALOR: decimal          { $$ = $1; }
	  | menos decimal   { $$ = $1+$2; }
      | numero          { $$ = $1; }
	  | menos numero	{ $$ = $1+$2; }
      | identificador   { $$ = $1; }
      //| temporal        { $$ = $1; }
;

//===================== OPERADOR =====================
OPERACION: mas                  { $$ = Exp.Exp.OPERACION.suma; }
            | menos             { $$ = Exp.Exp.OPERACION.resta; }
            | por               { $$ = Exp.Exp.OPERACION.multi; }
            | div               { $$ = Exp.Exp.OPERACION.division; }
            | modulo            { $$ = Exp.Exp.OPERACION.modulo; }
            | RELACIONAL        { $$ = $1; }
;
RELACIONAL: menor_igual         { $$ = Exp.Exp.OPERACION.menor_igual; }
            | mayor_igual       { $$ = Exp.Exp.OPERACION.mayor_igual; }
            | menor             { $$ = Exp.Exp.OPERACION.menor; }
            | mayor             { $$ = Exp.Exp.OPERACION.mayor; }
            | igualacion        { $$ = Exp.Exp.OPERACION.igualacion; }
            | diferencia        { $$ = Exp.Exp.OPERACION.diferencia; }
;

//===================== ASIGNAR STACK =====================
ASIGNAR_STACK: tk_stack corizq VALOR corder equal VALOR ptcoma 
								{ $$ = new AHeap_Stack.AHeap_Stack($3,$6,true
									,@1.first_line,@1.first_column); }  
;

//===================== ASIGNAR HEAP =====================
ASIGNAR_HEAP: tk_heap corizq VALOR corder equal VALOR ptcoma  
								{ $$ = new AHeap_Stack.AHeap_Stack($3,$6,false
									,@1.first_line,@1.first_column); } 
;


//===================== DESTINO SALTO =====================
DESTINO_SALTO: etiqueta dospts          		{ $$ = new Etiqueta.Etiqueta($1
													,@1.first_line,@1.first_column); }
;

//===================== SALTO INCONDICIONAL =====================
SALTO_INCONDICIONAL: tk_goto etiqueta 	{ $$ = new Goto.Goto($2
													,@1.first_line,@1.first_column); }
;

//===================== SALTO CONDICIONAL =====================
SALTO_CONDICIONAL: tk_if para VALOR RELACIONAL VALOR parc tk_goto etiqueta
											{ $$ = new If.If($3,$5,$4,$8
												,@1.first_line,@1.first_column); }
;

//===================== DECLARACION DE METODOS =====================
DECLARAR_METODO: tk_proc identificador tk_begin PROGRAMA tk_end		
												{ $$ = new Proc.Proc($2,$4
												,@1.first_line,@1.first_column); }
;

//===================== LLAMAR METODOS =====================
LLAMAR_METODO: tk_call identificador ptcoma			{ $$ = new Call.Call($2
															,@1.first_line,@1.first_column); }
;

//===================== SENTENCIA PRINT =====================
PRINT: tk_print para pInt coma VALOR  parc ptcoma			{ $$ = new Print.Print($5,1
															,@1.first_line,@1.first_column); }
        | tk_print para pDouble coma VALOR  parc ptcoma		{ $$ = new Print.Print($5,2
															,@1.first_line,@1.first_column); }
        | tk_print para pChar coma VALOR  parc ptcoma		{ $$ = new Print.Print($5,3
															,@1.first_line,@1.first_column); }
;

/*TIPO_PRINT: pInt
            | pDouble
            | pChar
;*/









