const express = require('express');
const app = express();
const path = require('path');

// STATIC FILES
//app.use(express.static(__dirname + '/public/'));

// ROUTERS
app.use( require('./routes/index') );

app.listen('3000', function() {
  console.log('Servidor web escuchando en el puerto 3000');
});