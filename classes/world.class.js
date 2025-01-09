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
    background = [
        new Air(),
        new Background(),
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