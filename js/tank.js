class Tank{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    size = 50;
    sizeTower = this.size/2;
    currentBodyAngle = 0;
    currentTowerAngle = 0;
    dibujarTank(){
        rectMode(CENTER);
        rect(0, 0, this.size+10, this.size-10, 5);
        rect(0, 0, this.size, this.size, 5);
    }
    dibujarTorreta(){
        rectMode(CENTER);
        rect(0, 0, this.sizeTower, this.sizeTower, 5);
    }
    dibujarCanyon(){
        rect(0, 0-this.sizeTower, 3, this.sizeTower, 5);
    }
    mover(){
        const angleRadians = this.currentBodyAngle * Math.PI/180;
        const displacementX = 2 * Math.sin(angleRadians);
        const displacementY = 2 * Math.cos(angleRadians);
        if(keyIsDown(LEFT_ARROW)){
            this.currentTowerAngle = this.currentTowerAngle - 1;
        }
        if (keyIsDown(RIGHT_ARROW)){
            this.currentTowerAngle = this.currentTowerAngle + 1;
        }
        if (keyIsDown(87)){
            this.x = this.x + displacementX;
            this.y = this.y - displacementY;
        }
        if (keyIsDown(83)){
            this.x = this.x - displacementX;
            this.y = this.y + displacementY;
        }
        if (keyIsDown(65)){
            this.currentBodyAngle = this.currentBodyAngle - 1;
        }
        if (keyIsDown(68)){
            this.currentBodyAngle = this.currentBodyAngle + 1;
        }
        translate (this.x, this.y)
        rotate (this.currentBodyAngle);
        this.dibujarTank();
        angleMode(DEGREES);
        rotate (this.currentTowerAngle);
        this.dibujarTorreta();
        this.dibujarCanyon();
    }
}
var tank = new Tank(200, 200);
function setup(){
    createCanvas (720, 720);
    background (255);
}
function draw(){
    background (255);
    tank.mover();
}

