class Flame extends MovableObject {
    images = {};
    lastFrameTime = 0;
    frameInterval = 200;
    dead = false;
    offsetY = 15;
    offsetX = 10;
    offsetLength = 40;
    offsetHeight = 40;
    deadAnimationDone = false;
    otherDirection ;


    constructor( posX, posY, width = 80, height = 60) {
        super().loadImage('assets/Flames.png')
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.checkDeath();
    }
}