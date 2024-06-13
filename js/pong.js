class Pala {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    w = 60;
    h = 10;
    dibujar(){
        fill("white");
        image(img7, this.x, this.y, this.w, this.h)
        noFill();

    }
    moverse(key1,key2){
        if (keyIsDown(key1) && this.x > 0){
            this.x = this.x - 10;
        }
        if (keyIsDown(key2) && this.x < (1280 - 60)){
            this.x = this.x + 10;
        }
    }
}
class Bola{
    constructor(x, y,type){
        this.x = x;
        this.y = y;
        this.type = type;
    }
    w = 10;
    h = 10;
    vx = 2;
    vy = -5;
    dibujar(){
            fill("red");
            ellipse(this.x, this.y, this.w, this.h)
            noFill();
        }
    moverse(){
        this.x += this.vx;
        this.y += this.vy;
    }
    comprobarSiChocaConPala(pala){
        if ((this.y >= pala.y && this.y <= (pala.y + pala.h)) && (this.x >= pala.x -5 && this.x <= pala.x + 65)){
            this.vy = this.vy * -1;
            if(Math.random() > 0.5){
            this.vx = this.vx * Math.random() * 2 + 1;
            }else{
                this.vx = this.vx * Math.random() * 2 - 1;
            }
        }
    }
    comprobarSiChocaConParedes(){
        if (this.x <= 0 || this.x >= 1280){
            this.vx = this.vx * -1;
        }
        if (this.y <= 0){
            document.getElementById("puntuacionJ1").innerHTML = Number.parseInt(document.getElementById("puntuacionJ1").innerHTML) + 1;
            this.x = 640;
            this.y = 690;
            this.vx = 2;
            this.vy = -5;
        }
        if (this.y >= 720){
            document.getElementById("puntuacionJ2").innerHTML = Number.parseInt(document.getElementById("puntuacionJ2").innerHTML) + 1;
            this.x = 640;
            this.y = 20;
            this.vx = 2;
            this.vy = 5;
        }

    }
}
var j1 = new Pala(610, 700);
var j2 = new Pala(610, 10)
var bola = new Bola(640, 690, 1);
function setup(){
    background(255);
    createCanvas(1280, 720);
}
function draw(){
    background(255);
    image(img6, 0, 0, 1280, 720);
    j1.moverse(37,39);
    j1.dibujar();
    j2.dibujar();
    j2.moverse(65, 68)
    bola.dibujar();
    bola.moverse();
    bola.comprobarSiChocaConPala(j1);
    bola.comprobarSiChocaConPala(j2);
    bola.comprobarSiChocaConParedes();
}