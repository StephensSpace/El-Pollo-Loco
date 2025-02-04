/**
 * A class representing a movable object in the game.
 * Extends the DrawAbleObject class and provides functionality for movement, collision detection, gravity, and animation.
 * 
 * @extends DrawAbleObject
 */
class MovableObject extends DrawAbleObject {

    otherDirection = false;
    speed = 3;
    speedY = 0;
    acceleration = 0.12;
    currentImage = 0;
    fall = false;
    offsetY = 0;
    offsetX = 0;
    offsetLength = 0;
    offsetHeight = 0;
    energy = 100;
    hurt = false;
    collisionY = false;

    get charRight() {
        return this.posX + this.offsetX + this.width - this.offsetLength;
    }

    get charLeft() {
        return this.posX + this.offsetX;
    }

    get charTop() {
        return this.posY + this.offsetY;
    }

    get charBottom() {
        return this.posY + this.offsetY + this.height - this.offsetHeight;
    }

    /**
     * Checks if the object has died and triggers the appropriate death animation.
     * This method runs at regular intervals to check the death state of the object.
     */
    checkDeath() {
        setInterval(() => {
            if (this.dead && !this.deadAnimationDone) {
                if (this instanceof Chicken) {
                    this.loadImage('assets/3_enemies_chicken/chicken_normal/2_dead/dead.png');
                } else if (this instanceof Chic) {
                    this.loadImage('assets/3_enemies_chicken/chicken_small/2_dead/dead.png');
                }
                this.deadAnimationDone = true;
            }
        }, 50);
    }

    /**
     * Checks if the object is colliding with another object from the top.
     * 
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} True if the object is colliding from the top, otherwise false.
     */
    isCollidingTop(obj) {
        return (
            this.posY + this.offsetY + this.height - this.offsetHeight >= obj.posY + obj.offsetY &&
            this.posY + this.offsetY + this.height - this.offsetHeight <= obj.posY + obj.offsetY + obj.height &&
            this.posX + this.offsetX + this.width - this.offsetLength >= obj.posX + obj.offsetX &&
            this.posX + this.offsetX <= obj.posX + obj.offsetX + obj.width
        );
    }

    /**
     * Checks if the object is colliding with another object.
     * 
     * @param {Object} obj - The object to check collision with.
     * @returns {boolean} True if the object is colliding, otherwise false.
     */
    isColliding(obj) {
        return (
            this.posX + this.offsetX + this.width - this.offsetLength >= obj.posX + obj.offsetX &&
            this.posX + this.offsetX <= obj.posX + obj.offsetX + obj.width &&
            this.posY + this.offsetY + this.height - this.offsetHeight >= obj.posY + obj.offsetY &&
            this.posY + this.offsetY <= obj.posY + obj.offsetY + obj.height
        );
    }

    /**
     * Checks if the object is colliding with a block and handles the collision with a bottle if necessary.
     * 
     * @param {Object} block - The block to check for collision.
     * @param {Object} bottle - The bottle involved in the collision (optional).
     */
    isCollidingBlock(block, bottle) {
        if (this.checkCollisionBlock(block)) {
            this.handleBlockCollision(block, bottle);
        }
    }

    /**
     * Checks if the object is colliding with a block.
     * 
     * @param {Object} block - The block to check for collision.
     * @returns {boolean} True if there is a collision, otherwise false.
     */
    checkCollisionBlock(block) {
        const blockRight = block.posX + block.offsetX + block.width - block.offsetLength;
        const blockLeft = block.posX + block.offsetX;
        const blockTop = block.posY + block.offsetY;
        const blockBottom = block.posY + block.offsetY + block.height - block.offsetHeight;

        return (
            this.charRight > blockLeft &&
            this.charLeft < blockRight &&
            this.charBottom > blockTop &&
            this.charTop < blockBottom
        );
    }


    /**
    * Handles the collision between the object and a block, adjusting the position and speed as needed.
    * 
    * @param {Object} block - The block with which the collision is handled.
    * @param {Object} bottle - The bottle involved in the collision (optional).
    */
    handleBlockCollision(block, bottle) {
        const blockRight = block.posX + block.width;
        const blockLeft = block.posX;
        const blockTop = block.posY;
        const blockBottom = block.posY + block.height;
        const overlapRight = this.charRight - blockLeft;
        const overlapLeft = blockRight - this.charLeft;
        const overlapTop = this.charBottom - blockTop;
        const overlapBottom = blockBottom - this.charTop;
        this.compareOverlapBlockCollision(overlapRight, overlapLeft, overlapTop, overlapBottom, block, bottle);
    }



    /**
 * Vergleicht die Überlappung des aktuellen Objekts mit einem Block und ruft die entsprechende Handler-Funktion auf, 
 * je nachdem, an welcher Seite des Blocks die Überlappung auftritt.
 * @param {number} overlapRight - Die Überlappungsdistanz auf der rechten Seite.
 * @param {number} overlapLeft - Die Überlappungsdistanz auf der linken Seite.
 * @param {number} overlapTop - Die Überlappungsdistanz auf der oberen Seite.
 * @param {number} overlapBottom - Die Überlappungsdistanz auf der unteren Seite.
 * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
 * @param {Object} bottle - Das Flaschen-Objekt (wird in der Kollisionserkennung verwendet).
 */
    compareOverlapBlockCollision(overlapRight, overlapLeft, overlapTop, overlapBottom, block, bottle) {
        const minOverlap = Math.min(overlapRight, overlapLeft, overlapTop, overlapBottom);
        if (minOverlap === overlapRight) {
            this.handleOverlapRight(block, bottle)
        } else if (minOverlap === overlapLeft) {
            this.handleOverlapLeft(block, bottle)
        } else if (minOverlap === overlapTop) {
            this.handleOverlapTop(block, bottle)
        } else if (minOverlap === overlapBottom) {
            this.handleOverlapBottom(block, bottle)
        }
    }

    /**
     * Behandelt die Kollision, wenn die Überlappung am unteren Rand des Objekts auftritt.
     * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
     * @param {Object} bottle - Das Flaschen-Objekt (wird in der Kollisionserkennung verwendet).
     */
    handleOverlapBottom(block, bottle) {
        if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
            this.handleBottomCollision(block);
        } else if (this instanceof CharacterPepe) {
            this.handleBottomCollision(block);
        } else if (this instanceof BottleThrown) {
            this.handleCollisionBottle(bottle);
        }
    }

    /**
     * Behandelt die Kollision, wenn die Überlappung an der rechten Seite des Objekts auftritt.
     * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
     * @param {Object} bottle - Das Flaschen-Objekt (wird in der Kollisionserkennung verwendet).
     */
    handleOverlapRight(block, bottle) {
        if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
            this.handleEnemyCollisionRight();
        } else if (this instanceof CharacterPepe) {
            this.handleRightCollision(block);
        } else if (this instanceof BottleThrown) {
            this.handleCollisionBottle(bottle);
        }
    }

    /**
     * Behandelt die Kollision, wenn die Überlappung an der oberen Seite des Objekts auftritt.
     * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
     * @param {Object} bottle - Das Flaschen-Objekt (wird in der Kollisionserkennung verwendet).
     */
    handleOverlapTop(block, bottle) {
        if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
            this.handleTopCollision(block);
        } else if (this instanceof CharacterPepe) {
            this.handleTopCollision(block);
        } else if (this instanceof BottleThrown) {
            this.handleCollisionBottle(bottle);
        }
    }

    /**
     * Behandelt die Kollision, wenn die Überlappung an der linken Seite des Objekts auftritt.
     * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
     * @param {Object} bottle - Das Flaschen-Objekt (wird in der Kollisionserkennung verwendet).
     */
    handleOverlapLeft(block, bottle) {
        if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
            this.handleEnemyCollisionLeft();
        } else if (this instanceof CharacterPepe) {
            this.handleLeftCollision(block);
        } else if (this instanceof BottleThrown) {
            this.handleCollisionBottle(bottle);
        }
    }

    /**
     * Behandelt die Kollision, wenn das Objekt mit einem Block an der linken Seite kollidiert.
     */
    handleEnemyCollisionLeft() {
        this.otherDirection = true;
    }

    /**
     * Behandelt die Kollision, wenn das Objekt mit einem Block an der rechten Seite kollidiert.
     */
    handleEnemyCollisionRight() {
        this.otherDirection = false;
    }

    /**
     * Korrigiert die Position des Objekts, wenn es mit einem Block an der linken Seite kollidiert.
     */
    handleLeftCollision() {
        this.posX += 0.08;
        this.speed = 0;  // Stoppt die Bewegung   
    }

    /**
     * Korrigiert die Position des Objekts, wenn es mit einem Block an der rechten Seite kollidiert.
     * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
     */
    handleRightCollision(block) {
        this.posX = block.posX + block.offsetX - this.width + this.offsetLength - this.offsetX;
        this.speed = 0;  // Stoppt die Bewegung
    }

    /**
     * Korrigiert die Position des Objekts, wenn es mit einem Block an der oberen Seite kollidiert.
     * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
     */
    handleTopCollision(block) {
        this.posY = block.posY + block.offsetY - (this.height - this.offsetHeight) - this.offsetY;
        this.speedY = 0;
        this.collisionY = true;
        this.fall = false;
    }

    /**
     * Korrigiert die Position des Objekts, wenn es mit einem Block an der unteren Seite kollidiert.
     * @param {Object} block - Das Block-Objekt, mit dem die Kollision überprüft wird.
     */
    handleBottomCollision(block) {
        this.posY = block.posY - block.offsetY + block.height - this.offsetY;
    }

    /**
     * Behandelt die Kollision mit einer geworfenen Flasche und startet eine Animationssequenz.
     * @param {Object} bottle - Das Flaschen-Objekt, das die Kollision ausgelöst hat.
     */
    handleCollisionBottle(bottle) {
        if (!bottle.collisionDetected) {
            bottle.character.world.startAnimationSequence(
                bottle,
                bottle.bottleSplash,
                () => bottle.character.world.handleAnimationEnd(bottle) // Ruft die Funktion auf, die das Ende der Animation behandelt
            );
        }
    }

    /**
     * Wendet die Schwerkraft auf das Objekt an und aktualisiert seine Position basierend auf der vertikalen Geschwindigkeit.
     */
    applyGravity() {
        if (this.posY < 200 || this.speedY > 0) {
            this.posY -= this.speedY;
            this.speedY -= this.acceleration;
            this.fall = true;
        } else if (this.speedY == 0) {
            this.fallOnBlock = true;
        } else {
            this.posY = 200;
            this.fall = false;
            this.collisionY = false;
        }
    }

    /**
     * Wendet die Schwerkraft auf eine geworfene Flasche an und aktualisiert ihre Position basierend auf der vertikalen Geschwindigkeit.
     */
    applyGravityToBottle() {
        if (!this.collisionDetected) {
            this.posY -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.speedY = 0;  // Stoppt die vertikale Geschwindigkeit bei Kollision
        }
    }

    /**
     * Animiert das Objekt, indem es durch die Bilder im übergebenen Array basierend auf dem Frame-Intervall wechselt.
     * @param {Array} array - Das Array, das die Bildpfade für die Animation enthält.
     */
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

    /**
     * Bewegt das Huhn-Objekt, indem es seine Position basierend auf der aktuellen Richtung aktualisiert.
     */
    moveChicken() {
        if (!this.otherDirection) {
            this.posX -= this.speed;
        } else {
            this.posX += this.speed;
        }
    }
}