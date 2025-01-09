class Chicken extends MovableObject {


    constructor(posX = 200 + Math.random() * 500, posY = 405, width = 50, height = 50) {
        super().loadImage('../assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
}