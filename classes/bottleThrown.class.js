class BottleThrown extends MovableObject {
    bottleFlying = [
        '../assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../assets/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../assets/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../assets/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]

    bottleSplash = [
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../assets/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    character;
    lastFrameTime = 0;
    frameInterval = 100;
    speed;
    speedY;
    width = 90
    height = 90
    offsetY = 15;
    offsetX = 25;
    offsetLength = 70;
    offsetHeight = 65;
    directionRight;
    collisionDetected = false;
    animationStarted = false;
    flyInterval;
    gravityInterval;
    removeTimeout;

    constructor(character, directionRight, collisionDetected) {
        super().loadImage('../assets/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.bottleFlying);
        this.loadImages(this.bottleSplash);
        this.character = character;
        this.directionRight = directionRight
        this.posX = this.character.posX + this.character.offsetX;
        this.posY = this.character.posY + this.offsetY +70;
        this.speed = 3;
        this.speedY = 0;
        this.collisionDetected = collisionDetected;
    }

    bottleFly() {
        if (this.directionRight) {
            this.posX += this.speed;  // Bewegung nach rechts
        } else {
            this.posX -= this.speed;  // Bewegung nach links
        }
    }
}