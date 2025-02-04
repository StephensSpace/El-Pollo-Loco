/**
 * Repräsentiert eine Flamme im Spiel, die sich bewegen kann und eine Todesanimation besitzt.
 * Erbt von `MovableObject`.
 */
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

    /**
     * Erstellt eine neue Instanz einer Flamme.
     * @param {number} posX - Die X-Position der Flamme auf dem Spielfeld.
     * @param {number} posY - Die Y-Position der Flamme auf dem Spielfeld.
     * @param {number} [width=80] - Die Breite der Flamme (Standard: 80).
     * @param {number} [height=60] - Die Höhe der Flamme (Standard: 60).
     */
    constructor( posX, posY, width = 80, height = 60) {
        super().loadImage('assets/Flames.png')
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.checkDeath();
    }
}