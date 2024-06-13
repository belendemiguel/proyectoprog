class Ladrillo{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    isBroken = false;
    w = 128;
    h = 10;
    dibujar(){
        rect(this.x, this.y, this.w, this.h)
        image(img4, this.x, this.y, this.w, this.h)
    }
    romper(){
        this.isBroken = true;
    }
}
class Powerup{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    w = 20;
    h = 20;
    vy= 4 ;
    dibujar(){
        rect(this.x, this.y, this.w, this.h);
        image (img5, this.x-5, this.y-10, this.w, this.h);
    }
    moverse(){
        this.y+=this.vy;
    }
    comprobarSiChocaConPala(pala){
        if (this.y == pala.y && (this.x >= pala.x && this.x <= pala.x + 60)){
            return true
        }
        return false
    }
}
class Pala{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    w = 60;
    h = 20;
    dibujar(){
        rect(this.x, this.y, this.w, this.h);
        image(img, this.x, this.y, this.w, this.h);
    }
    moverse(){
        if (keyIsDown(37) && this.x > 0){
            this.x = this.x - 10;
        }
        if (keyIsDown(39) && this.x < (1280 - 60)){
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
        if(this.type == 0){
            fill(0, 255, 0);
            ellipse(this.x, this.y, this.w, this.h);
            noFill();
            image(img6, this.x-5, this.y-5, this.w, this.h);
        }
        if(this.type == 1){
            fill(255, 0, 0);
            ellipse(this.x, this.y, this.w, this.h);
            noFill();
            image(img3, this.x-5, this.y-5, this.w, this.h);
        }
    }
    moverse(){
        this.x += this.vx;
        this.y += this.vy;
    }
    comprobarSiChocaConPala(pala){
        if (this.y == pala.y && (this.x >= pala.x && this.x <= pala.x + 60)){
            this.vy = this.vy * -1;
            if(Math.random() > 0.9){
            this.vx = this.vx * Math.random() * 2 + 1;
            }else{
                this.vx = this.vx * Math.random() * 2 - 1;
            }
        }
    }
    comprobarSiChocaConParedes(arrayBolaNuevas){
        if (this.x <= 0 || this.x >= 1280){
            this.vx = this.vx * -1;
        }
        if (this.y <= 0){
            this.vy = this.vy * -1;
        }
        if (this.y >= 720 && this.y <=720) {
            if(this.type == 1){location.reload()}
        }
    }
    comprobarSiChocaConLadrillo(ladrillo,arrayPowerups){
        if (this.y == ladrillo.y && (this.x >= ladrillo.x && this.x <= ladrillo.x + 128)){
            ladrillo.romper();
            if(Math.random() > 0.5){
            arrayPowerups.push(new Powerup(ladrillo.x+ladrillo.w/2, ladrillo.y));
            }
            this.vy = this.vy * -1;
        }        
    }
}
var arrayPowerup = [];
var ladrillos = [];
var pala = new Pala(610, 700);
var bola = new Bola(640, 690, 1);
function preload(){
    img = loadImage('../assets/arkanoid/pala.jpg');
    img2 = loadImage('../assets/arkanoid/espacio.jpg');
    img3 = loadImage('../assets/arkanoid/bola.png');
    img4 = loadImage('../assets/arkanoid/ladrillos.png');
    img5 = loadImage('../assets/arkanoid/powerup.png');
    img6 = loadImage('../assets/arkanoid/bola2.png');
    sonido = loadSound('../assets/arkanoid/musica juego.mp3',()=>sonido.play());
}
function setup(){
    background(255);
    image(img2, 0, 0, 1280, 720);
    createCanvas(1280, 720);
    var x = 0;
    var y = 0;
    for(let j = 0; j<15;j++){
        for (let index = 0; index < 10; index++) {
            let ladrillo = new Ladrillo(x, y);
            ladrillos.push(ladrillo)
            x=x+128;   
        }
        x=0;
        y=y+10;
    }
}
let powerUpActivo = false;
let nuevasBolas = [];
function draw(){
    background(255);
    image(img2, 0, 0, 1280, 720);
    ladrillos.forEach(ladrillo =>{
        if(!ladrillo.isBroken){
            ladrillo.dibujar();
            bola.comprobarSiChocaConLadrillo(ladrillo, arrayPowerup)
        }
    });
    arrayPowerup.forEach(powerup =>{
        powerup.dibujar();
        powerup.moverse();
        if(powerup.comprobarSiChocaConPala(pala)){
            nuevasBolas.push(new Bola(bola.x, bola.y, 0));
        }
    });
    nuevasBolas.forEach(indiceBolas => {
        indiceBolas.dibujar();
        indiceBolas.moverse();
        indiceBolas.comprobarSiChocaConPala(pala);
        indiceBolas.comprobarSiChocaConParedes();
        ladrillos.forEach(ladrillo => {
            indiceBolas.comprobarSiChocaConLadrillo(ladrillo, arrayPowerup) 
        })
    });
    pala.dibujar();
    bola.dibujar();
    bola.moverse();
    pala.moverse();
    bola.comprobarSiChocaConPala(pala);
    bola.comprobarSiChocaConParedes();
}