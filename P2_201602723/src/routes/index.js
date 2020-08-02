//const axios = require('axios');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
//const Methods = require('./Methods');

const Gramatica = require('../Analizador/Gramatica');
const Gramatica3D = require('../Analizador/Gramatica3D');
const Informacion = require('../Datos/Informacion');
const Entorno = require('../Datos/Entorno/Entorno');
const nodoCodigo = require('../Arbol/nodoCodigo');

// VARIABLE PARA GUARDAR LA RUTA
let ruta = "";
let e = new Entorno.Entorno("global",null,0);

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

  // =========================== ESTE METODO SOLO ES DE PRUEBA  ==========================
  router.get('/prueba/:codigo/:id',(req, res)=>{
      // TEXTO PLANO
        //res.send('CODIGO: '+ req.params.codigo +'\n ID: '+req.params.id);

        // ENVIAR JSON
        const cadena = {codigo: req.params.codigo , id: req.params.id};
        const cadenaJson = JSON.stringify([cadena],null,1);

        res.setHeader('Content-Type', 'application/json');
        res.end(cadenaJson)
  });

  // =========================== API PARA ABRIR UN ARCHIVO  ==========================
  router.get('/Abrir/:nombre',(req, res)=>{
        const nombre = req.params.nombre; router.set
        ruta = path.join(__dirname,'/ArchivosEntrada/'+nombre);
        let archivo = "";
        try{
         const codigo = fs.readFileSync(ruta,'utf-8');
         archivo = [{"codigo":codigo}];
        }catch(err){
            archivo = [{"codigo":"Error! para abrir el archivo \""+nombre+"\""}];
        }
        //console.log(archivo);
        const json = JSON.stringify(archivo,null,1);
        res.setHeader('Content-Type', 'application/json');
        res.end(json)
  });

  //========================= API GUARDAR EL ARCHIVO =====================
router.get('/Save/:codigo', (req, res) =>{

    let codigo = CodificarRuta(req.params.codigo);
    fs.writeFileSync(ruta,codigo,err=>{
        if(err){ console.log(err); return; }
    });
    const json = JSON.stringify([{}],null,1);
        res.setHeader('Content-Type', 'application/json');
        res.end(json)
});

//========================= API GUARDAR COMO EL ARCHIVO =====================
router.get('/SaveAs/:nombre/:codigo', (req, res) =>{

    let nombre = req.params.nombre;
    let codigo = CodificarRuta(req.params.codigo);

    ruta = path.join(__dirname,'/ArchivosEntrada/'+nombre);

    fs.writeFileSync(ruta,codigo,err=>{
        if(err){ console.log(err); return; }
    });
    const json = JSON.stringify([{}],null,1);
        res.setHeader('Content-Type', 'application/json');
        res.end(json)
});

  //========================= API PARA COMPILAR EL CODIGO =====================
  router.get('/Compilar/:codigoAlto', (req, res)=>{
      // LLAMO EL METODO PARA CREAR LIMPIAR DATOS
      Informacion.Informacion.Clear_Data();

      let parserCodigo = req.params.codigoAlto;
      
      // CODIFICO LA RUTA
      parserCodigo = CodificarRuta(parserCodigo);
      console.log(parserCodigo);

      e = new Entorno.Entorno("global",null,0);
      let codigo3D = [];
      // EJECUTO EL CODIGO
        Informacion.Informacion.raiz = Gramatica.parse(parserCodigo); 

        // EJECUTO RAIZ, EN TEORIA SOLO PARA IMPORTS
        codigo3D = Informacion.Informacion.raiz.Ejecutar(e);
        
        // ANTES DE EJECUTAR RAIZ METO LOS METODOS
        Informacion.Informacion.AddMetodosEntorno(e);

        // AGREGO EL PRINCIPAL Y CODIGO METODOS
        codigo3D = Informacion.Informacion.AgregarPrincipal(codigo3D,e);


        const respuesta = {codigo3D, consola: JSON.stringify(Informacion.Informacion.Mensaje_Consola)};
        //console.log(respuesta)
        const cadenaJson = JSON.stringify([respuesta],null,1);
        //console.log(cadenaJson);
        
        res.setHeader('Content-Type', 'application/json');
        res.end(cadenaJson)
  });

  //========================= API PARA COMPILAR EL CODIGO3D =====================
  router.get('/Optimizar/:codigoAlto', (req, res)=>{
    // LLAMO EL METODO PARA CREAR LIMPIAR DATOS
    Informacion.Informacion.Clear_Data();

    let parserCodigo = req.params.codigoAlto;
    
    // CODIFICO LA RUTA
    parserCodigo = CodificarRuta(parserCodigo);
    console.log(parserCodigo);

    e = new Entorno.Entorno("global",null,0);
    let codigo3D = [];
    // EJECUTO EL CODIGO
      Informacion.Informacion.raiz = Gramatica3D.parse(parserCodigo); 
      codigo3D = Informacion.Informacion.raiz.Ejecutar(e);
      

      const respuesta = {codigo3D, consola: JSON.stringify(Informacion.Informacion.Mensaje_Consola)};
      const cadenaJson = JSON.stringify([respuesta],null,1);

      res.setHeader('Content-Type', 'application/json');
      res.end(cadenaJson)
});

  //========================= API PARA RETORNAR JSON DEL ARBOL =====================
router.get('/GraficarArbol', (req, res)=>{
    let json = [{"name":"No hay arbol","parent":"null","children":[]}];

    if(Informacion.Informacion.raiz != null){
        const arreglo = [Informacion.Informacion.raiz.Graficar()];
        json = JSON.stringify(arreglo,null,1);
    }else{
        json = JSON.stringify(json,null,1);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(json)
});

  //========================= API PARA RETORNAR LA TABLA DE SIMBOLOS =====================
  router.get('/TablaSimbolos', (req,res)=>{
       let json = e.DevolverJSON();
       //json = JSON.stringify(json,null,1);
       //console.log(json);
       res.setHeader('Content-Type', 'application/json');
       res.end(json)
  });

  //========================= API PARA RETORNAR LA TABLA DE ERRORES =====================
  router.get('/TablaErrores', (req,res)=>{

    let json= JSON.stringify(Informacion.Informacion.lista_errores);
    //json = JSON.stringify(json,null,1);
    //console.log(json);
    res.setHeader('Content-Type', 'application/json');
    res.end(json)
});

  //========================= API PARA RETORNAR BITACORA DE OPTIMIZACION =====================
  router.get('/BitacoraOptimizacion', (req,res)=>{
    let json= JSON.stringify(Informacion.Informacion.bitacotaOptimizacion);
    //json = JSON.stringify(json,null,1);
    //console.log(json);
    res.setHeader('Content-Type', 'application/json');
    res.end(json)
});

// ============================ METODOS AUXILIARES ============================
function CodificarRuta(codigo){
    codigo = codigo.split('°$$¬°').join('/')
    codigo = codigo.split('¬°$¬¬').join('%')
    codigo = codigo.split('$$¬¬°').join('\n')
    codigo = codigo.split('¬$°°¬').join('\\n');
    codigo = codigo.split('°°°$¬¬¬¬').join('\\\\');
    codigo = codigo.split('°°$$¬¬').join('\\t');
    codigo = codigo.split('°¬$$°').join('\\r');
    codigo = codigo.split('°°¬¬||$$').join('\\\"');

    return codigo;
}

module.exports = router;