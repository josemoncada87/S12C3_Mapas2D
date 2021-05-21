function Terrain() {
    // Como construimos nuestro mapa
    let mapa = [];
    return {
        init: function () {
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
            // seleccionamos algunos [fila][col] --> y, x
            mapa[2][0] = 1;
            mapa[7][2] = 1;
            mapa[0][3] = 1;
            mapa[4][5] = 1;
            mapa[2][8] = 1;
            mapa[3][8] = 1;
            mapa[4][8] = 1;
            console.log(mapa)
        },
        show: function () {
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
        },
        getValueLocation:function(nfil, ncol){
            return mapa[nfil][ncol];
        }
    }
}

function Player() {
    let xPos; // pixeles
    let yPos; // pixeles
    let pjCol; // validamos el mapa en la matriz
    let pjFil; // validamos el mapa en la matriz
    return {
        init: function () {
            pjCol = 0; // pixeles
            pjFil = 0; // pixeles
            xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
            yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz
        },
        show: function () {
            fill(255, 0, 0);
            ellipse(xPos, yPos, 30, 30);
        },
        updateLocation:function(){
            xPos = (pjCol * 40) + 20; // validamos el mapa en la matriz
            yPos = (pjFil * 40) + 20; // validamos el mapa en la matriz
        },
        getCol:function(){
            return pjCol;
        },
        getFil:function(){
            return pjFil;
        },
        setCol:function(newCol){
            pjCol = newCol;
        },
        setFil:function(newFil){
            pjFil = newFil;
        },
        getX:function(){
            return xPos;
        }, 
        getY:function(){
            return yPos;
        }
    }
}

function Enemy() {
    let enemyPosX; // pixeles
    let enemyPosY; // pixeles
    let enemyCol; // validamos el mapa en la matriz
    let enemyFil; // validamos el mapa en la matriz
    let enemyDir;
    return {
        init: function () {
            enemyCol = 8; // validamos el mapa en la matriz
            enemyFil = 8; // validamos el mapa en la matriz
            enemyPosX = (enemyCol * 40) + 20; // pixeles
            enemyPosY = (enemyFil * 40) + 20; // pixeles
            enemyDir = 0; // 0L | 1R | 2U | 3D
        },
        show: function () {
            fill(0, 255, 0);
            ellipse(enemyPosX, enemyPosY, 30, 30);
        },
        move: function(mapReference) {
            if (frameCount % 60 == 0) {
                this.moveEnemy(mapReference);
            }
        },
        updateLocation: function () {
            enemyPosX = (enemyCol * 40) + 20; // pixeles
            enemyPosY = (enemyFil * 40) + 20; // pixeles
        },
        moveEnemy:function (mapReference) {
            let moving = false;
            switch (enemyDir) {
                case 0: // L
                    if (enemyCol - 1 >= 0) {
                        if (mapReference.getValueLocation(enemyFil,enemyCol - 1) === 0) {
                            enemyCol--; // validamos el mapa en la matriz  
                            moving = true;
                        }
                    }
                    break;
                case 1: // R
                    if (enemyFil + 1 < 10) {
                        if (mapReference.getValueLocation(enemyFil,enemyCol + 1) === 0) {
                            enemyCol += 1;
                            moving = true;
                        }
                    }
                    break;
                case 2: // U
                    if (enemyFil - 1 >= 0) {
                        if (mapReference.getValueLocation(enemyFil-1,enemyCol) === 0) {
                            enemyFil -= 1;
                            moving = true;
                        }
                    }
                    break;
                case 3: // D
                    if (enemyFil + 1 < 10) {
                        if (mapReference.getValueLocation(enemyFil+1,enemyCol)=== 0) {
                            enemyFil += 1;
                            moving = true;
                        }
                    }
                    break;
            }
        
            if (!moving) {
                enemyDir = int(random(0, 4));
            }
            // 0L | 1R | 2U | 3D
            this.updateLocation();
        },
        getX:function(){
            return enemyPosX;
        }, 
        getY:function(){
            return enemyPosY;
        }
    }
}

function Coin() {
    let coinX;
    let coinY;
    let coinCol;
    let coinFil;
    let coinTrapped;
    return {
        init: function () {
            coinCol = 5;
            coinFil = 5;
            coinX = (coinCol * 40) + 20;
            coinY = (coinFil * 40) + 20;
            coinTrapped = false;
        },
        show: function () {
            if (!coinTrapped) {
                fill(255, 255, 0);
                ellipse(coinX, coinY, 15, 15);
            }
        },
        getX:function(){
            return coinX;
        }, 
        getY:function(){
            return coinY;
        },
        setTrapped:function(newTrappedState) {
         coinTrapped = newTrappedState;
        }
    }
}

// lets use the constructor functions
const map = new Terrain();
const pj = new Player();
const enemy = new Enemy();
const coin = new Coin();

function setup() {
    createCanvas(400, 400);
    // init all instances with generic values
    map.init();
    pj.init();
    enemy.init();
    coin.init();
}

function draw() {
    background(220);  
    map.show();
    pj.show();
    enemy.show();
    enemy.move(map);
    coin.show();  
}

function keyPressed() {
    switch (key) {
        case 'a': // izquierda
            if (pj.getCol() - 1 >= 0) {
                if (map.getValueLocation(pj.getFil() , pj.getCol() - 1) === 0) {
                    pj.setCol(pj.getCol()-1);
                }
            }
            break;
        case 'd': // derecha
            if (pj.getCol() + 1 < 10) {
                if (map.getValueLocation(pj.getFil() , pj.getCol() + 1) === 0) {
                    pj.setCol(pj.getCol()+1);
                }
            }
            break;
        case 'w': // arriba
            if (pj.getFil() - 1 >= 0) {
                if (map.getValueLocation(pj.getFil()-1 , pj.getCol()) === 0) {
                    pj.setFil(pj.getFil()-1);
                }
            }
            break;
        case 's': // abajo
            if (pj.getFil() + 1 < 10) {
                if (map.getValueLocation(pj.getFil()+1, pj.getCol()) === 0) {
                    pj.setFil(pj.getFil()+1);
                }
            }
            break;
    }
    pj.updateLocation();
    verifyItem();
    verifyEnemy();
}


function verifyItem() {
    if (dist(pj.getX(), pj.getY(), coin.getX(), coin.getY()) < 5) {
        coin.setTrapped(true);
    }    
}

function verifyEnemy() {
    if (dist(pj.getX(), pj.getY(), enemy.getX(), enemy.getY()) < 5) {
        coin.init();
        pj.init();
        enemy.init();        
    }
}