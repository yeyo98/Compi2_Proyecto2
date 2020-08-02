const express = require('express');
const app = express();
const path = require('path');

app.set('port','8080');

app.use(express.static(__dirname + '/public/'));

app.get('/',(req ,res)=> {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/arbolAlto',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public/arbolAlto.html'));
})

app.get('/TablaSimbolos',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public/Tabla_Simbolos.html'));
})

app.get('/TablaError',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public/Tabla_Errores.html'));
})

app.get('/Bitacora',(req, res)=>{
  res.sendFile(path.join(__dirname, 'public/Bitacora_Optimizacion.html'));
})

app.get('/Prueba',(req, res)=>{
  res.sendFile(path.join(__dirname, 'public/Prueba.html'));
})

app.listen(app.get('port'), function() {
  console.log('Servidor web escuchando en el puerto ' +app.get('port'));
});