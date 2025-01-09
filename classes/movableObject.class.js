class MovableObject {
    posX = 50;
    posY = 110;
    img;
    width = 140;
    height = 355;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    moveRight() {
        console.log('Moving Right');
    }
}