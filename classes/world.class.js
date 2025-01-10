class World {

    character = new CharacterPepe();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Clouds(0.3),
        new Clouds(undefined, 360, -10, undefined, undefined, 'assets/5_background/layers/4_clouds/2.png'),
        new Clouds(0.3, 300, -20, 260, 270),
        new Clouds(0.3, 120, 30, undefined, undefined, 'assets/5_background/layers/4_clouds/2.png'),
        new Clouds(undefined, 800, 40),
        new Clouds(undefined, 720, 0, undefined, undefined, 'assets/5_background/layers/4_clouds/2.png')
    ];
    background = [
        new Air(),
        new Background('assets/5_background/layers/3_third_layer/1.png'),
        new Background('assets/5_background/layers/2_second_layer/1.png'),
        new Background('assets/5_background/layers/1_first_layer/1.png'),
    ]
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.clouds.forEach(cloud => cloud.moveClouds());
        this.enemies.forEach(enemy => enemy.moveChicken());

        this.addObjectsToWorld(this.background);
        this.addObjectsToWorld(this.clouds);
        this.addToMap(this.character);
        this.addObjectsToWorld(this.enemies);

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
        this.ctx.drawImage(obj.img, obj.posX, obj.posY, obj.width, obj.height)
    }
}