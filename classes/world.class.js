class World {
    keyboard;
    statusbar;
    character = new CharacterPepe(keyboard);
    level = level1;
    canvas;
    ctx;
    cameraX;
    sounds = new Sounds();
    healthbar = new Statusbar('./assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        40, 420, 200, 50,
        this.character);
    salsabar = new Statusbar('../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        260, 420, 200, 50,
        this.character);
    coinbar = new Statusbar('../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        480, 420, 200, 50,
        this.character);
    constructor(canvas, keyboard, statusbar) {
        this.ctx = canvas.getContext('2d');
        this.statusbar = statusbar;
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
                this.character.energy -= 0.5;
                if (this.character.energy >= 10) {
                    this.character.animateHurt();
                }
                console.log(this.character.energy);
            }
        });
        if (this.character.isColliding(this.level.endboss)) {
            collisionDetected = true;
            this.character.hurt = true;
            this.character.energy -= 0.001;

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
            bottle.speed = 0.0002;
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
                for (let enemy of this.level.enemies) {
                    if (enemy.isColliding(bottle)) {
                        setTimeout(() => {
                            bottle.collisionDetected = true;
                            enemy.dead = true;
                        }, 50);
                        break;
                    }
                }
                if (bottle.posY >= 360) {
                    bottle.collisionDetected = true;
                }
            }
        });
    }

    checkCoinCollision() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin) && !coin.collisionDetected) {
                coin.collisionDetected = true;
                this.character.coinCounter += 5;
                //play sound
            }
        });
        this.level.coins = this.level.coins.filter(coin => !coin.collisionDetected);
    }

    checkSalsaCollision() {
        this.level.salsa.forEach(salsa => {
            if (this.character.isColliding(salsa) && !salsa.collisionDetected) {
                salsa.collisionDetected = true;
                this.character.bottleCounter += 10;
                //play sound
            }
        });
        this.level.salsa = this.level.salsa.filter(salsa => !salsa.collisionDetected);
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

    checkAllCollisions() {
        this.checkBottle();
        this.checkCollisionsEnemy();
        this.checkCollisionsBlock();
        this.checkCoinCollision();
        this.checkSalsaCollision();
    }

    characterMovements() {
        this.character.startThrow();
        this.character.animateIdle();
        this.character.animateMovement();
        this.character.applyGravity();
        this.character.animateJump();
    }

    chickenMovement() {
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

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.level.clouds.forEach(cloud => cloud.moveClouds());
        this.chickenMovement();
        this.characterMovements();
        this.checkAllCollisions();
        this.coinbar.setCoin();
        this.healthbar.setHealth();
        this.salsabar.setSalsa();
        this.level.coins.forEach(coin => coin.animate(coin.CoinImages));
        this.level.salsa.forEach(salsa => salsa.animate(salsa.salsaImages));
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
        this.addObjectsToWorld(this.character.Bottles)
        this.addToMap(this.level.endboss)
        this.addToMap(this.character);
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.healthbar);
        this.addToMap(this.salsabar);
        this.addToMap(this.coinbar);
        this.ctx.translate(this.cameraX, 0);
    }

    addObjectsToWorld(obj) {
        if (obj.length > 0)
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