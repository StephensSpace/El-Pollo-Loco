class Level {
    enemies;
    baseClouds;
    clouds= [];
    background;
    levelEndX;

    constructor(background, baseClouds, enemies, levelEndX) {
        this.background = background;
        this.baseClouds = baseClouds;
        this.enemies = enemies;
        this.generateClouds();
        this.levelEndX = levelEndX;
    }

    generateClouds() {
        const repetitions = 6;
        const xOffset = 720;

        for (let i = 0; i < repetitions; i++) {
            const offsetX = i * xOffset;

            this.baseClouds.forEach(cloud => {
                this.clouds.push(new Clouds(
                    cloud.speed,
                    cloud.x !== undefined ? cloud.x + offsetX : undefined,
                    cloud.y,
                    cloud.width,
                    cloud.height,
                    cloud.src
                ));
            });
        }
    }
}