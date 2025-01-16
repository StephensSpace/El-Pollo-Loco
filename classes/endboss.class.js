class Endboss extends MovableObject {
    endbossWalking = [
        '../assets/4_enemie_boss_chicken/1_walk/G1.png',
        '../assets/4_enemie_boss_chicken/1_walk/G2.png',
        '../assets/4_enemie_boss_chicken/1_walk/G3.png',
        '../assets/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    endbossAngry = [
        '../assets/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    currentImage = 0;
    lastFrameTime = 0;
    frameInterval = 200;

    constructor(posX = 2500, posY = 120, width = 350, height = 350) {
        super().loadImage(this.endbossWalking[0]);
        this.loadImages(this.endbossWalking);
        this.loadImages(this.endbossAngry);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.offsetY = 55;
        this.offsetX = 20;
        this.offsetLength = 40;
        this.offsetHeight = 70;
    }

    animate(array) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameInterval) {
            let path = array[this.currentImage];
            this.img = this.images[path]
            this.currentImage++;
            this.lastFrameTime = currentTime;
            if (this.currentImage == array.length) {
                this.currentImage = 0;
            }
        }
    }
    moveChicken() {
        this.posX -= 1;
    }
}