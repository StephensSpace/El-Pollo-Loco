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
        this.setWorld();
    }

    checkCollisionsEnemy() {
        setInterval(() => {
            let collisionDetected = false;
        
            // Überprüfe Kollision mit Gegnern
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && this.character.energy > 0) {
                    collisionDetected = true;
                    this.character.hurt = true;
                    this.character.energy -= 2;      
                    if (this.character.energy >= 10) {
                        this.character.animateHurt();
                    }
                    console.log(this.character.energy);
                }
            });
        
            // Überprüfe Kollision mit dem Endboss
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
        }, 200);
    }

    checkCollisionsBlock() {
        setInterval(() => {
            this.level.rocks.forEach(rock => {
                this.character.isCollidingBlock(rock);
    
                // Iteriere durch alle Feinde und prüfe die Kollision für jeden
                this.level.enemies.forEach(enemy => {
                    enemy.isCollidingBlock(rock);
                });
            });
        }, 1000 / 60); // 60 FPS
    }
    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX, 0);
        this.level.clouds.forEach(cloud => cloud.moveClouds());
        this.level.enemies.forEach(enemy => enemy.moveChicken());
        this.level.enemies.forEach(enemy => enemy.animate(enemy.imagesWalking));
        if (this.character.Bottles.length !== 0) {
            this.character.Bottles.forEach(bottle => bottle.animate(bottle.bottleFlying));
            this.character.Bottles.forEach(bottle => bottle.applyGravity(bottle.bottleFlying));
        }
        this.level.coins.forEach(coin => coin.animate(coin.CoinImages));
        this.level.salsa.forEach(salsa => salsa.animate(salsa.salsaImages));
        //this.checkBottle()
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