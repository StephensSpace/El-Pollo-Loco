class Chic extends MovableObject {
    imagesWalking = [
        '../assets/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ]
    images = {};
    currentImage = 0;
    lastFrameTime = 0;
    frameInterval = 200;
    dead = false;
    deadAnimationDone = false;
    offsetY = 15;
    offsetX = 5;
    offsetLength = 10;
    offsetHeight = 10;

    constructor(posX = 200 + Math.random() * 500, posY = 380, width = 40, height = 40) {
        super().loadImage('../assets/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.imagesWalking);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.checkDeath();
    }


    
}