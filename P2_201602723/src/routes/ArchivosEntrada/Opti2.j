var t1,t2;
var Stack[];
var Heap[];
var P = 0;
var H = 0;

t1=2+0;
t2=3+0;
if(t1 < t2) goto L1;
goto L2;
L1:
	if(2==3) goto L5;
	goto L6;
	L5:
		t1=5+0;
	L6:
		t1=3+4;
print("%i" , t1);
#goto L3;
L2:
t2=10*1;
print("%i" , t2);
L3:
