//**Klasse Air für Himmel hintergrundbilder
//  */
class Air extends MovableObject {

    constructor(posX = 0, posY = -60, width = 720, height = 480) {
        super().loadImage('assets/5_background/layers/air.png')
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
}