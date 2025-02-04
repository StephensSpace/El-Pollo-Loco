class World {
    keyboard;
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

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.level = level1;
        this.keyboard = new Keyboard(); 
        this.keyboard.world = this;
        this.character = new CharacterPepe(this.keyboard, this);
        this.keyboard.world.character = this.character;
        this.cameraDriveDone = false;
        this.angerDone = false;
        this.startHurtAnimation = false;
        this.WonImage = new Statusbar('assets/9_intro_outro_screens/win/won_2.png',
            2170, 0, 690, 450)
        this.LostImage = new Statusbar('assets/9_intro_outro_screens/game_over/game over.png',
            0, 0, 720, 480)
        this.healthbar = new Statusbar('assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
            100, 410, 160, 50, this.character);
        this.salsabar = new Statusbar('assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            280, 410, 160, 50, this.character);
        this.coinbar = new Statusbar('assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
            460, 410, 160, 50, this.character);
        this.ednbossBar = new Statusbar('assets/7_statusbars/2_statusbar_endboss/green/green100.png',
            210, 20, 300, 50, this.character);
        this.selectedButtonIndex = 0;
        this.draw();
    }

    startAnimationSequence(bottle, animationArray, onComplete) {
        let frameCount = 0;
        if (SoundOn) {
            this.sounds.bottleBreaking.play();
        }
        this.runAnimationInterval(bottle, animationArray, frameCount, onComplete);
    }
    
    runAnimationInterval(bottle, animationArray, frameCount, onComplete) {
        const interval = setInterval(() => {
            bottle.animate(animationArray);
            frameCount++;
            bottle.speed = 0.0002;
            bottle.speedY = 0;
            if (frameCount >= 6) {
                clearInterval(interval);
                onComplete();
                this.cleanupAfterAnimation(bottle);
            }
        }, 20);
    }
    
    cleanupAfterAnimation(bottle) {
        setTimeout(() => {
            this.level.endboss.hurt = false;
            this.character.Bottles = this.character.Bottles.filter(b => b !== bottle);
        }, 500);
    }

    checkBottleCollision() {
        this.character.Bottles.forEach(bottle => {
            if (bottle.collisionDetected) return;
            this.level.enemies.some(enemy => this.checkEnemyCollision(bottle, enemy));
            this.checkEndbossCollision(bottle);
            if (bottle.posY >= 360) bottle.collisionDetected = true;
        });
    }

    checkEnemyCollision(bottle, enemy) {
        if (enemy.isColliding(bottle)) {
            setTimeout(() => {
                bottle.collisionDetected = true;
                enemy.dead = true;
                if (SoundOn) {
                    this.sounds.chickenDead.play();
                }
            }, 50);
            return true;
        }
        return false;
    }

    checkEndbossCollision(bottle) {
        if (this.level.endboss.isColliding(bottle)) {
            setTimeout(() => {
                bottle.collisionDetected = true;
                this.level.endboss.energy -= 3.6;
                this.level.endboss.hurt = true;
                if (this.level.endboss.energy <= 0) this.level.endboss.dead = true;
            }, 100);
        }
    }

    checkCoinCollision() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin) && !coin.collisionDetected) {
                coin.collisionDetected = true;
                this.character.coinCounter += 5;
                if (SoundOn) {
                    this.sounds.coinSound.play();
                }
            }
        });
        this.level.coins = this.level.coins.filter(coin => !coin.collisionDetected);
    }

    checkSalsaCollision() {
        this.level.salsa.forEach(salsa => {
            if (this.character.isColliding(salsa) && !salsa.collisionDetected) {
                salsa.collisionDetected = true;
                this.character.bottleCounter += 10;
                if (SoundOn) {
                    this.sounds.bottle.play();
                }
            }
        });
        this.level.salsa = this.level.salsa.filter(salsa => !salsa.collisionDetected);
    }

    handleAnimationEnd(bottle) {
        bottle.collisionDetected = true;

    }

    deleteDeadEnemies() {
        this.level.enemies.forEach(enemy => {
            if (enemy.dead) {
                setTimeout(() => {
                    this.level.enemies = this.level.enemies.filter(e => e !== enemy);
                }, 800);
            }
        });
    }

    checkAllCollisions() {
        this.checkBottle();
        this.character.checkCollisionsEnemy();
        this.character.checkCollisionsBlock();
        this.checkCoinCollision();
        this.checkSalsaCollision();
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

    GameNotPaused() {
        this.level.clouds.forEach(cloud => cloud.moveClouds());
        this.chickenMovement();
        this.character.checkDeath();
        this.character.checkCharacterPosX();
        this.checkAllCollisions();
        this.deleteDeadEnemies();
        this.setStatusBars();
        this.level.coins.forEach(coin => coin.animate(coin.CoinImages));
        this.level.salsa.forEach(salsa => salsa.animate(salsa.salsaImages));
        this.drawObjectsToWorld();
    }

    setStatusBars() {
        this.ednbossBar.setBossHealth();
        this.coinbar.setCoin();
        this.healthbar.setHealth();
        this.salsabar.setSalsa();
    }

    checkPauseStatus() {
        if (!this.keyboard.pause) {
            this.GameNotPaused();
        } else {
            this.drawObjectsToWorld();
        }
    }

    draw() {
        if (this.running && this.character) {
            this.character.setCamera();
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
        if (this.character.Bottles.length === 0) return;
        this.character.Bottles.forEach(bottle => {
            if (bottle.collisionDetected) {
                this.handleBottleCollision(bottle);
            } else {
                this.handleFlyingBottle(bottle);
            }
        });
    }

    handleFlyingBottle(bottle) {
        bottle.applyGravityToBottle();
        bottle.bottleFly();
        bottle.animate(bottle.bottleFlying);
    }

    handleBottleCollision(bottle) {
        if (!bottle.animationStarted) {
            this.startAnimationSequence(bottle, bottle.bottleSplash, () => {
                bottle.collisionDetected = true;
                bottle.animationStarted = true;
            });
        }
    }

    addPauseMenu() {
        this.addToMap(this.pauseMenu);
        this.updateSoundBtnText();
        this.pauseMenu.startBtn.draw(this.ctx)
        this.pauseMenu.soundBtn.draw(this.ctx);
        this.pauseMenu.controllsBtn.draw(this.ctx);
        this.ctx.font = '28px Comic Sans MS';
        this.ctx.fillStyle = 'gold';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Pause', 360, 160);
        this.ctx.font = '24px Comic Sans MS';
        this.keyboard.setButtons();
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

    updateEndMenuButtonTextColor() {
        const selectedButton = this.endMenu.buttons[this.keyboard.selectedEndMenuButtonIndex];
        if (selectedButton) {
            selectedButton.text.color = 'red';
        }
        this.endMenu.buttons.forEach((button, index) => {
            if (index !== this.keyboard.selectedEndMenuButtonIndex) {
                button.text.color = 'white';
            }
        });
    }

    deadAnimationCheck() {
        if (this.level.endboss.deadAnimationDone) {
            this.addToMap(this.WonImage)
        }
    }

    statusCheck() {
        if (this.keyboard.pause) {
            this.addPauseMenu();
        }
        if (this.angerDone) {
            this.addToMap(this.ednbossBar);
        }
        if (!this.character.alive) {
            this.addToMap(this.LostImage)
        }
    }

    looseWinCheck() {
        if (this.level.endboss.Won || this.character.Lost) {
            this.addToMap(this.endMenu);
            this.addToMap(this.endMenu.Yes);
            this.addToMap(this.endMenu.No);
            if (this.level.endboss.Won) {
                this.drawText(this.endMenu.winText);
            } else {
                this.drawText(this.endMenu.loseText);
            }
            this.updateEndMenuButtonTextColor();
            this.endMenu.buttons.forEach(button => {
                this.drawText(button.text);
            });
        }
    }

    addStatusbars() {
        this.addToMap(this.healthbar);
        this.addToMap(this.salsabar);
        this.addToMap(this.coinbar);
    }

    drawObjectsToWorld() {
        this.allArraysToDraw();
        this.addToMap(this.level.endboss);
        this.addToMap(this.character);
        this.deadAnimationCheck();
        this.ctx.translate(-this.cameraX, 0);
        this.statusCheck();
        this.looseWinCheck();
        this.addStatusbars();
        this.ctx.translate(this.cameraX, 0);
    }

    drawText(textObj) {
        if (!textObj) return;
        this.ctx.font = textObj.font;
        this.ctx.fillStyle = textObj.color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(textObj.text, textObj.posX, textObj.posY);
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