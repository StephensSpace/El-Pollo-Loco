//**Klasse für die Hintergrundbilder des levels
// */

class Background extends MovableObject {

    constructor(path, posX = 0, posY = 0, width = 720, height = 480) {
        super().loadImage(path)
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
}