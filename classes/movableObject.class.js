class MovableObject {
    posX = 900;
    posY = -110;
    img;
    images = {};
    width = 150;
    height = 220;
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

    checkDeath() {
        setInterval(() => {
            if (this.dead && !this.deadAnimationDone) {
                if (this instanceof Chicken) {
                    this.loadImage('../assets/3_enemies_chicken/chicken_normal/2_dead/dead.png')
                } else if (this instanceof Chic) {
                    this.loadImage('../assets/3_enemies_chicken/chicken_small/2_dead/dead.png')
                }
                this.deadAnimationDone = true;
            }
        }, 50);
    }

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

    isColliding(obj) {
        return (
            this.posX + this.offsetX + this.width - this.offsetLength >= obj.posX + obj.offsetX && // Rechte Kante von "this" >= Linke Kante von "obj"
            this.posX + this.offsetX <= obj.posX + obj.offsetX + obj.width && // Linke Kante von "this" <= Rechte Kante von "obj"
            this.posY + this.offsetY + this.height - this.offsetHeight >= obj.posY + obj.offsetY && // Untere Kante von "this" >= Obere Kante von "obj"
            this.posY + this.offsetY <= obj.posY + obj.offsetY + obj.height // Obere Kante von "this" <= Untere Kante von "obj"
        );
    }

    isCollidingBlock(block, bottle) {
        if (this.checkCollisionBlock(block)) {
            this.handleBlockCollision(block, bottle);
        }
    }

    // Ausgelagerte Funktion zur Kollisionsprüfung
    checkCollisionBlock(block) {
        const blockRight = block.posX + block.offsetX + block.width - block.offsetLength;
        const blockLeft = block.posX + block.offsetX;
        const blockTop = block.posY + block.offsetY;
        const blockBottom = block.posY + block.offsetY + block.height - block.offsetHeight;

        return (
            this.charRight > blockLeft &&
            this.charLeft  < blockRight  &&
            this.charBottom > blockTop &&
            this.charTop < blockBottom
        );
    }

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

    compareOverlapBlockCollision(overlapRight, overlapLeft, overlapTop, overlapBottom, block, bottle) {
        const minOverlap = Math.min(overlapRight, overlapLeft, overlapTop, overlapBottom);
        if (minOverlap === overlapRight) {
            if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
                this.handleEnemyCollisionRight();
            } else if (this instanceof CharacterPepe) {
                this.handleRightCollision(block);
            } else if (this instanceof BottleThrown) {
                this.handleCollisionBottle(bottle);
            }
        } else if (minOverlap === overlapLeft) {
            if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
                this.handleEnemyCollisionLeft();
            } else if (this instanceof CharacterPepe) {
                this.handleLeftCollision(block);
            } else if (this instanceof BottleThrown) {
                this.handleCollisionBottle(bottle);
            }
        } else if (minOverlap === overlapTop) {
            if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
                this.handleTopCollision(block);
            } else if (this instanceof CharacterPepe) {
                this.handleTopCollision(block);
            } else if (this instanceof BottleThrown) {
                this.handleCollisionBottle(bottle);
            }
        } else if (minOverlap === overlapBottom) {
            if (this instanceof Chicken || this instanceof Chic || this instanceof Bird) {
                this.handleBottomCollision(block);
            } else if (this instanceof CharacterPepe) {
                this.handleBottomCollision(block);
            } else if (this instanceof BottleThrown) {
                this.handleCollisionBottle(bottle);
            }
        }
    }

    handleEnemyCollisionLeft() {
        this.otherDirection = true;
    }

    handleEnemyCollisionRight() {
        this.otherDirection = false;
    }

    // Funktionen zur Korrektur
    handleLeftCollision() {
        this.posX += 0.08;
        this.speed = 0;  // Stoppe die Bewegung   
    }
    
    handleRightCollision(block) {
        this.posX = block.posX + block.offsetX - this.width + this.offsetLength - this.offsetX;
        this.speed = 0;  // Stoppe die Bewegung
    }

    handleTopCollision(block) {
        this.posY = block.posY + block.offsetY - (this.height - this.offsetHeight) - this.offsetY;
        this.speedY = 0;
        this.collisionY = true;
        this.fall = false;
    }

    handleBottomCollision(block) {
        this.posY = block.posY - block.offsetY + block.height - this.offsetY;
    }

    handleCollisionBottle(bottle) {
        if (!bottle.collisionDetected) {
            bottle.character.world.startAnimationSequence(
                bottle,
                bottle.bottleSplash,
                () => bottle.character.world.handleAnimationEnd(bottle) // Ausgelagerte Funktion aufrufen
            );
        }
    }

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

    applyGravityToBottle() {
        if (!this.collisionDetected) {
            this.posY -= this.speedY;
            this.speedY -= this.acceleration;
        } else {
            this.speedY = 0;  // Geschwindigkeit bei Kollision stoppen
        }
    }

    loadImages(Array) {
        Array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
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

    moveChicken() {
        if (!this.otherDirection) {
            this.posX -= this.speed;
        } else {
            this.posX += this.speed;
        }

    }
}