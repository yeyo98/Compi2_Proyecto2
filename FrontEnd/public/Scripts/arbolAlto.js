/* var treeData = [
    {
      "name": "Top Level",
      "parent": "null",
      "children": [
        {
          "name": "Level 2: A",
          "parent": "Top Level",
          "children": [
            {
              "name": "Son of A",
              "parent": "Level 2: A"
            },
            {
              "name": "Daughter of A",
              "parent": "Level 2: A"
            }
          ]
        },
        {
          "name": "Level 2: B",
          "parent": "Top Level"
        }
      ]
    }
  ]; */

var treeData = [{"name":"Instrucciones","parent":"null","children":[{"name":"+","parent":"Instrucciones","children":[{"name":"12","parent":"+","children":[]},{"name":"9","parent":"+","children":[]}]},{"name":"+","parent":"Instrucciones","children":[{"name":"72","parent":"+","children":[]},{"name":"35","parent":"+","children":[]}]},{"name":"+","parent":"Instrucciones","children":[{"name":"12","parent":"+","children":[]},{"name":"303","parent":"+","children":[]}]},{"name":"+","parent":"Instrucciones","children":[{"name":"26","parent":"+","children":[]},{"name":"+","parent":"+","children":[{"name":"3","parent":"+","children":[]},{"name":"3","parent":"+","children":[]}]}]},{"name":"+","parent":"Instrucciones","children":[{"name":"+","parent":"+","children":[{"name":"2463","parent":"+","children":[]},{"name":"3","parent":"+","children":[]}]},{"name":"+","parent":"+","children":[{"name":"3","parent":"+","children":[]},{"name":"5","parent":"+","children":[]}]}]},{"name":"+","parent":"Instrucciones","children":[{"name":"2","parent":"+","children":[]},{"name":"3","parent":"+","children":[]}]},{"name":"+","parent":"Instrucciones","children":[{"name":"2","parent":"+","children":[]},{"name":"3","parent":"+","children":[]}]},{"name":"+","parent":"Instrucciones","children":[{"name":"2","parent":"+","children":[]},{"name":"3","parent":"+","children":[]}]}]}]

var flag = true;
// =================================== LLAMO A LA API PARA OBTENER EL ARBOL ============================
    const url = 'http://localhost:3000/GraficarArbol';
    const req = new XMLHttpRequest();
    req.open('GET',url);
    req.send();

    req.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // TEXTO NORMAL
            treeData = JSON.parse(req.responseText);
            
            //console.log(resultado);
            console.log(treeData)

            root = treeData[0];
    
            update(root);
        }
    }



  // ************** Generate the tree diagram	 *****************
  var margin = {top: 40, right: 120, bottom: 20, left: 120},
      width = 1460 - margin.right - margin.left,
      height = 1000 - margin.top - margin.bottom;
      
  var i = 0;
  
  var tree = d3.layout.tree()
      .size([height, width]);
  
  var diagonal = d3.svg.diagonal()
      .projection(function(d) { return [d.x, d.y]; });
  
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  //root = treeData[0];
    
  //update(root);
  
  function update(source) {
  
    // Compute the new tree layout.
    var nodes = tree.nodes(root).reverse(),
        links = tree.links(nodes);
  
    // Normalize for fixed-depth.
    nodes.forEach(function(d) { d.y = d.depth * 100; });
  
    // Declare the nodes…
    var node = svg.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });
  
    // Enter the nodes.
    var nodeEnter = node.enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")"; });
  
    nodeEnter.append("circle")
        .attr("r", 10)
        .style("fill", "#fff");
  
    nodeEnter.append("text")
        .attr("y", function(d) { 
            return d.children || d._children ? -18 : 18; })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1);
  
    // Declare the links…
    var link = svg.selectAll("path.link")
        .data(links, function(d) { return d.target.id; });
  
    // Enter the links.
    link.enter().insert("path", "g")
        .attr("class", "link")
        .attr("d", diagonal);
  
  }