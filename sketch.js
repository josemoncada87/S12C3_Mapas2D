// ¿Cómo definir un arreglo?
let arregloA = [];
let arregloB = new Array(10);

let arregloMapa = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
// Como construimos nuestro mapa
let mapa = []; // 1 - [ .... ]

let coinX;
let coinY;
let coinCol;
let coinFil;
let coinTrapped;

let xPos; // pixeles
let yPos; // pixeles
let pjCol; // validamos el mapa en la matriz
let pjFil; // validamos el mapa en la matriz

let enemyPosX; // pixeles
let enemyPosY; // pixeles
let enemyCol; // validamos el mapa en la matriz
let enemyFil; // validamos el mapa en la matriz

function setup() {
  createCanvas(400, 400);

  pjCol = 0; // pixeles
  pjFil = 0; // pixeles
  xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
  yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz

  // Crear Arreglo de arreglos
  for (let index = 0; index < 10; index++) {
    mapa.push(new Array(10));
  }

  // asignar valores iniciales
  for (let fil = 0; fil < 10; fil++) {
    for (let col = 0; col < 10; col++) {
      mapa[fil][col] = 0;
    }
  }
  //console.log(arregloMapa)
  // seleccionamos algunos [fila][col] --> y, x
  mapa[2][0] = 1;
  mapa[7][2] = 1;
  mapa[0][3] = 1;
  mapa[4][5] = 1;
  mapa[2][8] = 1;
  mapa[3][8] = 1;
  mapa[4][8] = 1;
  console.log(mapa)

  coinCol = 5;
  coinFil = 5;
  coinX = (coinCol * 40) + 20;
  coinY = (coinFil * 40) + 20;
  coinTrapped = false;

  enemyCol = 8; // validamos el mapa en la matriz
  enemyFil = 8; // validamos el mapa en la matriz
  enemyPosX = (enemyCol * 40) + 20; // pixeles
  enemyPosY = (enemyFil * 40) + 20; // pixeles
}

function draw() {
  background(220);
  // pintamos basados en los valores de la matriz
  for (let fil = 0; fil < 10; fil++) {
    for (let col = 0; col < 10; col++) {
      if (mapa[fil][col] === 0) {
        fill(255);
      } else if (mapa[fil][col] === 1) {
        fill(0);
      }
      stroke(0);
      rect(col * 40, fil * 40, 40, 40);
    }
  }
  if (!coinTrapped) {
    fill(255, 255, 0);
    ellipse(coinX, coinY, 15, 15);
  }
  fill(255, 0, 0);
  ellipse(xPos, yPos, 30, 30);
  fill(0, 255, 0);
  ellipse(enemyPosX, enemyPosY, 30, 30);
}

function keyPressed() {
  switch (key) {
    case 'a': // izquierda
      if (pjCol - 1 >= 0) {
        if (mapa[pjFil][pjCol - 1] === 0) {
          pjCol -= 1;
        }
      }
      break;
    case 'd': // derecha
      if (pjCol + 1 < 10) {
        if (mapa[pjFil][pjCol + 1] === 0) {
          pjCol += 1;
        }
      }
      break;
    case 'w': // arriba
      if (pjFil - 1 >= 0) {
        if (mapa[pjFil - 1][pjCol] === 0) {
          pjFil -= 1;
        }
      }
      break;
    case 's': // abajo
      if (pjFil + 1 < 10) {
        if (mapa[pjFil + 1][pjCol] === 0) {
          pjFil += 1;
        }
      }
      break;
  }
  xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
  yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz
  verifyItem();
  verifyEnemy();
}

function verifyItem() {
  if (dist(xPos, yPos, coinX, coinY) < 5) {
    coinTrapped = true;
    // ...
    // ...
  }
}

function verifyEnemy() {
  if (dist(xPos, yPos, enemyPosX, enemyPosY) < 5) {
    coinTrapped = false;
    coinCol = 5;
    coinFil = 5;
    coinX = (coinCol * 40) + 20;
    coinY = (coinFil * 40) + 20;
    pjCol = 0; // pixeles
    pjFil = 0; // pixeles
    xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
    yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz
    // ...
    // ...
  }
}