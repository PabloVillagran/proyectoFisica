/////////////////////////////CONFIGURACIONES///////////////////////////////////////
﻿var speed = 60; //velocidad con la que se muestra la animación
var scale = 0.5; //escala
var contenedor = null; //marco de referencia
var run = false; //indica si la animación esta activa o no
var ORIGEN = {
  x: 0,
  y: 0
}// coordenadas origen constante
////////////////////FIN CONFIGURACIONES////////////////////////////////////////////
///////////////////////////DISPALY/////////////////////////////////////////////////
var particula = null
var displayTiempo = null; //span donde se indica el tiempo transcurrido
var displayGravedad = null;
var displayVelocidad = null;
var displayAngulo = null;
var displayVx = null;
var displayVy = null;
var displayX = null;
var displayY = null;
var displayScale = null;
var displaySpeed = null;
/////////////////////////FIN DE DECLARACIONES DISPLAY////////////////////////////////////////////////

var posicionParticula = { //posicion calculada de la particula según el tiempo
  x: 0,
  y: 0
}
var coordenadasAnimacion = {
  x:0,
  y:0
}
var posicionInicial = {
  x:0,
  y:0
}//posicion inicial de la particula. Se debe poder modificar en formulario.

var velocidad = 50;//magnitud del vector de velocidad
var angulo = 45;//angulo del vector velocidad
var tiempo = 0;//tiempo inicial
var velocidadParticula = calcularComponentesV();

var gravedad = -9.8;//la gravedad inicial es de 9.8. se puede modificar en el formulario

function calcularComponentesV(){
  return {
    vx: redondear(velocidad * Math.cos(angulo * Math.PI / 180)),//componente de velocidad en x
    vy: redondear(velocidad * Math.sin(angulo * Math.PI / 180))//componente de velocidad en y
  }
}

$(document).ready(function(){
  start();
  cambioEscala();
});

function start(){
  contenedor = $("#contenedor");//captura el div contenedor
  particula = $("#particula");//captura el div particula
  displayTiempo = $("#displayTiempo");//captura el span de displayTiempo
  displayGravedad = $("#gravedad");
  displayVelocidad = $("#vectorVelocidad");
  displayAngulo = $("#angulo");
  displayVx = $("#velocidadX");
  displayVy = $("#velocidadY");
  displayX = $("#displayPx");
  displayY = $("#displayPy");
  displayScale = $("#displayEscala");
  displaySpeed = $("#displaySpeed");
  posicionParticula = {
    x: posicionInicial.x,
    y: posicionInicial.y
  };//regresa la particula a su posicion inicial
  coordenadasAnimacion = {
    x: posicionInicial.x,
    y: posicionInicial.y
  };
}

function reset(){//función para reiniciar la animación
  seconds = 0;
  start();
  run = true;
}

function update(tiempo) { //se calcula la siguiente posición de la particula segun el tiempo
  if(velocidadParticula.vy == 0 && angulo == 0){
    gravedad = 0;
  }else{
    gravedad = -9.8;
  }
  {
    console.log(posicionParticula.x+", " + posicionParticula.y);
    posicionParticula.x = redondear(velocidadParticula.vx * tiempo);
    posicionParticula.y = redondear(posicionInicial.y + (velocidadParticula.vy * tiempo) + 0.5*gravedad*(Math.pow(tiempo , 2)));
    coordenadasAnimacion.x = posicionParticula.x / scale;
    coordenadasAnimacion.y = posicionParticula.y / scale;
  }
//  else
  if(posicionParticula.y<ORIGEN.y)
  {
    run = false;
  }
}

function draw() {
  particula.css({
    "bottom" : coordenadasAnimacion.y+"px",
    "left": coordenadasAnimacion.x+"px"
  });// se actualiza en pantalla la posicion de la particula
  displayTiempo.val(seconds);//se actualiza la visualizacion del tiempo
  displayGravedad.val(gravedad);//se actualiza el campo de gravedad
  displayVelocidad.val(velocidad);//se actualiza el input de velocidad
  displayAngulo.val(angulo);//se actualiza el input de angulo
  displayVx.val(velocidadParticula.vx);//se actualiza el input de componente de velocidad en x
  displayVy.val(velocidadParticula.vy);//se actualiza el input componente de velocidad en y
  displayX.val(posicionParticula.x);//se actualiza el input de posicion en x
  displayY.val(posicionParticula.y);//se actualiza el input de posicion en y
  displayScale.val(scale + "m.");//se actualiza el input de escala
  displaySpeed.val(speed);//se actualiza el input de velocidad de animación
}

$("#cambiarEscala").click(cambioEscala);
function cambioEscala(){
  var nuevaEscala = displayScale.val().replace(/[^0-9.,]/g,'');//captura el valor de la escala sin tomar en cuenta las letras.
  if(nuevaEscala==""){
    nuevaEscala = scale; // si el campo de escala esta vacío toma la ultima escala ingresada
  }else{
    scale = parseFloat(nuevaEscala); //transforma el texto en decimal y lo asigna a la escala
  }
  $(".axis.izq").children("li").each(function(){//recorre todos los puntos de referencia para Y. actualiza según la escala
    var id = parseInt(this.id.replace(/\D/g,''));
    this.innerText = 100 * (id+1) * scale;
  });
  $(".axis.inf").children("span").each(function(){//recorre todos los puntos de referencia para X. actualiza según la escala
    var id = parseInt(this.id.replace(/\D/g,''));
    this.innerText = 100 * (id+1) * scale;
  });
  reset();//reinicia la aplicación con la nueva escala.
}

var seconds = 0;
function incrementSeconds() {//logica de animación
  if(run){
    draw();//se dibuja el estado actual
    update(seconds);//se calcula el siguiente frame
    seconds += 0.06;//0.06 = cantidad de "frames" por milisegundo... REVISAR
    seconds = redondear(seconds); //Redondear a 2 decimales
  }else{
    //reset();//reinicia la animación
  }
}
var anim = setInterval(incrementSeconds, speed);//Intervalo para calcular posicion de particula

function redondear(x){//funcion para redondear a 2 decimales
  return Math.round(x*100)/100;
}
