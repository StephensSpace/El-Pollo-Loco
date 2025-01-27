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

    endbossAttack = [
        '../assets/4_enemie_boss_chicken/3_attack/G13.png',
        '../assets/4_enemie_boss_chicken/3_attack/G14.png',
        '../assets/4_enemie_boss_chicken/3_attack/G15.png',
        '../assets/4_enemie_boss_chicken/3_attack/G16.png',
        '../assets/4_enemie_boss_chicken/3_attack/G17.png',
        '../assets/4_enemie_boss_chicken/3_attack/G18.png',
        '../assets/4_enemie_boss_chicken/3_attack/G19.png',
        '../assets/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    currentImage = 0;
    lastFrameTime = 0;
    frameInterval = 200;

    constructor(posX = 2700, posY = 120, width = 350, height = 350) {
        super().loadImage(this.endbossWalking[0]);
        this.loadImages(this.endbossWalking);
        this.loadImages(this.endbossAngry);
        this.loadImages(this.endbossAttack);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.offsetY = 55;
        this.offsetX = 20;
        this.offsetLength = 40;
        this.offsetHeight = 70;
        this.targetY = this.getRandomTargetY(2100, 2300);
        this.movingLeft = true;
        this.walking = true;
        this.speedLeft = 1.3;
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

    endbossFight() {
        this.updateEndbossPosition();

    }

    updateEndbossPosition() {
        if (this.movingLeft) {       
            if (this.walking) { 
                this.animate(this.endbossWalking); 
                this.posX -= this.speedLeft;
            }
            if (this.posX < this.targetY) {
                this.walking = false;
                this.animate(this.endbossAttack);
                this.posX = this.posX
                setTimeout(() => {
                    this.targetY = this.getRandomTargetY(2400, 2500);
                    this.movingLeft = false;
                }, 1500);
                this.speedLeft = this.calculateRandomSpeed();
            }
        } else {
            this.walking = true;
            this.animate(this.endbossWalking);
            this.posX += 1;
            if (this.posX >= this.targetY) {
                this.targetY = this.getRandomTargetY(2150, 2300);
                this.movingLeft = true;
            }
        }
    }

    getRandomTargetY(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    calculateRandomSpeed() {
        return Math.random() * (3.0 - 1.0) + 1.0; 
    }

}