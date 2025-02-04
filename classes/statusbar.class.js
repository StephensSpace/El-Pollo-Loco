/**
 * Statusbar Klasse verwaltet die Darstellung der Statusanzeige für den Charakter.
 * Sie zeigt Gesundheitsstatus, Salsa-Flaschenstatus und Münzenstand an und kann auch die Gesundheit des Endbosses anzeigen.
 */
class Statusbar extends DrawAbleObject {
    character;
    
    // Definiert die Bildpfade für die Gesundheitsanzeige.
    ImagesHealth = [
        'assets/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    // Definiert die Bildpfade für die Salsa-Flasche.
    ImagesSalsa = [
        'assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]

    // Definiert die Bildpfade für die Münzenanzeige.
    ImagesCoins = [
        'assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ]

    // Definiert die Bildpfade für die Endboss-Gesundheitsanzeige.
    ImagesBossHealth = [
        'assets/7_statusbars/2_statusbar_endboss/green/green0.png',
        'assets/7_statusbars/2_statusbar_endboss/green/green20.png',
        'assets/7_statusbars/2_statusbar_endboss/green/green40.png',
        'assets/7_statusbars/2_statusbar_endboss/green/green60.png',
        'assets/7_statusbars/2_statusbar_endboss/green/green80.png',
        'assets/7_statusbars/2_statusbar_endboss/green/green100.png'
    ]

    // Objekt, das die geladenen Bilder speichert.
    images = {};

    /**
     * Konstruktor für die Statusbar.
     * Lädt die Bilder und initialisiert die Position sowie Größe der Statusbar.
     * 
     * @param {string} path Der Pfad zum Hauptbild der Statusbar.
     * @param {number} posX Die x-Position der Statusbar.
     * @param {number} posY Die y-Position der Statusbar.
     * @param {number} width Die Breite der Statusbar.
     * @param {number} height Die Höhe der Statusbar.
     * @param {Object} character Der Charakter, dessen Status angezeigt werden soll.
     */
    constructor(path, posX, posY, width, height, character) {
        super().loadImage(path);
        this.loadImages(this.ImagesHealth);
        this.loadImages(this.ImagesSalsa);
        this.loadImages(this.ImagesCoins);
        this.loadImages(this.ImagesBossHealth);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.character = character;
    }

    /**
     * Setzt das Gesundheitsbild basierend auf der aktuellen Energie des Charakters.
     */
    setHealth() {
        if (this.character.energy >= 85) {
            this.img = this.images[this.ImagesHealth[5]]
        } else if (this.character.energy >= 65) {
            this.img = this.images[this.ImagesHealth[4]]
        } else if (this.character.energy >= 45) {
            this.img = this.images[this.ImagesHealth[3]]
        } else if (this.character.energy >= 25) {
            this.img = this.images[this.ImagesHealth[2]]
        } else if (this.character.energy >= 5) {
            this.img = this.images[this.ImagesHealth[1]]
        } else if (this.character.energy < 5) {
            this.img = this.images[this.ImagesHealth[0]]
        }
    }

    /**
     * Setzt das Salsa-Flaschenbild basierend auf der Anzahl der Salsa-Flaschen des Charakters.
     */
    setSalsa() {
        if (this.character.bottleCounter >= 50) {
            this.img = this.images[this.ImagesSalsa[5]]
        } else if (this.character.bottleCounter >= 40) {
            this.img = this.images[this.ImagesSalsa[4]]
        } else if (this.character.bottleCounter >= 30) {
            this.img = this.images[this.ImagesSalsa[3]]
        } else if (this.character.bottleCounter >= 20) {
            this.img = this.images[this.ImagesSalsa[2]]
        } else if (this.character.bottleCounter >= 10) {
            this.img = this.images[this.ImagesSalsa[1]]
        } else if (this.character.bottleCounter < 1) {
            this.img = this.images[this.ImagesSalsa[0]]
        }
    }

    /**
     * Setzt das Münzenbild basierend auf der Anzahl der gesammelten Münzen des Charakters.
     */
    setCoin() {
        if (this.character.coinCounter >= 100) {
            this.img = this.images[this.ImagesCoins[5]]
        } else if (this.character.coinCounter >= 80) {
            this.img = this.images[this.ImagesCoins[4]]
        } else if (this.character.coinCounter >= 60) {
            this.img = this.images[this.ImagesCoins[3]]
        } else if (this.character.coinCounter >= 40) {
            this.img = this.images[this.ImagesCoins[2]]
        } else if (this.character.coinCounter >= 20) {
            this.img = this.images[this.ImagesCoins[1]]
        } else if (this.character.coinCounter < 20) {
            this.img = this.images[this.ImagesCoins[0]]
        }
    }

    /**
     * Setzt das Endboss-Gesundheitsbild basierend auf der aktuellen Energie des Endbosses.
     */
    setBossHealth() {
        if (this.character.world.level.endboss.energy >= 100) {
            this.img = this.images[this.ImagesBossHealth[5]]
        } else if (this.character.world.level.endboss.energy >= 80) {
            this.img = this.images[this.ImagesBossHealth[4]]
        } else if (this.character.world.level.endboss.energy >= 60) {
            this.img = this.images[this.ImagesBossHealth[3]]
        } else if (this.character.world.level.endboss.energy >= 40) {
            this.img = this.images[this.ImagesBossHealth[2]]
        } else if (this.character.world.level.endboss.energy >= 20) {
            this.img = this.images[this.ImagesBossHealth[1]]
        } else if (this.character.world.level.endboss.energy < 20) {
            this.img = this.images[this.ImagesBossHealth[0]]
        }
    }
}