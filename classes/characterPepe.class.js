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
    soundWalking = new Audio('../audio/pepeRunning.wav')
    images = {};
    world;
    speed = 30;
    currentImageIdle = 0;
    currentImageWalk = 0;
    lastFrameTime = 0;
    frameIntervalIdle = 330;
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
            this.soundWalking.pause();
            setInterval(() => {
                if (currentTime - this.lastFrameTime >= this.frameIntervalIdle) {
                    this.playIdleAnimation(currentTime)
                }
            }, 200);
        }
    }

    animateWalk() {
        if (this.keyboard.rechts) {
            this.walkRight();
            this.checkWalkAnimationTime();
            this.soundWalking.play();
        }
        if (this.keyboard.links) {
            this.walkLeft();
            this.checkWalkAnimationTime();
            this.soundWalking.play();
        }
        if (this.posX >= 295) {
            this.cameraX(295);
        }
    }

    checkWalkAnimationTime() {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameIntervalWalk) {
            this.playWalkAnimation(currentTime)
        }
    }

    walkRight() {
        this.otherDirection = false;
        const newPosition = this.posX += this.speed;
        if (newPosition >= level1.levelEndX) {
            this.posX = level1.levelEndX;
        } else {
            this.posX = newPosition;
        }
    }

    walkLeft() {
        this.otherDirection = true;
        const newPosition = this.posX -= this.speed;
        if (newPosition <= -10) {
            this.posX = -10;
        } else {
            this.posX = newPosition;
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
        this.lastFrameTime = currentTime;
    }

    cameraX(versatz) {
        setInterval(() => {
            const newCameraX = -this.posX + versatz;
            if (newCameraX > 0) {
                this.world.cameraX = undefined;
            } else if(newCameraX <= -2157){
                this.world.cameraX = -2157;
            } else {
                this.world.cameraX = newCameraX; 
            }
        }, 5);
    }

    jump() {

    }
}