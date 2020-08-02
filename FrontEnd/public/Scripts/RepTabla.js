function Reporte_TablaSimbolo(tableID){

    let tabla;

    const url = 'http://localhost:3000/TablaSimbolos';
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
    newText  = document.createTextNode(json.nombre);
    newCell.appendChild(newText);
    
    // INSERTO EL TIPO
    newCell  = newRow.insertCell(1);
    newText  = document.createTextNode(json.Tipo);
    newCell.appendChild(newText);

    // INSERTO EL AMBITO
    newCell  = newRow.insertCell(2);
    newText  = document.createTextNode(json.Ambito);
    newCell.appendChild(newText);

    // INSERTO EL AMBITO
    newCell  = newRow.insertCell(3);
    newText  = document.createTextNode(json.Rol);
    newCell.appendChild(newText);

    // INSERTO EL AMBITO
    newCell  = newRow.insertCell(4);
    newText  = document.createTextNode(json.Posicion);
    newCell.appendChild(newText);

    // INSERTO EL AMBITO
    newCell  = newRow.insertCell(5);
    newText  = document.createTextNode(json.Tamanio);
    newCell.appendChild(newText);
}