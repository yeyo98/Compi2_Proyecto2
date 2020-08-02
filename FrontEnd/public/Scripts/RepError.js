function Reporte_TablaError(tableID){

    let tabla;

    const url = 'http://localhost:3000/TablaErrores';
    const req = new XMLHttpRequest();
    req.open('GET',url);
    req.send();

    
    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            tabla = JSON.parse(req.responseText);

            let cont = 0;
            
            //console.log(tabla)
            //console.log(tabla[0])

            for(let fila of tabla){
                LLenarTabla(tableID,cont++,fila);
            }

        }
    }
}

function LLenarTabla(tableID,cont,json){
    var tableRef = document.getElementById(tableID);
    var newRow;
    var newCell;
    var newText;
    //=================  AQUI PARA ABAJO DEBE IR EL CIBLO =================  
    // Inserta una fila en la tabla, en el índice 0
    newRow  = tableRef.insertRow(cont);

    // INSERTO EL NOMBRE
    newCell  = newRow.insertCell(0);
    newText  = document.createTextNode(json.lexema);
    newCell.appendChild(newText);
    
    // INSERTO EL TIPO
    newCell  = newRow.insertCell(1);
    newText  = document.createTextNode(json.tipo);
    newCell.appendChild(newText);

    // INSERTO EL AMBITO
    newCell  = newRow.insertCell(2);
    newText  = document.createTextNode(json.line);
    newCell.appendChild(newText);

    // INSERTO EL AMBITO
    newCell  = newRow.insertCell(3);
    newText  = document.createTextNode(json.columna);
    newCell.appendChild(newText);
}