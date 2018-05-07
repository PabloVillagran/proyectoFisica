var scale = 1;
var contenedor = null;

var origen = {
  x: 0,
  y: 0
}
var angulo = 45;
var particula = $("#particula");
var posicionParticula = {
  x: 0,
  y: particula.position().top
}

var velocidad = 1;
var tiempo = 0;
var velocidadParticula = {
  vx: velocidad * Math.cos(angulo * Math.PI / 180),
  vy: - velocidad * Math.sin(angulo * Math.PI / 180)
}

var gravedad = 9.8;

function calcularComponentesV(){
  velocidadParticula = {
    vx: velocidad * Math.cos(angulo),
    vy: - velocidad * Math.sin(angulo)
  }
}

$(document).ready(function(){
  contenedor = $("#contenedor");
  particula = $("#particula");
  origen = {
    x : 0,
    y : particula.position().top
  }
  alert(origen.x + ", " + origen.y);
  alert(velocidadParticula.vx +", "+ velocidadParticula.vy);
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
  //velocidadParticula.vx = velocidad * Math.cos(angulo * Math.PI / 180);
  //velocidadParticula.vy = - velocidad * Math.sin(angulo * Math.PI / 180) ;
  if(posicionParticula.y < origen.y){
    posicionParticula.x = velocidadParticula.vx * tiempo;
    posicionParticula.y = posicionParticula.y + (-velocidadParticula.vy * tiempo) + 0.5*gravedad*(tiempo^2);
    console.log(posicionParticula.x+", " + posicionParticula.y);
  }else{
    posicionParticula.y = 0;
  }
}

var seconds = 0;
var el = document.getElementById('seconds-counter');

function incrementSeconds() {
    seconds += 1;
    update(seconds);
    draw();
}

var cancel = setInterval(incrementSeconds, 500);

function draw() {

}
