class MovableObject {
    posX = 50;
    posY = -80;
    img;
    images = {};
    width = 150;
    height = 260;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.1;
    currentImage = 0;
    fall = false;
    offsetY = 0;
    offsetX = 0;
    offsetLength = 0;
    offsetHeight = 0;
    energy = 100;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }

    drawHitbox(ctx) {
        if (this.checkInstance()) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.posX + this.offsetX, this.posY + this.offsetY, this.width - this.offsetLength, this.height - this.offsetHeight);
            ctx.stroke();
        }
    }

    checkInstance() {
        if(
            this instanceof CharacterPepe 
            || this instanceof Chicken 
            || this instanceof Chic 
            || this instanceof Salsa 
            || this instanceof Rocks 
            || this instanceof Endboss 
            || this instanceof Coins
        ) {
            return true
        } 
            return false
    }

    isColliding(obj) {
        return (
            this.posX + this.offsetX + this.width - this.offsetLength >= obj.posX + obj.offsetX && // Rechte Kante von "this" >= Linke Kante von "obj"
            this.posX + this.offsetX <= obj.posX + obj.offsetX + obj.width && // Linke Kante von "this" <= Rechte Kante von "obj"
            this.posY + this.offsetY + this.height - this.offsetHeight >= obj.posY + obj.offsetY && // Untere Kante von "this" >= Obere Kante von "obj"
            this.posY + this.offsetY <= obj.posY + obj.offsetY + obj.height // Obere Kante von "this" <= Untere Kante von "obj"
        );
    }

    applyGravity() {
        if (this.posY < 180 || this.speedY > 0) {
            this.posY -= this.speedY;
            this.speedY -= this.acceleration;
            this.fall = true;
        } else {
            this.posY = 180;
            this.fall = false;
        }
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