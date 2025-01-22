class Statusbar extends DrawAbleObject {
    character;
    ImagesHealth = [
        '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../assets/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]

    ImagesSalsa = [
        '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        '../assets/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]

    ImagesCoins = [
        '../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        '../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        '../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        '../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        '../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        '../assets/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ]

    images = {};

    constructor(path, posX, posY, width, height, character) {
        super().loadImage(path);
        this.loadImages(this.ImagesHealth);
        this.loadImages(this.ImagesSalsa);
        this.loadImages(this.ImagesCoins);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.character = character;
    }

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
}