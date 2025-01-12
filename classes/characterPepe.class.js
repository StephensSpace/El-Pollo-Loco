class CharacterPepe extends MovableObject {
    imagesIdle = [
        '../assets/2_character_pepe/1_idle/idle/I-1.png',
        '../assets/2_character_pepe/1_idle/idle/I-2.png',
        '../assets/2_character_pepe/1_idle/idle/I-3.png',
        '../assets/2_character_pepe/1_idle/idle/I-4.png',
        '../assets/2_character_pepe/1_idle/idle/I-5.png',
        '../assets/2_character_pepe/1_idle/idle/I-6.png'
    ]

    imagesWalk = [
        'assets/2_character_pepe/2_walk/W-21.png',
        'assets/2_character_pepe/2_walk/W-22.png',
        'assets/2_character_pepe/2_walk/W-23.png',
        'assets/2_character_pepe/2_walk/W-24.png',
        'assets/2_character_pepe/2_walk/W-25.png',
        'assets/2_character_pepe/2_walk/W-26.png'
    ]
    world;
    speed = 1;
    currentImageIdle = 0;
    currentImageWalk = 0;
    lastFrameTime = 0;
    frameIntervalIdle = 230;
    frameIntervalWalk = 100;

    constructor(keyboard) {
        super().loadImage('../assets/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesWalk);
        this.keyboard = keyboard

    }

    animate() {
        const currentTime = Date.now();
        if (!this.keyboard.rechts && !this.keyboard.links && !this.keyboard.jump) {
            setInterval(() => {
                if (currentTime - this.lastFrameTime >= this.frameIntervalIdle) {
                    this.playIdleAnimation(currentTime)
                }
            }, 200);
        }
    }

    animateWalk() {
        if (this.keyboard.rechts) { // Prüfe zuerst, ob die rechte Pfeiltaste gedrückt wird
            const currentTime = Date.now();
            this.posX += this.speed;
            if (currentTime - this.lastFrameTime >= this.frameIntervalWalk) { // Überprüfe dann die Zeitbedingungen
                this.playWalkAnimation(currentTime)
            }
        }
    }

    playIdleAnimation(currentTime) {
        let i = this.currentImageIdle % this.imagesIdle.length;
        let path = this.imagesIdle[i];
        this.img = this.images[path];
        this.currentImageIdle++;
        this.lastFrameTime = currentTime;
    }

    playWalkAnimation(currentTime) {
        let i = this.currentImageWalk % this.imagesWalk.length;
        let path = this.imagesWalk[i];
        this.img = this.images[path];
        this.currentImageWalk++;
        this.lastFrameTime = currentTime; // Setze den Zeitstempel für den nächsten Frame
    }

    jump() {

    }
}