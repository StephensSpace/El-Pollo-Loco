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
        this.checkCollisionsEnemy();
        this.checkBottleCollision();
        this.deleteDeadEnemies();
        this.setWorld();
    }

    checkCollisionsEnemy() {
        setInterval(() => {
            let collisionDetected = false;
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.energy > 0 && !this.enemy.dead) {
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
        }, 50);
    }

    checkBottleCollision() {
        setInterval(() => {
            this.character.Bottles.forEach(bottle => {
                if (!bottle.collisionDetected) {
                    this.level.enemies.forEach(enemy => {
                        if (enemy.isColliding(bottle)) {
                            setTimeout(() => {
                                this.startAnimationSequence(
                                    bottle,
                                    bottle.bottleSplash,
                                    () => this.handleAnimationEnd(bottle) // Ausgelagerte Funktion aufrufen
                                );
                                enemy.dead = true; // Gegner als "tot" markieren
                            }, 10); // Verzögerung vor Start der Animation
                        }
                    });
                    if (bottle.posY >= 290) {
                        setTimeout(() => {
                            this.startAnimationSequence(
                                bottle,
                                bottle.bottleSplash,
                                () => this.handleAnimationEnd(bottle) // Ausgelagerte Funktion aufrufen
                            );
                        }, 10);
                    }
                }
            });
        }, 300);
    }

    startAnimationSequence(bottle, animationArray, onComplete) {
        let frameCount = 0; // Anzahl der Frames
        const interval = setInterval(() => {
            bottle.animate(animationArray); // Animation ausführen
            frameCount++;
            if (frameCount >= 6) { // Animation beendet
                clearInterval(interval); // Intervall stoppen
                onComplete(); // Kollision "abschließen"
                setTimeout(() => {
                    this.character.Bottles = this.character.Bottles.filter(b => b !== bottle);
                }, 1200);
            }
        }, 20); // Timing pro Frame
    }

    handleAnimationEnd(bottle) {
        bottle.collisionDetected = true;
        bottle.speed = 0.002;
        bottle.speedY = 0;
        
    }

    checkCollisionsBlock() {
        setInterval(() => {
            this.level.rocks.forEach(rock => {
                this.character.isCollidingBlock(rock);
                this.character.Bottles.forEach(bottle => {
                    bottle.isCollidingBlock(rock, bottle);
                });
                this.level.enemies.forEach(enemy => {
                    enemy.isCollidingBlock(rock);
                });
            });
        }, 1000 / 60); // 60 FPS
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
                enemy.moveChicken();
                enemy.animate(enemy.imagesWalking);
            }
        });
    }

    checkBottle() {
        if (this.character.Bottles.length !== 0) {
            this.character.Bottles.forEach(bottle => {
                if (!bottle.collisionDetected) { // Nur für Flaschen, die noch nicht kollidiert sind
                    bottle.animate(bottle.bottleFlying);
                    bottle.applyGravity(bottle.bottleFlying);
                } else {
                    // Die Animation soll nur einmal abgespielt werden, daher hier die eigene Logik für die einmalige Animation
                    if (!bottle.animationStarted) {
                        this.startAnimationSequence(bottle, bottle.bottleSplash, () => {
                            bottle.collisionDetected = true; // Kollision-Status nach der Animation setzen
                        });
                        bottle.animationStarted = true; // Flag setzen, um Animation nur einmal zu starten
                    }
                }
            });
        }
    }

    drawObjectsToWorld() {
        this.addObjectsToWorld(this.level.background);
        this.addObjectsToWorld(this.character.Bottles);
        this.addObjectsToWorld(this.level.clouds);
        this.addObjectsToWorld(this.level.enemies);
        this.addObjectsToWorld(this.level.coins);
        this.addObjectsToWorld(this.level.salsa);
        this.addObjectsToWorld(this.level.rocks);
        this.addToMap(this.level.endboss)
        this.addToMap(this.character);

    }

    addObjectsToWorld(obj) {
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