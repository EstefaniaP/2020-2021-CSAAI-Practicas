console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del canvas
canvas.width = 500;
canvas.height = 700;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Posición del elemento a animar
let x_bola = 0;
let y_bola = 600;
let x_pala = 100;
let y_pala = 620;

//--Dibujar ladrillos
let X_inicio = 18;
let Y_inicio = 18;

const LADRILLO = {
    FILA: 5,
    COLUMNA: 9,
    W: 40, 
    H: 20, 
    PADDING: 15, 
    VISIBLE: true 
}
const ladrillos = [];

// ladrillos
for(let i = 0; i < LADRILLO.FILA; i++){
    ladrillos[i] = []; // inicializa filas
    for(let j = 0; j < LADRILLO.COLUMNA; j++){
        ladrillos[i][j] = {
            x: X_inicio + (LADRILLO.W + LADRILLO.PADDING) * j,
            y: Y_inicio + (LADRILLO.H + LADRILLO.PADDING) * i,
            W: LADRILLO.W,
            H: LADRILLO.H,
            PADDING: LADRILLO.PADDING,
            VISIBLE: LADRILLO.VISIBLE
        };
    }
}


//-- Velocidad horizontal del objeto
let velx = 3;

//-- Funcion principal de animacion
function update() 
{
  console.log("test");
  //-- Algoritmo de animacion:
  //-- 1) Actualizar posiciones de los elementos
  //-- (física del movimiento rectilineo uniforme)
  //-- Comprobar colisión con borde derecho
  
   //-- Condicion de rebote en extremos del canvas
   if (x_bola < 0 || x_bola >= (canvas.width - 20) ) {
    velx = -velx;
  }
  
  // Actualizar la posición
  x_bola = x_bola + velx;

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 // dibujamos los ladrillos
    for(let i = 0; i < LADRILLO.FILA; i++){
        for(let j = 0; j < LADRILLO.COLUMNA; j++){
            // si es viisble, se pinta
            if(ladrillos[i][j].VISIBLE){
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
  ctx.beginPath();
    ctx.arc(x_bola, y_bola, 5, 0, 2 * Math.PI);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();
  
  //--PALA
  ctx.beginPath();
    ctx.rect(x_pala, y_pala, 80, 20);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();