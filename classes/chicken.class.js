class Chicken extends MovableObject {
    imagesWalking = [
        '../assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    images = {};
    currentImage = 0;
    lastFrameTime = 0;
    frameInterval = 200;

    constructor(posX = 200 + Math.random() * 500, posY = 335, width = 100, height = 100) {
        super().loadImage('../assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.imagesWalking);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        

    }


    moveChicken() {
        this.posX -= 0.4;

        if (this.posX <= 170) {
            this.posX = 720;
        }
    }
}