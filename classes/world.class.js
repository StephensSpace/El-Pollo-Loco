class World {

    character = new CharacterPepe();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Clouds(),
        new Clouds(360, -10, undefined, undefined, 'assets/5_background/layers/4_clouds/2.png'),
        new Clouds(120, 30, undefined, undefined, 'assets/5_background/layers/4_clouds/2.png')
    ];
    background = new Background();
    air = new Air();
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.drawImage(this.air.img, this.air.posX, this.air.posY, this.air.width, this.air.height)
        this.ctx.drawImage(this.background.img, this.background.posX, this.background.posY, this.background.width, this.background.height)
        this.clouds.forEach(clouds => { this.ctx.drawImage(clouds.img, clouds.posX, clouds.posY, clouds.width, clouds.height) })
        this.ctx.drawImage(this.character.img, this.character.posX, this.character.posY, this.character.width, this.character.height)
        this.enemies.forEach(enemy => { this.ctx.drawImage(enemy.img, enemy.posX, enemy.posY, enemy.width, enemy.height) })
        



        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }
}