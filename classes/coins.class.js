//**Klasse für das Objekt Coins, das von pepe 
// eingesammelt werden kann
//  */
class Coins extends MovableObject {
    CoinImages = [
        'assets/8_coin/coin_1.png',
        'assets/8_coin/coin_2.png'
    ]

    images = {};
    currentImage = 0;
    lastFrameTime = 0;
    frameInterval = 500;
    collisionDetected = false;
    
//**Constructor der klasse Coins indem 
// das Bild und die Bilder für die Animation 
// geladen wird/werden */
    constructor(posX, posY = 90, width = 90, height = 90) {
        super().loadImage('assets/8_coin/coin_1.png');
        this.loadImages(this.CoinImages);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.offsetY = 28;
        this.offsetX = 29;
        this.offsetLength = 59
        this.offsetHeight = 59;
    }


}