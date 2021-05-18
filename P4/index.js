console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const deslizador_Rojo = document.getElementById('deslizador_Rojo');
const deslizador_Verde = document.getElementById('deslizador_Verde');
const deslizador_Azul = document.getElementById('deslizador_Azul');

//-- Valor del deslizador
const range_value_Rojo = document.getElementById('range_value_Rojo');
const range_value_Verde = document.getElementById('range_value_Verde');
const range_value_Azul = document.getElementById('range_value_Azul');

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista...");
};

function color(){
//-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //-- Obtener el array con todos los píxeles
  let data = imgData.data
  //-- Mostrar el nuevo valor del deslizador
  range_value_Rojo.innerHTML = deslizador_Rojo.value;
  //-- Obtener el umbral de rojo del desliador
  umbral_Rojo = deslizador_Rojo.value
  //-- Filtrar la imagen según el nuevo umbral
  for (let i = 0; i < data.length; i+=4) {
    if (data[i] > umbral_Rojo)
      data[i] = umbral_Rojo;
  }
  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}


//-- Funcion de retrollamada del deslizador
deslizador_Rojo.oninput = () => {
  
  color();
  
}

console.log("Fin...");