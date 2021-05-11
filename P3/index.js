console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 500;
canvas.height = 700;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//--Estados
const Estado = {
    Init: 0,
    Start: 1,
    play: 2,

}
//-- Posición del elemento a animar
let x_bola = 0;
let y_bola = 600;
let x_pala = 100;
let y_pala = 620;


//--Dibujar ladrillos
let X_ladrillo = 10;
let Y_ladrillo = 10;

const LADRILLO = {
    Fila: 5,
    Columna: 9,
    W: 40, 
    H: 20, 
    Padding: 15, 
    Visible: true 
}
const ladrillos = [];

// ladrillos
for(let i = 0; i < LADRILLO.Fila; i++){
    ladrillos[i] = []; // inicializa filas
    for(let j = 0; j < LADRILLO.Columna; j++){
        ladrillos[i][j] = {
            x: X_ladrillo + (LADRILLO.W + LADRILLO.Padding) * j,
            y: Y_ladrillo + (LADRILLO.H + LADRILLO.Padding) * i,
            W: LADRILLO.W,
            H: LADRILLO.H,
            Padding: LADRILLO.Padding,
            Visible: LADRILLO.Visible
        };
    }
}

//-- Movimiento pala
var move = window.event;

//-- Velocidad horizontal del objeto
let velx = 3;
let vely = 3;

//--Funcion bola
function bola(){
    ctx.beginPath();
    ctx.arc(x_bola, y_bola, 5, 0, 2 * Math.PI);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();
}

//--Funcion pala
function pala(){
    ctx.beginPath();
    ctx.rect(x_pala, y_pala, 80, 20);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();
}

//-- Funcion principal de animacion
function update() 
{
  console.log("test");


  //-- Algoritmo de animacion:
  //-- 1) Actualizar posiciones de los elementos
  //-- (física del movimiento rectilineo uniforme)
  //-- Comprobar colisión con borde derecho
  
   //-- Condicion de rebote en extremos del canvas
   if (x_bola < 0 || x_bola >= (canvas.width) ) {
    velx = -velx;
  }
  //if (y_bola < 0 || y_bola >= (canvas.width - 20) ) {
    //vely = -vely;
  //}
  // Actualizar la posición
  x_bola = x_bola + velx;
  //y_bola = y_bola + vely;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 // dibujamos los ladrillos
    for(let i = 0; i < LADRILLO.Fila; i++){
        for(let j = 0; j < LADRILLO.Columna; j++){
            // si es viisble, se pinta
            if(ladrillos[i][j].Visible){
                ctx.beginPath();
                ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.W, LADRILLO.H);
                ctx.fillStyle ='yellow';
                ctx.fill();
                ctx.closePath;
            }
        }
    }
  //-- 3) Dibujar los elementos visibles
  //---BOLA
  bola();
  
  //--PALA
  pala();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);

  //--Movimiento de la pala
  window.onkeydown = (e) => {
      console.log();
      
      switch (e.key){
        case "d":
            if(x_pala<=canvas.width-100){
                 x_pala = x_pala + 25;}
             break;
        case "a":
            if(x_pala>0){
                x_pala = x_pala-25;}
            break;
      }
    }
}

//-- ¡Que empiece la función!
update();