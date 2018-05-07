var scale = 1;
var contenedor = null;

var angulo = 90;
var particula = $("#particula");
var posicionParticula = {
  x: 0,
  y: particula.position().top
}
var velocidad = 0.02;
var tiempo = 0;
var velocidadParticula = {
  vx: velocidad * Math.cos(angulo),
  vy: - velocidad * Math.sin(angulo)
}

var gravedad = 9.8;

$(document).ready(function(){
  contenedor = $("#contenedor");
  particula = $("#particula");
  //populateGrid();
});

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
  tiempo += progress;
  velocidadParticula.vx = velocidad * Math.cos(angulo * Math.PI / 180);
  velocidadParticula.vy = - velocidad * Math.sin(angulo * Math.PI / 180) ;
  posicionParticula.x = velocidadParticula.vx * tiempo;
  posicionParticula.y = velocidadParticula.vy * tiempo;
  console.log(posicionParticula.x+", " + posicionParticula.y);
}

function draw() {
  particula.offset({top: posicionParticula.y, left: posicionParticula.x});
}

function loop(timestamp) {
  var progress = timestamp - lastRender;

  update(progress);
  draw();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);
