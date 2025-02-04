//** Klasse für den gegnertypen Vogel
//  */

class Bird extends MovableObject {
    //**
    // Array für die animation der bwegung des Vogels */
    imagesWalking = [
        'assets/11_bird/frame_1.png',
        'assets/11_bird/frame_2.png',
        'assets/11_bird/frame_3.png',
        'assets/11_bird/frame_4.png',
        'assets/11_bird/frame_5.png',
        'assets/11_bird/frame_6.png',
    ]

    images = {};
    lastFrameTime = 0;
    frameInterval = 200;
    dead = false;
    offsetY = 15;
    offsetX = 10;
    speed = 1.4;
    offsetLength = 40;
    offsetHeight = 40;
    deadAnimationDone = false;
    otherDirection ;

//** Konstruktor für die Bird Klasse hier wird überprüft (checkDeath()) ob der Vogel noch lebt
//  */
    constructor( posX, posY, width = 80, height = 80) {
        super().loadImage('assets/11_bird/frame_1.png')
        this.loadImages(this.imagesWalking);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.checkDeath();
    }
}