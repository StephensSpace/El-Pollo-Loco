class Level {
    enemies;
    baseClouds;
    clouds = [];
    background;
    coins;
    salsa;
    rocks;
    levelEndX;
    endboss;

    /**
     * Erzeugt eine neue Instanz der Spielwelt mit den angegebenen Parametern.
     * @param {string} background - Der Pfad zum Hintergrundbild der Spielwelt.
     * @param {Array} baseClouds - Eine Liste von Wolkenobjekten, die die Basiswolken beschreiben.
     * @param {Array} enemies - Eine Liste von Feinden in der Spielwelt.
     * @param {number} levelEndX - Die X-Koordinate des Endes des Levels.
     * @param {Object} endboss - Der Endboss, der am Ende des Levels erscheint.
     * @param {Array} coins - Eine Liste von Münzen, die im Spiel gesammelt werden können.
     * @param {Array} salsa - Eine Liste von Salsa-Objekten im Spiel.
     * @param {Array} rocks - Eine Liste von Felsen, die die Spielwelt durchziehen.
     */

    constructor(background, baseClouds, enemies, levelEndX, endboss, coins, salsa, rocks) {
        this.background = background;
        this.baseClouds = baseClouds;
        this.enemies = enemies;
        this.generateClouds();
        this.levelEndX = levelEndX;
        this.endboss = endboss;
        this.coins = coins;
        this.salsa = salsa;
        this.rocks = rocks;
    }

    /**
     * Erzeugt die Wolken in der Spielwelt, indem die Basiswolken wiederholt und auf die X-Position verschoben werden.
     * Diese Methode fügt die generierten Wolken in das `clouds`-Array ein.
     * @returns {void}
     */
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