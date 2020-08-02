integer fibonacci(integer no ){
    if (no == 0){
	    return  0 ;
    } else if (no == 1){
        return 1;
    }else{
        return (fibonacci(no-1) + fibonacci(no-2));
    }
}

fibonacci(3);

Stack[P]= 3;
t21= P+1;
Stack[t21]= 0;
	Call fibonacci;
#======== RETORNO ========;
t23= Stack[t21];