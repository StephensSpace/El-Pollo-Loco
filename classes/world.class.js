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
        this.setWorld();
        this.checkCollisions();

    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && !this.character.energy <= 0) {
                    this.character.energy -= 5;
                    if (this.character.energy >= 10) {
                        this.character.animateHurt();
                    }
                    console.log(this.character.energy)
                }
            });
        }, 200);
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
        this.level.coins.forEach(coin => coin.animate(coin.CoinImages));
        this.level.salsa.forEach(salsa => salsa.animate(salsa.salsaImages));
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