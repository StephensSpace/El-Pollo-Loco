//**Klasse für den enemyTyp Chicken
// */
class Chicken extends MovableObject {
    imagesWalking = [
        'assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]
    images = {};
    lastFrameTime = 0;
    frameInterval = 200;
    dead = false;
    offsetY = 10;
    offsetX = 0;
    offsetLength = 30;
    offsetHeight = 20;
    speed = 0.4;
    deadAnimationDone = false;

    //** Konstruktor für die Chicken Klasse, 
    // hier wird auch checkDeath gestartet (aus MovableObjects) 
    // um zu überprüfen ob das Chicken noch lebt */
    constructor( posX = 200 + Math.random() * 500, posY = 335, width = 80, height = 80) {
        super().loadImage('assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.loadImages(this.imagesWalking);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.checkDeath();
    }


   
}