double num = 98.38;
double aux = num;
integer var1 = 0;

// VERIFICO CUANTOS DECIMALES TIENE
while( aux >= 1 ){
  	aux = aux / 10
  	var1++;
}
const ite = 10^^var1
aux = (aux*ite) % ite
num = num - (aux/ite)
print(num)