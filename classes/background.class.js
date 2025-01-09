class Background extends MovableObject {

    constructor(posX = 0, posY = 0, width = 720, height = 480) {
        super().loadImage('assets/5_background/layers/1_first_layer/1.png')
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
}