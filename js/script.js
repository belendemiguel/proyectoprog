var ladrillos = [];
function setup(){
    createCanvas(1280, 720);
    colorMode(RGB);
    background(255); 
    var x = 0;
    var y = 0;
    for(let j = 0; j<15;j++){
        for (let index = 0; index < 10; index++){
            rect(x, y, 128, 10)
            image(img4, x, y, 128, 10)
            ladrillos.push({x:x,y:y,isBroken:false})
            x=x+128;   
        }
        x=0;
        y=y+10;
    }
}
function redibujarLadrillos(){
    ladrillos.forEach(ladrillo => {
        if(!ladrillo.isBroken){
            rect(ladrillo.x, ladrillo.y, 128, 10)
            image(img4, ladrillo.x, ladrillo.y, 128, 10)
        }
    });
}
var posXPala = 610;
var posYPala = 700;
var posXBola = 640;
var posYBola = 690;
var vxBola = 2;
var vyBola = 5;
var posXPowerup;
var posYPowerup;
var vPowerup = 4;
var img;
var sonido;
function preload(){
    img = loadImage('../assets/pala.jpg');
    img2 = loadImage('../assets/espacio.jpg');
    img3 = loadImage('../assets/bola.png');
    img4 = loadImage('../assets/ladrillos.png');
    img5 = loadImage('../assets/powerup.png');
    sonido = loadSound('../assets/musica juego.mp3',()=>sonido.play());
}
function comprobarSiChocaConLadrillos(){
    ladrillos.forEach(ladrillo =>{
        if(!ladrillo.isBroken){
            if((ladrillo.y+10 == posYBola && posXBola>=ladrillo.x) && posXBola <= ladrillo.x + 128){
                ladrillo.isBroken = true;
                vyBola = vyBola*-1;
                if(Math.random() > 0.1){
                posXPowerup = ladrillo.x + 64;
                posYPowerup = 0;
                }
            }
        }
    })
}
function draw() {
    background(255);
    image(img2, 0, 0, 1280, 720);
    redibujarLadrillos();
    comprobarSiChocaConLadrillos();
    fill(255);
    ellipse(posXBola, posYBola, 10, 10)
    noFill ();
    image(img3, posXBola-5, posYBola-5, 10, 10)
    if(posXBola<=0 || posXBola >=1280){
        vxBola = vxBola * -1;
    }
    if(posYBola<=0 ){
        vyBola=vyBola*-1;
    }
    if(posYBola == 720){
        location.reload()
    }
    if(posYBola == posYPala && (posXBola >=posXPala && posXBola <= posXPala+60)){
        vyBola = vyBola * -1;
        if (Math.random() > 0.5){
            vxBola = vxBola * Math.random() * 2+1;
        }else{
            vxBola = vxBola * Math.random() * 2-1;
        }
    }
    posXBola = posXBola + vxBola;
    posYBola = posYBola + vyBola;
    image(img, posXPala, posYPala, 60, 20)
    keydown();
    fill(255, 0); 
    rect (posXPowerup, posYPowerup, 10, 10,)
    posYPowerup = posYPowerup + vPowerup;
    noFill();
    image (img5, posXPowerup-5, posYPowerup-10, 20, 20)
function keydown(){
    if (keyIsDown(37) && posXPala > 0) {
        posXPala = posXPala-10;
      }
      if(keyIsDown(39) && posXPala < (1280-60)){
        posXPala = posXPala +10;
      }
    }
}
