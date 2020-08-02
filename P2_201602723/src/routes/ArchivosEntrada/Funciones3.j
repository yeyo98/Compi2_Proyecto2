void principal(){
 	
  	global msg := "hola";
  
  	integer cont = 5;
  	Cambio(cont);
  	SaltoLinea()
  	print(msg)
  	SaltoLinea()
  	Imprimir();
}

void Cambio(integer cadena){
  	
  	while(cadena < 10){
      	print(cadena)
       	print("\n")
       	cadena++;
     }
  msg = "perro"
  print(msg)
}

void Imprimir(){
  print(msg)
}

void SaltoLinea(){
 	print("\n"); 
}