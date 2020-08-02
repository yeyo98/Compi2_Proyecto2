/**
 * Ejemplo mi primer proyecto con Jison utilizando Nodejs en Ubuntu
 */

 %{
	const Terror = require('../Datos/Terror');
	const Informacion = require('../Datos/Informacion');
	const Valor = require('../Expresion/Valor');
	const Exp = require('../Expresion/Exp');
	const auxExpresion = require('../Expresion/auxExpresion');
	const Explicit = require('../Expresion/Casteo/Explicit');
	const Instruccion = require('../nodoArbol/Instruccion');
	const Error = require('../nodoArbol/Error');
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
	const LlamarFuncion = require('../Funciones/Llamar_Funcion/LlamarFuncion');

	const Import = require('../Importacion/Import');
	const Inicio = require('../Importacion/Inicio/Inicio');

	const FuncionNativa =require('../FuncionesNativas/FuncionNativa');
	const Funcion = require('../FuncionesNativas/Funcion');
	const ListaArreglo = require('../Arreglos/ListaArreglo');


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
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas
//========================= PALABRAS RESERVADAS =======================
"Evaluar"           return 'REVALUAR';
"null"				return 'tk_null';
"integer"			return 'tk_integer';
"double"			return 'tk_double';
"char"				return 'tk_char';
"boolean"			return 'tk_boolean';
"import"			return 'tk_import';
"var"				return 'tk_var';
"const"				return 'tk_const';
"global"			return 'tk_global';
"true"			 	return 'tk_true';
"false"				return 'tk_false';
"if"				return 'tk_if';
"else"				return 'tk_else';
"switch"			return 'tk_switch';
"case"				return 'tk_case';
"default"			return 'tk_default';
"break"				return 'tk_break';
"continue"			return 'tk_continue';
"return"			return 'tk_return';
"print"				return 'tk_print';
"public"			return 'tk_public';
"private"			return 'tk_private';
"void"				return 'tk_void';
"for"				return 'tk_for';
"while"				return 'tk_while';
"define"			return 'tk_define';
"as"				return 'tk_as';
"strc"				return 'tk_strc';
"do"				return 'tk_do';
"try"				return 'tk_try';
"catch"				return 'tk_catch';
"throw"				return 'tk_throw';
//========================= SIMBOLOS RESERVADAS =======================
";"                 return 'ptcoma';
"("                 return 'para';
")"                 return 'parc';
"["                 return 'corizq';
"]"                 return 'corder';
"{"                 return 'llavea';
"}"                 return 'llavec';
":="				return 'equal2';
":"                 return 'dospts';
","                 return 'coma';
"."					return 'punto';


"++"				return 'incremento';
"--"				return 'decremento';
"+"                 return 'mas';
"-"                 return 'menos';
"*"                 return 'por';
"/"                 return 'div';
"^^"				return 'potencia';
"%"					return 'modulo';

"<="                return 'menor_igual';
">="                return 'mayor_igual';
"<"                 return 'menor';
">"                 return 'mayor';
"&&"                return 'op_and';
"||"                return 'op_or';
"==="               return 'igualdad_referencia';
"=="                return 'igualacion';
"="                 return 'equal';
"!="                return 'diferencia';
"!"                 return 'not';
"^"                 return 'xor';
//"\\"                 return 'invertido';


[0-9]+"."[0-9]+\b    				return 'decimal';
[0-9]+\b                			return 'numero';
\'[^\']\'							return 'caracter';
[a-zA-Z][-_a-zA-Z0-9nÑ.]*[.]j\b		return 'nombre_archivo';
[a-zA-Z_][_a-zA-Z0-9nÑ]*\b			return 'identificador';
\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'cadena'; }


<<EOF>>                 return 'EOF';

.                       { 	console.log('Error léxico: "' + yytext + '", en la linea: ' 
							+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);
							Informacion.Informacion.AddMessage('Error léxico: "' + yytext + '", en la linea: ' 
							+ yylloc.first_line + ', en la columna: ' + yylloc.first_column);
							 Informacion.Informacion.lista_errores.push( 
								 new Terror.Terror(yytext,yylloc.first_line,yylloc.first_column,'Lexico','') ); }
/lex

/* Asociación de operadores y precedencia */
%left 'incremento' 'decremento'
%left 'xor'
%left 'op_or'
%left 'op_and'
%left 'igualacion' 'diferencia' 'igualdad_referencia'
%left 'mayor' 'mayor_igual' 'menor' 'menor_igual'
%left 'mas' 'menos'
%left 'por' 'div' 'modulo'
%left 'potencia'
%left Umenos
%left Unot
//%left UDouble
//%left UInteger
//%left UChar
%left 'para' 'parc'


%start INICIO

%% /* Definición de la gramática */

INICIO
	: IMPORTACION INSTRUCCIONES EOF	{ return new Inicio.Inicio($1,$2); }
	| INSTRUCCIONES EOF				{ return $1; }
;

//===================== IMPORTACION =====================
IMPORTACION: tk_import LISTA_ARCHIVO				{ $$ = new Import.Import($2,
														@1.first_line,@1.first_column); }
            | tk_import LISTA_ARCHIVO ptcoma		{ $$ = new Import.Import($2,
        												@1.first_line,@1.first_column); }
;

LISTA_ARCHIVO: LISTA_ARCHIVO coma nombre_archivo	{ $1.push($3); $$ = $1; }
             | nombre_archivo						{ $$ = []; $$.push($1); }
;

INSTRUCCIONES
	: INSTRUCCIONES	INSTRUCCION 	{ if($1 instanceof Instruccion.Instruccion) $1.listaInstrucciones.push($2); $$ = $1; }
	| INSTRUCCION					{ $$ = new Instruccion.Instruccion($1,null); }
	| error  { console.log('Error Sintactico: "' + yytext + '", en la linea: '+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.AddMessage('Error Sintactico: "' + yytext + '", en la linea: ' 
				+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.lista_errores.push( 
				new Terror.Terror(yytext,this._$.first_line,this._$.first_column,'Sintactico','') );
				$$ = new Error.Error(this._$.first_line,this._$.first_column);  }
;

INSTRUCCION
	: //PRINT 					{ $$ = $1; }
	//| PRINT ptcoma				{ $$ = $1; }
	 DECLARACION				{ $$ = $1; }
	| DECLARACION ptcoma		{ $$ = $1; }
    //| ASIGNACION				{ $$ = $1; }
    //| ASIGNACION ptcoma			{ $$ = $1; }
	//| AUMENTO					{ $$ = $1; }
	//| AUMENTO ptcoma			{ $$ = $1; }

	/* | SENTENCIA_IF				{ $$ = $1; }
    | SENTENCIA_SWITCH			{ $$ = $1; }
    | SENTENCIA_WHILE			{ $$ = $1; }
    | SENTENCIA_DOWHILE			{ $$ = $1; }
    | SENTENCIA_FOR				{ $$ = $1; }
    | SENTENCIA_TRANSFERENCIA 	{ $$ = $1; } */

	| CREAR_FUNCION				{  Informacion.Informacion.AddMetodo($1); $$ = $1; }
	//| CALL_FUNCION				{ $$ = $1; }
	//| CALL_FUNCION ptcoma    	{ $$ = $1; }
;

PROGRAMA:
		PROGRAMA PROGRAMA_SENTENCIA		{ if($1 instanceof Instruccion.Instruccion) $1.listaInstrucciones.push($2); $$ = $1; }
	  | PROGRAMA_SENTENCIA			{ $$ = new Instruccion.Instruccion($1,null); }
	| error { console.log('Error Sintactico: "' + yytext + '", en la linea: '+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.AddMessage('Error Sintactico: "' + yytext + '", en la linea: ' 
				+ this._$.first_line + ', en la columna: ' + this._$.first_column);
				Informacion.Informacion.lista_errores.push( 
				new Terror.Terror(yytext,this._$.first_line,this._$.first_column,'Sintactico','') );
				$$ = new Error.Error(this._$.first_line,this._$.first_column);  }
;

PROGRAMA_SENTENCIA
				: PRINT						{ $$ = $1; }
                | PRINT ptcoma				{ $$ = $1; }
                | DECLARACION				{ $$ = $1; }
                | DECLARACION ptcoma		{ $$ = $1; }
				| FUNCIONES_NATIVAS			{ $$ = $1; }
				| FUNCIONES_NATIVAS ptcoma	{ $$ = $1; }
                | ASIGNACION				{ $$ = $1; }
                | ASIGNACION ptcoma			{ $$ = $1; }
				| AUMENTO					{ $$ = $1; }
				| AUMENTO ptcoma			{ $$ = $1; }

                | SENTENCIA_IF				{ $$ = $1; }
                | SENTENCIA_SWITCH			{ $$ = $1; }
                | SENTENCIA_WHILE			{ $$ = $1; }
                | SENTENCIA_DOWHILE			{ $$ = $1; }
                | SENTENCIA_FOR				{ $$ = $1; }
                | SENTENCIA_TRANSFERENCIA 	{ $$ = $1; }

				| CALL_FUNCION				{ $$ = $1; }
				| CALL_FUNCION ptcoma    	{ $$ = $1; }

;


//===================== DECLARACION =====================
DECLARACION: TIPOS LISTA_ID equal EXPRESION					{ $$ = new Declaracion.Declaracion($1,$2,$4,1,
																	@1.first_line,@1.first_column); }
            | tk_var identificador equal2 EXPRESION			{ $$ = new Declaracion2.Declaracion2($2,$4,2,
																	@1.first_line,@1.first_column); }
            | tk_const identificador equal2 EXPRESION		{ $$ = new Declaracion2.Declaracion2($2,$4,3,
																	@1.first_line,@1.first_column); }
            | tk_global identificador equal2 EXPRESION		{ $$ = new Declaracion2.Declaracion2($2,$4,4,
																	@1.first_line,@1.first_column); }
            | TIPOS LISTA_ID								{ $$ = new Declaracion.Declaracion($1,$2,null,5,
																	@1.first_line,@1.first_column);  }
;

LISTA_ID: LISTA_ID coma identificador			{ $1.push($3); $$ = $1;  }
        | identificador							{ $$ = []; $$.push($1); }
;

TIPOS: TIPO										{ $$ = new Tipo.Tipo($1,false);  }
        | TIPO corizq corder					{ $$ = new Tipo.Tipo($1,true); }
;

TIPO: tk_integer					{ $$ = $1; }
        | tk_double					{ $$ = $1; }
        | tk_char					{ $$ = $1; }
        | tk_boolean				{ $$ = $1; }
		| tk_void					{ $$ = $1; }
        | identificador				{ $$ = $1; }
;

//===================== GRAMATICA PARA IMPRIMIR =====================
PRINT: tk_print para EXPRESION	parc			{ $$ = new Print.Print($3,@1.first_line,@1.first_column); }
;


//===================== ASIGNACION =====================
ASIGNACION: identificador equal EXPRESION		{ $$ = new Asignacion.Asignacion($1,$3
													,@1.first_line,@1.first_column); }
        | identificador corder EXPRESION corizq equal EXPRESION		{  }
;

//===================== AUMENTO =====================
AUMENTO: identificador incremento 				{ $$ = new AumDecre.AumDecre($1,true
													,@1.first_line,@1.first_column); }
        | identificador decremento 				{ $$ = new AumDecre.AumDecre($1,false
													,@1.first_line,@1.first_column); }
;

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% SENTENCIAS DE CONTROL %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
//===================== SENTENCIA IF =================
SENTENCIA_IF: tk_if para EXPRESION parc llavea PROGRAMA llavec	
									{ $$ = new Sentencia_if.Sentencia_if($3,$6,null,1,
									@1.first_line,@1.first_column); }
			| tk_if para EXPRESION parc llavea PROGRAMA llavec 
				tk_else llavea  PROGRAMA llavec						
									{ $$ = new Sentencia_if.Sentencia_if($3,$6,$10,2,
									@1.first_line,@1.first_column); }
			| tk_if para EXPRESION parc llavea PROGRAMA llavec 
				tk_else SENTENCIA_IF                        					
									{ $$ = new Sentencia_if.Sentencia_if($3,$6,$9,3,
									@1.first_line,@1.first_column); }
;

//===================== SENTENCIA SWITCH ==================
SENTENCIA_SWITCH: tk_switch para EXPRESION parc llavea LIST_CASE llavec 
								{ $$ = new Sentencia_Switch.Sentencia_Switch($3,$6,
									@1.first_line,@1.first_column); }
;

LIST_CASE: LIST_CASE SENTENCIA_CASE 		{ $1.push($2); $$=$1; }
           | SENTENCIA_CASE               	{ $$=[]; $$.push($1); }
;

SENTENCIA_CASE: tk_case EXPRESION dospts PROGRAMA 		
								{ $$= new Sentencia_Case.Sentencia_Case($2,$4,true,@1.first_line,@1.first_column); }
            	| tk_default dospts PROGRAMA    		
								{ $$= new Sentencia_Case.Sentencia_Case(null,$3,false,@1.first_line,@1.first_column); }
;

//===================== SENTENCIA WHILE =================
SENTENCIA_WHILE: tk_while para EXPRESION parc llavea PROGRAMA llavec
								{ $$ = new Sentencia_While.Sentencia_While($3,$6
									,@1.first_line,@1.first_column); }
;

//===================== SENTENCIA DO-WHILE =================
SENTENCIA_DOWHILE:  tk_do llavea PROGRAMA llavec tk_while para EXPRESION parc
								{ $$ = new Sentencia_DoWhile.Sentencia_DoWhile($7,$3
									,@1.first_line,@1.first_column); }
;

//===================== SENTENCIA FOR =================
SENTENCIA_FOR: tk_for para INICIOFOR ptcoma EXPRESION ptcoma FINALFOR parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For($3,$5,$7,$10
									,@1.first_line,@1.first_column);  }
			| tk_for para  ptcoma EXPRESION ptcoma FINALFOR parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For(null,$4,$6,$9
									,@1.first_line,@1.first_column);  }
			| tk_for para INICIOFOR ptcoma ptcoma FINALFOR parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For($3,null,$6,$9
									,@1.first_line,@1.first_column);  }

			| tk_for para INICIOFOR ptcoma EXPRESION ptcoma parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For($3,$5,null,$9
									,@1.first_line,@1.first_column);  }
			| tk_for para ptcoma ptcoma FINALFOR parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For(null,null,$5,$8
									,@1.first_line,@1.first_column);  }
			| tk_for para INICIOFOR ptcoma ptcoma parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For($3,null,null,$8
									,@1.first_line,@1.first_column);  }

			| tk_for para ptcoma EXPRESION ptcoma parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For(null,$4,null,$8
									,@1.first_line,@1.first_column);  }
			| tk_for para ptcoma ptcoma parc llavea PROGRAMA llavec 
						{ $$ = new Sentencia_For.Sentencia_For(null,null,null,$7
									,@1.first_line,@1.first_column);  }
; 

INICIOFOR: DECLARACION		{ $$=$1; }
        | ASIGNACION		{ $$=$1; }
;

FINALFOR: AUMENTO			{ $$=$1; }
         | ASIGNACION		{ $$=$1; }
;

//===================== SENTENCIA DE TRANSFERENCIA ==================
SENTENCIA_TRANSFERENCIA: tk_break         					
								{ $$ = new Sentencia_Transferencia.Sentencia_Transferencia(1,null
									,@1.first_line,@1.first_column); }
                         | tk_break ptcoma        					
								{ $$ = new Sentencia_Transferencia.Sentencia_Transferencia(1,null
									,@1.first_line,@1.first_column); }
                         | tk_continue	      				         					
								{ $$ = new Sentencia_Transferencia.Sentencia_Transferencia(2,null
									,@1.first_line,@1.first_column); }
                         | tk_continue ptcoma	      				         					
								{ $$ = new Sentencia_Transferencia.Sentencia_Transferencia(2,null
									,@1.first_line,@1.first_column); }
                         | tk_return ptcoma    				         					
								{ $$ = new Sentencia_Transferencia.Sentencia_Transferencia(3,null
									,@1.first_line,@1.first_column); }
                         | tk_return EXPRESION ptcoma		         					
								{ $$ = new Sentencia_Transferencia.Sentencia_Transferencia(4,$2
									,@1.first_line,@1.first_column); }
;


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% SENTENCIAS PARA LAS FUNCIONES %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

//===================== CREACION DE FUNCIONES ==================
CREAR_FUNCION: TIPOS identificador para parc llavea PROGRAMA llavec
									{ $$ = new CrearFuncion.CrearFuncion($1,$2,null,$6
										,@1.first_line,@1.first_column); }
              | TIPOS identificador para LISTA_PARAMETROS parc llavea PROGRAMA llavec
									{ $$ = new CrearFuncion.CrearFuncion($1,$2,$4,$7
										,@1.first_line,@1.first_column); }
;

LISTA_PARAMETROS: LISTA_PARAMETROS coma TIPOS identificador	{ $1.push(new Parametro.Parametro($3,$4)); $$ = $1;  }
                | TIPOS identificador							{ $$ = []; $$.push( new Parametro.Parametro($1,$2) ); }
;

//===================== LLAMADAS DE LAS FUNCIONES ==================
CALL_FUNCION: identificador para parc				{ $$ = new LlamarFuncion.LlamarFuncion($1,null
														,@1.first_line,@1.first_column); }
            |  identificador para LISTA_EXP parc	{ $$ = new LlamarFuncion.LlamarFuncion($1,$3
														,@1.first_line,@1.first_column); }
;


//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% EXPRESION %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
EXPRESION
	: EXPRESION xor EXPRESION					{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.xor
													,@1.first_line,@1.first_column); }
    | EXPRESION op_or EXPRESION					{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.op_or
													,@1.first_line,@1.first_column); }
    | EXPRESION op_and EXPRESION				{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.op_and
													,@1.first_line,@1.first_column); }
    | EXPRESION igualacion EXPRESION			{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.igualacion
													,@1.first_line,@1.first_column); }
    | EXPRESION diferencia EXPRESION			{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.diferencia
													,@1.first_line,@1.first_column); }
    | EXPRESION igualdad_referencia EXPRESION	{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.igualdad_referencia
													,@1.first_line,@1.first_column); }
													
    | EXPRESION mayor_igual EXPRESION			{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.mayor_igual
													,@1.first_line,@1.first_column); }
    | EXPRESION menor_igual EXPRESION			{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.menor_igual
													 ,@1.first_line,@1.first_column); }
    | EXPRESION mayor EXPRESION					{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.mayor
													,@1.first_line,@1.first_column); }
    | EXPRESION menor EXPRESION					{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.menor
													,@1.first_line,@1.first_column); }

	| EXPRESION mas EXPRESION       { $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.suma
											,@1.first_line,@1.first_column);  }
	| EXPRESION menos EXPRESION     { $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.resta
											,@1.first_line,@1.first_column); }
	| EXPRESION por EXPRESION       { $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.multi
											,@1.first_line,@1.first_column); }
	| EXPRESION div EXPRESION  		{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.division
											,@1.first_line,@1.first_column); } 	
    | EXPRESION modulo EXPRESION	{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.modulo
											,@1.first_line,@1.first_column); } 
    | EXPRESION potencia EXPRESION	{ $$ = new Exp.Exp($1,$3,Exp.Exp.OPERACION.potencia
											,@1.first_line,@1.first_column); } 
	| menos EXPRESION %prec Umenos  { $$ = new Exp.Exp($2,null,Exp.Exp.OPERACION.Umenos
											,@2.first_line,@2.first_column); }
	| not EXPRESION %prec Unot  { $$ = new Exp.Exp($2,null,Exp.Exp.OPERACION.not
											,@2.first_line,@2.first_column); }
	| para EXPRESION parc       		{ $$ = $2; }

	| para tk_double parc EXPRESION		{ $$ = new Explicit.Explicit($4,1
												,@4.first_line,@4.first_column); }
	| para tk_integer parc EXPRESION	{ $$ = new Explicit.Explicit($4,2
												,@4.first_line,@4.first_column); }
	| para tk_char parc EXPRESION		{ $$ = new Explicit.Explicit($4,3
												,@4.first_line,@4.first_column); }

	| VALOR								{ $$ = $1; }
;

VALOR
	: numero				{ $$ = new Valor.Valor($1,auxExpresion.auxExpresion.COMBINACION_TIPOS.INTEGER
									,@1.first_line,@1.first_column); }
        | decimal			{ $$ = new Valor.Valor($1,auxExpresion.auxExpresion.COMBINACION_TIPOS.DOUBLE
									,@1.first_line,@1.first_column); }
        | caracter			{ $$ = new Valor.Valor($1.split('\'').join(''),
									 auxExpresion.auxExpresion.COMBINACION_TIPOS.CHAR,@1.first_line,@1.first_column); }
        | tk_true			{ $$ = new Valor.Valor('1',auxExpresion.auxExpresion.COMBINACION_TIPOS.BOOL
									,@1.first_line,@1.first_column); }
        | tk_false			{ $$ = new Valor.Valor('0',auxExpresion.auxExpresion.COMBINACION_TIPOS.BOOL
									,@1.first_line,@1.first_column); }
        | cadena			{ $$ = new Valor.Valor($1,auxExpresion.auxExpresion.COMBINACION_TIPOS.STRING
									,@1.first_line,@1.first_column); }
        | identificador		{ $$ = new Valor.Valor($1,auxExpresion.auxExpresion.COMBINACION_TIPOS.ID
									,@1.first_line,@1.first_column); }
		| identificador incremento 				{ $$ = new AumDecre.AumDecre($1,true
													,@1.first_line,@1.first_column); }
        | identificador decremento 				{ $$ = new AumDecre.AumDecre($1,false
													,@1.first_line,@1.first_column); }
		| VALOR_ARRAY				{ $$ = new ListaArreglo.ListaArreglo($1); }
		
		| CALL_FUNCION				{ $$ = $1; }

		| FUNCIONES_NATIVAS			{ $$ = $1; }
;

//===================== LISTA DE EXP PARA EL ARREGLO =====================
VALOR_ARRAY
		: llavea LISTA_EXP llavec		{ $$ = $2; }
;

LISTA_EXP:
		  LISTA_EXP coma EXPRESION		{ $1.push($3); $$ = $1; }
		| EXPRESION						{ $$ = []; $$.push($1); }
;

//===================== FUNCIONES NATIVAS =====================
FUNCIONES_NATIVAS: FUNCIONES_NATIVAS punto FUNCION	
									{ $$ = new FuncionNativa.FuncionNativa($1,"",$3,false
													,@1.first_line,@1.first_column); }
				 | identificador punto FUNCION	
				 					{ $$ = new FuncionNativa.FuncionNativa(null,$1,$3,true
													,@1.first_line,@1.first_column); }
;

FUNCION: identificador para parc		{ $$ = new Funcion.Funcion($1,null); }
		| identificador para EXPRESION parc	{ $$ = new Funcion.Funcion($1,$3); }
;