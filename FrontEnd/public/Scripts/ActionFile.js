// ========================== METODO PARA ABRIR EL ARCHIVO ==========================
function Cargar(){
    let fileNameToSaveAs = prompt("Ingrese el nombre del archivo, ej:(entrada1):", "");
    if (fileNameToSaveAs == null) {
        return;
    }

    const req = new XMLHttpRequest();
    const url = 'http://localhost:3000/Abrir/'+fileNameToSaveAs;
    req.open('GET',url);
    req.send();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            const resultado = JSON.parse(req.responseText);
            
            //console.log(resultado[0].codigo);
            editorText.setValue(resultado[0].codigo);
            
        }
    }
}

/* function Cargar(){
    var file = document.getElementById('fileInput').files[0];
    console.log(file);
    if (file) {
        var fileReader = new FileReader();
        fileReader.onload = function (fileLoadedEvent) {
            var textFromFileLoaded = fileLoadedEvent.target.result;
            editorText.setValue(textFromFileLoaded)
        };
        fileReader.readAsText(file, "UTF-8");
    } else {
        //alert('No se pudo abrir el archivo');
    }
} */


// ========================== METODO PARA GUARDAR EL ARCHIVO ==========================
function Guardar(){
    const req = new XMLHttpRequest();
    let codigoAlto = CodificaCodigo(editorText.getValue());

    codigoAlto = encodeURIComponent(codigoAlto)
    console.log(codigoAlto);
    const url = 'http://localhost:3000/Save/'+codigoAlto;
    req.open('GET',url);
    req.send();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            const resultado = JSON.parse(req.responseText);
            console.log(resultado);
        }
    }
}

// ========================== METODO PARA GUARDAR COMO EL ARCHIVO ==========================
function SaveDocument() {
    let fileNameToSaveAs = prompt("Ingrese el nombre para el archivo:", "");
    if (fileNameToSaveAs == null) {
        return;
    }
    
    const req = new XMLHttpRequest();
    let codigoAlto = CodificaCodigo(editorText.getValue());

    codigoAlto = encodeURIComponent(codigoAlto)
    console.log(codigoAlto);
    const url = 'http://localhost:3000/SaveAs/'+fileNameToSaveAs+'/'+codigoAlto;
    req.open('GET',url);
    req.send();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            const resultado = JSON.parse(req.responseText);
            console.log(resultado);
        }
    }
}

// ========================== METODO PARA COMPILAR EL PROGRAMA ==========================
function Compilar(){
    // LIMPIO LA CONSOLA
    consoleText.setValue("");

    const req = new XMLHttpRequest();
    let codigoAlto = CodificaCodigo(editorText.getValue());

    codigoAlto = codigoAlto.toLowerCase();

    codigoAlto = encodeURIComponent(codigoAlto)
    console.log(codigoAlto);
    const url = 'http://localhost:3000/Compilar/'+codigoAlto;
    req.open('GET',url);
    req.send();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            const resultado = JSON.parse(req.responseText);
            
            console.log(resultado);

            // COMIENZO A IMPRIMIR LOS MENSAJES EN CONSOLA
            Imprimir_Consola(resultado[0].consola);

            // AHORA CREO EL CODIGO 3D
            //console.log( resultado[0].codigo3D )
            let temporales = "var " + resultado[0].codigo3D.listaTemporal.join(',')+';\n';
            let StackHeap = "var Stack[];\nvar Heap[];\nvar P = 0;\nvar H = 0;\n\n";
            let codigo = resultado[0].codigo3D.linea_Codigo.join(';\n');
            codigo += ';\n';
            
            codigo = codigo.split('::;').join('');
            codigo = codigo.split(':;').join(':');

            const codigoFinal = temporales + StackHeap + codigo;
            
            //console.log(codigoFinal);
            consoleText.setValue( consoleText.getValue()+ codigoFinal);
        }
    }
    
}
// ========================== METODO PARA COMPILAR EL PROGRAMA ==========================
function Optimizar(){
    // LIMPIO LA CONSOLA
    consoleText.setValue("");

    const req = new XMLHttpRequest();
    let codigoAlto = CodificaCodigo(editorText.getValue());

    codigoAlto = codigoAlto.toLowerCase();

    codigoAlto = encodeURIComponent(codigoAlto)
    console.log(codigoAlto);
    const url = 'http://localhost:3000/Optimizar/'+codigoAlto;
    req.open('GET',url);
    req.send();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            const resultado = JSON.parse(req.responseText);
            
            console.log(resultado);

            // COMIENZO A IMPRIMIR LOS MENSAJES EN CONSOLA
            Imprimir_Consola(resultado[0].consola);

            // AHORA CREO EL CODIGO 3D
            let temporales = "var " + resultado[0].codigo3D.listaTemporal.join(',')+';\n';
            let StackHeap = "var Stack[];\nvar Heap[];\nvar P = 0;\nvar H = 0;\n\n";
            let codigo = resultado[0].codigo3D.linea_Codigo.join(';\n');
            codigo += ';\n';
            
            codigo = codigo.split('::;').join('');
            codigo = codigo.split(':;').join(':');
            
            const codigoFinal = temporales + StackHeap + codigo;
            
            consoleText.setValue( consoleText.getValue()+ codigoFinal);
        }
    }
}

// ========================== METODO PARA IMPRIMIR EN LA CONSOLA ==========================
function Imprimir_Consola(consola){
    consola = JSON.parse(consola);
    let textoConcatenado =[];
    for(let i=0; i<consola.length ;i++)
        textoConcatenado.push(consola[i].descripcion);
    
    if(textoConcatenado != [])
        consoleText.setValue(textoConcatenado.join('\n')+'\n');
}


function CodificaCodigo(codigo){
    
    codigo = codigo.split('\\n').join('¬$°°¬');
    codigo = codigo.split('\\\\').join('°°°$¬¬¬¬');
    codigo = codigo.split('\\t').join('°°$$¬¬');
    codigo = codigo.split('\\r').join('°¬$$°');
    codigo = codigo.split('\\\"').join('°°¬¬||$$');
    codigo = codigo.split('/').join('°$$¬°');
    codigo = codigo.split('\n').join('$$¬¬°');
    codigo = codigo.split('%').join('¬°$¬¬'); 
    return codigo;
}


function ClearEditor(){
    editorText.setValue("");
}

function ClearConsola(){
    consoleText.setValue("");
}


/*function Pruebas(){
    let aux = new Perro(true);
    aux.Imprimir_Mensaje();

    const req = new XMLHttpRequest();
    const url = 'http://localhost:3000/prueba/woof es bueno/y poderoso';
    req.open('GET',url);
    req.send();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            const res = JSON.parse(req.responseText);
            for(var i=0; i<res.length ;i++){
                console.log(res[i].codigo);
                console.log(res[i].id);
            } 
        }
    }
}*/


/*
function SaveDocument() {
    let textToWrite = editorText.getValue();
    let textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' });

    let fileNameToSaveAs = prompt("Ingrese el nombre para el archivo:", "");
    if (fileNameToSaveAs == null) {
        return;
    }
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs+".j";
    downloadLink.innerHTML = "Descargar Archivo";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}
*/