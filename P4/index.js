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

  color.onclick = () => {
    ctx.drawImage(img, 0,0);

    deslizador_Rojo.value = 255;
    range_value_Rojo.innerHTML = deslizador_Rojo.value;

    deslizador_Verde.value = 255;
    range_value_Verde.innerHTML = deslizador_Verde.value;

    deslizador_Azul.value = 255;
    range_value_Azul.innerHTML = deslizador_Azul.value;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}


//-- Funcion de retrollamada del deslizador
colores.onclick = () =>{
    deslizador_Rojo.oninput = () => {
        color();
    }
    deslizador_Verde.oninput = () => {
        color();
    }
    deslizador_Azul.oninput = () => {
        color();
    }
}

original.onclick = () =>{
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0,0);
}

console.log("Fin...");