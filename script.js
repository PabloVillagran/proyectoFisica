var scale = 1;
var contenedor = null;
var run = false;

var origen = {
  x: 0,
  y: 0
}
var angulo = 50;
var particula = $("#particula");
var posicionParticula = {
  x: 0,
  y: 0
}

var velocidad = 75;
var tiempo = 0;
var velocidadParticula = {
  vx: velocidad * Math.cos(angulo * Math.PI / 180),
  vy: velocidad * Math.sin(angulo * Math.PI / 180)
}

var gravedad = -9.8;

function calcularComponentesV(){
  velocidadParticula = {
    vx: velocidad * Math.cos(angulo),
    vy: - velocidad * Math.sin(angulo)
  }
}

$(document).ready(start());

function start(){
  contenedor = $("#contenedor");
  particula = $("#particula");
  origen = {
    x : 0,
    y : 0
  }
  posicionParticula = {
    x: 0,
    y: 0
  }
  //alert(origen.x + ", " + origen.y);
  alert("componentes de velocidad : " + velocidadParticula.vx +", "+ velocidadParticula.vy);
  run = true;
  //populateGrid();
}

function populateGrid(){
  var width = contenedor.width();
  var height = contenedor.height();
  var wCols = Math.floor(width/(12*scale)); //numero de columnas que caben en el contenedor
  var wRows = Math.floor(height/(12*scale)); //numero de filas que caben en el contenedor
  var html = ""; //variable donde se alojan los divs para crear la cuadricula

  for(i = 0; i<wCols*wRows; i++){//generar un div por cada posible sector
    html += "<div class='sector-grid'/>";
  }
  contenedor.html(contenedor.html() + html);
}

function update(progress) {
  tiempo = progress;
  //velocidadParticula.vx = velocidad * Math.cos(angulo * Math.PI / 180);
  //velocidadParticula.vy = - velocidad * Math.sin(angulo * Math.PI / 180) ;
  //if(posicionParticula.y < origen.y)
  {
    console.log(posicionParticula.x+", " + posicionParticula.y);
    posicionParticula.x = velocidadParticula.vx * tiempo;
    posicionParticula.y = origen.y + (velocidadParticula.vy * tiempo) + 0.5*gravedad*(Math.pow(tiempo , 2));
  }
  //else
  {
  //  posicionParticula.y = origen.y;
  }
}

function draw() {
  //alert(posicionParticula.x + "," + posicionParticula.y);
  particula.css({
    "bottom" : posicionParticula.y+"px",
    "left": posicionParticula.x+"px"
  });
}

var seconds = 0;
function incrementSeconds() {
  if(run){
    update(seconds);
    draw();
    seconds += 0.06;
  }else{
    seconds = 0;
  }
}

var cancel = setInterval(incrementSeconds, 1);
