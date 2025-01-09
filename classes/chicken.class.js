class Chicken extends MovableObject {


    constructor(posX = 200 + Math.random() * 500, posY = 355, width = 100, height = 100) {
        super().loadImage('../assets/3_enemies_chicken/chicken_normal/1_walk/1_w.png')
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }
}