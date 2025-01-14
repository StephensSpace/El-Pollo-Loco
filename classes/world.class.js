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

    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.cameraX,0);
        this.level.clouds.forEach(cloud => cloud.moveClouds());
        this.level.enemies.forEach(enemy => enemy.moveChicken() );
        this.level.enemies.forEach(enemy => enemy.animate());
        this.character.animate();
        this.character.animateWalk();
        this.addObjectsToWorld(this.level.background);
        this.addObjectsToWorld(this.level.clouds);
        this.addObjectsToWorld(this.level.enemies);
        this.addToMap(this.level.endboss)
        this.addToMap(this.character);
        if(this.character.posX >= 2500) {
            this.level.endboss.animate(this.level.endboss.endbossAngry);
            this.level.endboss.moveChicken();
        }
        this.ctx.translate(-this.cameraX,0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToWorld(obj) {
        obj.forEach(o => {
            this.addToMap(o)
        });
    }

    addToMap(obj) {
        if(obj.otherDirection) {
            this.ctx.save();
            this.ctx.translate(obj.width, 0)
            this.ctx.scale(-1,1);
            obj.posX = obj.posX * -1;
        }
        this.ctx.drawImage(obj.img, obj.posX, obj.posY, obj.width, obj.height)
        if(obj.otherDirection) {
            obj.posX = obj.posX * -1;
            this.ctx.restore();
        }
    }
}