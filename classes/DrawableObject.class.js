/**
 * Represents a drawable object that can load and draw images, display hitboxes, and check if the object belongs to specific types.
 */
class DrawAbleObject {
  
    posX = 20;
    posY = 200;
    img;
    width = 150;
    height = 220;
    percentage = 100;
    images = {};
    running = true;

   /**
     * Loads an image from the specified path.
     * @param {string} path - The path to the image file.
     */
   loadImage(path) {
    this.img = new Image();
    this.img.src = path;
}

/**
 * Draws the image on the canvas at the object's position with the specified width and height.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
draw(ctx) {
    ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
}

/**
 * Loads multiple images from an array of paths and stores them in the `images` property.
 * @param {string[]} Array - An array of image file paths.
 */
loadImages(Array) {
    Array.forEach(path => {
        let img = new Image();
        img.src = path;
        this.images[path] = img;
    });
}

/**
 * Draws the hitbox of the object on the canvas, only if the object is an instance of specific types.
 * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
 */
drawHitbox(ctx) {
    if (this.checkInstance()) {
        ctx.beginPath();
        ctx.lineWidth = "0";
        ctx.strokeStyle = "transparent";
        ctx.rect(this.posX + this.offsetX, this.posY + this.offsetY, this.width - this.offsetLength, this.height - this.offsetHeight);
        ctx.stroke();
    }
}

/**
 * Checks if the object is an instance of one of the predefined classes (CharacterPepe, Chicken, Chic, Salsa, Rocks, Endboss, Coins, BottleThrown, Bird).
 * @returns {boolean} True if the object is an instance of one of the predefined classes, false otherwise.
 */
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
        return true;
    }
    return false;
}

/**
 * Stops the object's movement or animation by setting the `running` property to false.
 */
stop() {
    this.running = false;  // Setze running auf false, um draw zu stoppen
}
}