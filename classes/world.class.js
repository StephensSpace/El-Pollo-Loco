class World {
    keyboard;
    character = new CharacterPepe(keyboard);
    level = level1;
    canvas;
    ctx;
    cameraX;
    sounds = new Sounds();
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.deleteDeadEnemies();
        this.setWorld();
    }

    checkCollisionsEnemy() {
            let collisionDetected = false;
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.energy > 0 && !enemy.dead) {
                    collisionDetected = true;
                    this.character.hurt = true;
                    this.character.energy -= 2;
                    if (this.character.energy >= 10) {
                        this.character.animateHurt();
                    }
                    console.log(this.character.energy);
                }
            });
            if (this.character.isColliding(this.level.endboss)) {
                collisionDetected = true;
                this.character.hurt = true;
                this.character.energy -= 2;

                if (this.character.energy >= 10) {
                    this.character.animateHurt();
                }
                console.log(this.character.energy);
            }
            if (!collisionDetected) {
                this.character.hurt = false;
            }
    }

    startAnimationSequence(bottle, animationArray, onComplete) {
        let frameCount = 0; // Anzahl der Frames
        const interval = setInterval(() => {
            bottle.animate(animationArray); // Animation ausführen
            frameCount++;
            bottle.speed = 0.00002;
            bottle.speedY = 0;
            if (frameCount >= 6) { // Animation beendet
                clearInterval(interval); // Intervall stoppen
                onComplete(); // Kollision "abschließen"
                setTimeout(() => {
                    this.character.Bottles = this.character.Bottles.filter(b => b !== bottle);
                }, 500);
            }
        }, 20); // Timing pro Frame
    }

    checkBottleCollision() {
            this.character.Bottles.forEach(bottle => {
                if (!bottle.collisionDetected) {
                    this.level.enemies.forEach(enemy => {
                        if (enemy.isColliding(bottle)) {
                            setTimeout(() => {
                                bottle.collisionDetected = true;
                                enemy.dead = true; 
                            }, 150);
                        }
                    });
                    if (bottle.posY >= 360) {
                        bottle.collisionDetected = true;
                    }
                }
            });
    }


    

    handleAnimationEnd(bottle) {
        bottle.collisionDetected = true;

    }

    checkCollisionsBlock() {
            this.level.rocks.forEach(rock => {
                this.character.isCollidingBlock(rock);

                if (this.character.Bottles.length > 0) {
                    this.character.Bottles.forEach(bottle => {
                        bottle.isCollidingBlock(rock, bottle);
                    });
                }
                this.level.enemies.forEach(enemy => {
                    enemy.isCollidingBlock(rock);
                });
            });
    }

    deleteDeadEnemies() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (enemy.dead) {
                    setTimeout(() => {
                        this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                    }, 1200);
                }
            });
        }, 100);
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.level.clouds.forEach(cloud => cloud.moveClouds());
        this.handleChickenMovement();
        this.checkBottle();
        this.level.coins.forEach(coin => coin.animate(coin.CoinImages));
        this.level.salsa.forEach(salsa => salsa.animate(salsa.salsaImages));
        this.checkCollisionsEnemy();
        this.checkCollisionsBlock();
        this.character.startThrow();
        this.character.animateIdle();
        this.character.animateMovement();
        this.character.applyGravity();
        this.character.animateJump();
        this.drawObjectsToWorld();
        if (this.character.posX >= 2500) {
            this.level.endboss.animate(this.level.endboss.endbossAngry);
            this.level.endboss.moveChicken();
        }
        this.ctx.translate(-this.cameraX, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    handleChickenMovement() {
        this.level.enemies.forEach(enemy => {
            if (!enemy.dead) {
                if (enemy instanceof Chicken || enemy instanceof Chic) {
                    enemy.moveChicken();
                    enemy.applyGravity();
                    enemy.animate(enemy.imagesWalking);
                }
                if (enemy instanceof Bird) {
                    enemy.moveChicken();
                    enemy.animate(enemy.imagesWalking);
                }
            }

        });
    }

    checkBottle() {
        this.checkBottleCollision();
        if (this.character.Bottles.length !== 0) {
            this.character.Bottles.forEach(bottle => {
                if (!bottle.collisionDetected) {
                    bottle.applyGravityToBottle();
                    bottle.bottleFly();
                    bottle.animate(bottle.bottleFlying);
                } else {
            
                    if (!bottle.animationStarted) {
                        this.startAnimationSequence(bottle, bottle.bottleSplash, () => {
                            bottle.collisionDetected = true;
                            bottle.animationStarted = true;
                        });
                         // Flag setzen, um Animation nur einmal zu starten
                    }
                }
            });
        }
    }

    drawObjectsToWorld() {
        this.addObjectsToWorld(this.level.background);
        this.addObjectsToWorld(this.level.clouds);
        this.addObjectsToWorld(this.level.salsa);
        this.addObjectsToWorld(this.level.coins);
        this.addObjectsToWorld(this.level.enemies);
        this.addObjectsToWorld(this.level.rocks);
        if (this.character.Bottles.length > 0) {
            this.addObjectsToWorld(this.character.Bottles)
        };
        this.addToMap(this.level.endboss)
        this.addToMap(this.character);

    }

    addObjectsToWorld(obj) {
        if(obj.length > 0)
        obj.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(obj) {
        if (obj.otherDirection) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0)
            this.ctx.scale(-1, 1);
            obj.posX = obj.posX * -1;
        }
        obj.draw(this.ctx);
        obj.drawHitbox(this.ctx);
        if (obj.otherDirection) {
            obj.posX = obj.posX * -1;
            this.ctx.restore();
        }
    }
}