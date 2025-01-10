class MovableObject {
    posX = 50;
    posY = 90;
    img;
    images = {};
    width = 150;
    height = 355;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    loadImages(Array) {
        Array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    }

    moveRight() {
        console.log('Moving Right');
    }
}