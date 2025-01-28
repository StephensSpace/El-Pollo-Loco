class World {
    keyboard; // Ohne das Keyboard als Parameter
    statusbar;
    character;
    level;
    canvas;
    ctx;
    cameraX;
    pauseMenu = new PauseMenu();
    endMenu = new EndMenu();
    sounds = new Sounds();
    healthbar;
    salsabar;
    selectedButtonIndex = 0;
    coinbar;
    running = true;


    constructor(canvas, statusbar) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');  // Hier wird der ctx gesetzt
        this.keyboard = new Keyboard(this.ctx, this);
        this.statusbar = statusbar;
        this.level = level1;  // Achte darauf, dass level1 korrekt definiert ist
        this.character = new CharacterPepe(this.keyboard, this);  // Hier keyboard übergeben
        this.cameraDriveDone = false;
        this.angerDone = false;
        this.WonImage = new Statusbar('../assets/9_intro_outro_screens/win/won_2.png',
            2170, 0, 690, 450)
        this.healthbar = new Statusbar(
            '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
            40, 420, 200, 50, this.character
        );
        this.salsabar = new Statusbar(
            '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            260, 420, 200, 50, this.character
        );
        this.coinbar = new Statusbar(
            '../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
            480, 420, 200, 50, this.character
        );
        this.ednbossBar = new Statusbar('../assets/7_statusbars/2_statusbar_endboss/green/green100.png',
            210, 20, 300, 50, this.character)

        this.selectedButtonIndex = 0;
        this.draw();
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
            this.character.energy -= 0.8;

            if (this.character.energy >= 10) {
                this.character.animateHurt();
            }
        }
        if (!collisionDetected) {
            this.character.hurt = false;
        }
    }

    startAnimationSequence(bottle, animationArray, onComplete) {
        let frameCount = 0;
        this.sounds.bottleBreaking.play();
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
                if (this.level.endboss.isColliding(bottle)) {
                    setTimeout(() => {
                        bottle.collisionDetected = true;
                        this.level.endboss.energy -= 33.6;

                        this.level.endboss.animate(this.level.endboss.endbossHurt);
                        if (this.level.endboss.energy <= 0) {
                            this.level.endboss.dead = true;
                        }
                    }, 50);
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
                this.sounds.coinSound.play();
            }
        });
        this.level.coins = this.level.coins.filter(coin => !coin.collisionDetected);
    }

    checkSalsaCollision() {
        this.level.salsa.forEach(salsa => {
            if (this.character.isColliding(salsa) && !salsa.collisionDetected) {
                salsa.collisionDetected = true;
                this.character.bottleCounter += 10;
                this.sounds.bottle.play();
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
        this.level.enemies.forEach(enemy => {
            if (enemy.dead) {
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 1200);
            }
        });
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
        if (!this.level.endboss.dead) {
            this.character.startThrow();
            this.character.animateIdle();
        }
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
    setCamera() {
        if (this.character.posX >= 295) {
            this.character.cameraX(295);
        }
    }

    playEndbossAnimation() {
        if (this.level.endboss.posX >= 2525 && !this.angerDone) {
            this.level.endboss.animate(this.level.endboss.endbossWalking);
            this.level.endboss.moveChicken();
        } else if (!this.angerDone) {
            this.level.endboss.animate(this.level.endboss.endbossAngry);
            setTimeout(() => {
                this.angerDone = true;
            }, 6000);
        }
    }

    checkEndbossTrigger() {
        if (this.cameraDriveDone) {
            this.playEndbossAnimation();
        }
    }

    checkCharacterPosX() {
        if (!(this.character.posX >= 2070) && !this.cameraDriveDone) {
            this.characterMovements();
        }
        this.checkEndbossTrigger();

        if (this.angerDone) {
            this.characterMovements();
            this.level.endboss.endbossFight();
        }

    }

    GameNotPaused() {
        this.level.clouds.forEach(cloud => cloud.moveClouds());
        this.chickenMovement();
        this.character.checkDeath();
        this.checkCharacterPosX();
        this.checkAllCollisions();
        this.deleteDeadEnemies();
        this.ednbossBar.setBossHealth();
        this.coinbar.setCoin();
        this.healthbar.setHealth();
        this.salsabar.setSalsa();
        this.level.coins.forEach(coin => coin.animate(coin.CoinImages));
        this.level.salsa.forEach(salsa => salsa.animate(salsa.salsaImages));
        this.drawObjectsToWorld();
    }

    checkPauseStatus() {
        if (!this.keyboard.pause) {
            this.GameNotPaused();
        } else {
            this.drawObjectsToWorld();
        }
    }
    draw() {
        if (this.running) {
            this.setCamera();
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.cameraX, 0);
            this.checkPauseStatus();
            this.ctx.translate(-this.cameraX, 0);
            let self = this;
            requestAnimationFrame(function () {
                self.draw();
            });
        }
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
                    }
                }
            });
        }
    }

    addPauseMenu() {
        this.addToMap(this.pauseMenu);
        this.updateSoundBtnText();
        this.pauseMenu.startBtn.draw(this.ctx)
        this.pauseMenu.soundBtn.draw(this.ctx);
        this.pauseMenu.controllsBtn.draw(this.ctx);
        this.ctx.font = '28px Comic Sans MS';  // Comic Sans MS als Schriftart
        this.ctx.fillStyle = 'gold';  // Goldene Farbe
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Pause', 360, 160);
        this.ctx.font = '24px Comic Sans MS';
        this.setButtons();
    }

    setButtons() {
        this.keyboard.buttons.forEach((text, index) => {
            const buttonX = 360;
            const buttonY = 210 + index * 50;
            this.ctx.fillStyle = index === this.keyboard.selectedButtonIndex ? 'red' : 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(text, buttonX, buttonY);
        });
    }

    updateSoundBtnText() {
        this.keyboard.buttons[1] = SoundOn ? 'Sound On' : 'Sound Off';
    }
    allArraysToDraw() {
        this.addObjectsToWorld(this.level.background);
        this.addObjectsToWorld(this.level.clouds);
        this.addObjectsToWorld(this.level.salsa);
        this.addObjectsToWorld(this.level.coins);
        this.addObjectsToWorld(this.level.enemies);
        this.addObjectsToWorld(this.level.rocks);
        this.addObjectsToWorld(this.character.Bottles)
    }
    drawObjectsToWorld() {
        this.allArraysToDraw();
        this.addToMap(this.level.endboss)
        this.addToMap(this.character);

        if (this.level.endboss.deadAnimationDone) {
            this.addToMap(this.WonImage)
        }
        this.ctx.translate(-this.cameraX, 0);
        if (this.keyboard.pause) {
            this.addPauseMenu();
        }
        if (this.angerDone) {
            this.addToMap(this.ednbossBar);
        }
        if (this.level.endboss.Won || this.character.Lost) {
            this.addToMap(this.endMenu);
            this.addToMap(this.endMenu.Yes);
            this.addToMap(this.endMenu.No);
        }
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