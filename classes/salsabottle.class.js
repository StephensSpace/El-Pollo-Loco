class Salsa extends MovableObject {
    salsaImages = [
        '../assets/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ]

    images = {};
    currentImage = 0;
    lastFrameTime = 0;
    frameInterval = 1000;
    collisionDetected = false;

    constructor(path, posX, posY = 90, width = 90, height = 90) {
        super().loadImage(path);
        this.loadImages(this.salsaImages);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.offsetY = 15;
        this.offsetX = 25;
        this.offsetLength = 40;
        this.offsetHeight = 25;
    }

}