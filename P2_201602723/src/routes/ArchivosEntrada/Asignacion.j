const dato1 := 34;
Integer var1, var2, var3 = 50;
global datoGlobal := 'e';
String mensaje = "hola";

for(integer cont=0; cont<10 ;cont++){
	switch(cont){
       case 2:
         print(datoGlobal)
         datoGlobal = 'h';
       case 3:
         print(datoGlobal)
       case 4:
         print("\n"+mensaje)
         mensaje = "adios"
       case 5:
         print("\n"+mensaje)
     }
  
  	if(cont >7){
       var2 = var2 + cont;
     }
}

print("\n");
print(var1);
print("\n");
print(var2);
print("\n");
print(var3);

