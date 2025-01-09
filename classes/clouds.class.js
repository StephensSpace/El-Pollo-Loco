class Clouds extends MovableObject {

    constructor(posX = 0, posY = 0, width = 360, height = 280, path = 'assets/5_background/layers/4_clouds/1.png') {
        super().loadImage(path)
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;  
    }
}