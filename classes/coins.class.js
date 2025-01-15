class Coins extends MovableObject {
    CoinImages = [
        '../assets/8_coin/coin_1.png',
        '../assets/8_coin/coin_2.png'
    ]

    images = {};
    currentImage = 0;
    lastFrameTime = 0;
    frameInterval = 500;

    constructor(posX, posY = 90, width = 90, height = 90) {
        super().loadImage('../assets/8_coin/coin_1.png');
        this.loadImages(this.CoinImages);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }


}