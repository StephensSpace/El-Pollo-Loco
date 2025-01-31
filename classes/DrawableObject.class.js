class DrawAbleObject {
  
    posX = 20;
    posY = 200;
    img;
    width = 150;
    height = 220;
    percentage = 100;
    images = {};
    running = true;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
        
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height)
    }

    loadImages(Array) {
        Array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    }

    drawHitbox(ctx) {
        if (this.checkInstance()) {
            ctx.beginPath();
            ctx.lineWidth = "0";
            ctx.strokeStyle = "transparent";
            ctx.rect(this.posX + this.offsetX, this.posY + this.offsetY, this.width - this.offsetLength, this.height - this.offsetHeight);
            ctx.stroke();
        }
    }

    checkInstance() {
        if (
            this instanceof CharacterPepe
            || this instanceof Chicken
            || this instanceof Chic
            || this instanceof Salsa
            || this instanceof Rocks
            || this instanceof Endboss
            || this instanceof Coins
            || this instanceof BottleThrown
            || this instanceof Bird
        ) {
            return true
        }
        return false
    }

    stop() {
        this.running = false;  // Setze running auf false, um draw zu stoppen
    }
}