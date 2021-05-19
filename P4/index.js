console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

const gris = document.getElementById('gris');
const origen = document.getElementById('origen');
const colores = document.getElementById('colores');
const vuelta = document.getElementById('vuelta');
const ruido = document.getElementById('ruido');


const img_1 = document.getElementById('img_1');
const img_2 = document.getElementById('img_2');
const img_3 = document.getElementById('img_3');

//-- Acceso al deslizador
const deslizador_Rojo = document.getElementById('deslizador_Rojo');
const deslizador_Verde = document.getElementById('deslizador_Verde');
const deslizador_Azul = document.getElementById('deslizador_Azul');

//-- Valor del deslizador
const range_value_Rojo = document.getElementById('range_value_Rojo');
const range_value_Verde = document.getElementById('range_value_Verde');
const range_value_Azul = document.getElementById('range_value_Azul');

//-- Función de retrollamada de imagen cargada
img.onload = function () {
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  ctx.drawImage(img, 0,0);
  console.log("Imagen lista...");
};


function color(){
  ctx.drawImage(img, 0,0);
  
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  //-- Mostrar el nuevo valor del deslizador
  range_value_Rojo.innerHTML = deslizador_Rojo.value;
  range_value_Verde.innerHTML = deslizador_Verde.value;
  range_value_Azul.innerHTML = deslizador_Azul.value;

  //-- Obtener el umbral de rojo del desliador
  var umbral_Rojo = deslizador_Rojo.value;
  var umbral_Verde = deslizador_Verde.value;
  var umbral_Azul = deslizador_Azul.value;

  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_Rojo){
      data[i] = umbral_Rojo;
    }
    if (data[i+1] > umbral_Verde){
      data[i+1] = umbral_Verde;
    }
      if (data[i+2] > umbral_Azul){
      data[i+2] = umbral_Azul;
      }
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}


//-- Funcion de retrollamada del deslizador
    deslizador_Rojo.oninput = () => {
        color();
    }
    deslizador_Verde.oninput = () => {
        color();
    }
    deslizador_Azul.oninput = () => {
        color();
    }


function operativo(){
    deslizador_Rojo.disabled = false;
    deslizador_Verde.disabled = false;
    deslizador_Azul.disabled = false;
}


function apagado(){
    deslizador_Rojo.disabled = true;
    deslizador_Verde.disabled = true;
    deslizador_Azul.disabled = true;
}


colores.onclick = () => {
    operativo();
    ctx.drawImage(img, 0,0);
    
    deslizador_Rojo.value = 255;
    range_value_Rojo.innerHTML = deslizador_Rojo.value;
    
    deslizador_Verde.value = 255;
    range_value_Verde.innerHTML = deslizador_Verde.value;
    
    deslizador_Azul.value = 255;
    range_value_Azul.innerHTML = deslizador_Azul.value;
}
    
    
original.onclick = () =>{
    apagado();
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0);
}


gris.onclick = () => {
    apagado();
    ctx.drawImage(img, 0,0);

    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data
    var gris = 0;

    for (var i = 0; i < data.length; i+=4) {
        gris = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
        data[i] = gris;
        data[i+1] = gris;
        data[i+2] = gris;
    }
//-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}


vuelta.onclick = () =>{
    apagado();
    ctx.drawImage(img, 0,0);
    ctx.translate(0,img.height);
    ctx.scale(1,-1);
    ctx.drawImage(img, 0, 0);
  }

  ruido.onclick = () => {
    apagado();
    var ruidos = 0;
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imgData.data;
    for (var i = 0; i < data.length; i+=4) {
        ruidos = Math.floor(Math.random() * (40 + 40 + 1) - 40)
        data[i] += ruidos; 
        data[i+1] += ruidos; 
        data[i+2] += ruidos; 
  }
  ctx.putImageData(imgData, 0, 0);
}

//funcion para las diferentes imagenes
img_1.onclick = () => {
    img.src="img1.jpg";
}

img_2.onclick = () => {
    img.src="img2.jpg";
}
img_3.onclick = () => {
    img.src="img3.jpg";
}

console.log("Fin...");