//**Klasse für das Hintergrundobjekt Clouds
//  */
class Clouds extends MovableObject {

    constructor(speed = 0.2, posX = 0, posY = 0, width = 360, height = 280, path = 'assets/5_background/layers/4_clouds/1.png') {
        super().loadImage(path)
        this.posX = posX;
        this.startPosX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.speed = speed
    }
//**Funktion die die bewegung der clouds regelt
//  */
    moveClouds() {
        this.posX -= this.speed;

        if (this.posX + this.width < 0) {
            this.posX = 2790 + Math.random() * 10; // Zufälliger Offset nach rechts
        }
    }
} 