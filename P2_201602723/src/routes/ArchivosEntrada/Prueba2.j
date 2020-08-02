integer funcion(integer num){
  print(num);
  if(num == 1){
  	return 1;
  }
  else{
  	return funcion(num-1);
  }
}

funcion(2);


