class MovableObject {
    posX = 120;
    posY = 255;
    img;
    width = 100;
    height = 200;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    moveRight() {
        console.log('Moving Right');
    }
}