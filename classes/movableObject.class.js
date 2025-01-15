class MovableObject {
    posX = 50;
    posY = 90;
    img;
    images = {};
    width = 150;
    height = 355;
    otherDirection = false;

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

    animate(array) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameInterval) {
            let path = array[this.currentImage];
            this.img = this.images[path]
            this.currentImage++;
            this.lastFrameTime = currentTime;
            if (this.currentImage == array.length) {
                this.currentImage = 0;
            }
        }
    }
}