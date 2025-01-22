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

    imagesJump = [
        '../assets/2_character_pepe/3_jump/J-31.png',
        '../assets/2_character_pepe/3_jump/J-32.png',
        '../assets/2_character_pepe/3_jump/J-33.png',
        '../assets/2_character_pepe/3_jump/J-34.png',
        '../assets/2_character_pepe/3_jump/J-35.png',
        '../assets/2_character_pepe/3_jump/J-36.png',
        '../assets/2_character_pepe/3_jump/J-37.png',
        '../assets/2_character_pepe/3_jump/J-38.png',
        '../assets/2_character_pepe/3_jump/J-39.png',
    ];

    imagesDeath = [
        '../assets/2_character_pepe/5_dead/D-51.png',
        '../assets/2_character_pepe/5_dead/D-52.png',
        '../assets/2_character_pepe/5_dead/D-53.png',
        '../assets/2_character_pepe/5_dead/D-54.png',
        '../assets/2_character_pepe/5_dead/D-55.png',
        '../assets/2_character_pepe/5_dead/D-56.png',
        '../assets/2_character_pepe/5_dead/D-57.png',
    ]

    imagesHurt = [
        '../assets/2_character_pepe/4_hurt/H-41.png',
        '../assets/2_character_pepe/4_hurt/H-42.png',
        '../assets/2_character_pepe/4_hurt/H-43.png',
    ]

    soundWalking = new Audio('../audio/pepeRunning.wav')
    images = {};
    world;
    inAir = false;
    speed = 3;
    lastFrameTime = 0;
    frameIntervalDeath = 200;
    frameIntervalIdle = 330;
    frameIntervalWalk = 100;
    frameIntervalJump = 100;
    frameIntervalHurt = 100;
    alive = true;
    firstThrow = true;
    lastThrowTime = 0;
    coinCounter = 0;
    bottleCounter = 10;
    Bottles = []


    constructor(keyboard) {
        super().loadImage('../assets/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.loadImages(this.imagesDeath);
        this.loadImages(this.imagesHurt);
        this.offsetY = 110;
        this.offsetX = 57;
        this.offsetLength = 120;
        this.offsetHeight = 122;
        this.keyboard = keyboard
        this.checkDeath();

    }

    animateIdle() {
        const currentTime = Date.now();
        if (this.alive && !this.hurt && !this.fall) {
            if (!this.keyboard.rechts && !this.keyboard.links && !this.keyboard.jump) {
                this.soundWalking.pause();
                setInterval(() => {
                    if (currentTime - this.lastFrameTime >= this.frameIntervalIdle) {
                        this.playAnimation(currentTime, this.imagesIdle)
                    }
                }, 200);
            }
        }
    }

    checkDeath() {
        setInterval(() => {
            if (this.energy <= 0 && this.alive) {
                this.animateDeath();
                setInterval(() => {
                    this.img = this.images[this.imagesDeath[1]]
                }, 210);
                this.alive = false;
            }
        }, 200);

    }

    animateDeath() {
        const currentTime = Date.now();
        this.soundWalking.pause();

        if (currentTime - this.lastFrameTime >= this.frameIntervalDeath) {
            this.playAnimation(currentTime, this.imagesDeath);
        }

    }

    animateHurt() {
        const currentTime = Date.now();
        this.soundWalking.pause();
            if (currentTime - this.lastFrameTime >= this.frameIntervalHurt) {
                this.playAnimation(currentTime, this.imagesHurt)
            }
    }


    animateMovement() {
        if(!this.fall) {
            this.speedY = 0;
        } 
        if (this.alive) {
            if (this.keyboard.rechts) {
                this.handleWalk(this.walkRight());
                this.speed = 3;
            }
            if (this.keyboard.links) {
                this.handleWalk(this.walkLeft());
                this.speed = 3;
            }
            if ((this.keyboard.jump && !this.fall) || (this.collisionY && this.keyboard.jump && this.fallOnBlock && this.speedY == 0)) {
                this.collisionY = false;
                this.jump();
            }
            if (this.posX >= 295) {
                this.cameraX(295);
            }
        }
    }

    startThrow() {
        const currentTime = Date.now();
        if (this.keyboard.throw && (currentTime - this.lastThrowTime >= 1000) && this.alive) {
            if (!this.otherDirection) {
                const directionRight = true;
                this.Bottles.push(new BottleThrown(this, directionRight, false));
                this.lastThrowTime = currentTime; // Setze den Zeitpunkt des Wurfs
            } else {
                const directionRight = false;
                this.Bottles.push(new BottleThrown(this, directionRight, false));
                this.lastThrowTime = currentTime; // Setze den Zeitpunkt des Wurfs
            }
        }
    }

    handleWalk(funct) {
        funct;
        if (!this.hurt && !this.fall) {
            this.checkWalkAnimationTime();
            this.soundWalking.play();
        }
    }

    animateJump() {
        const currentTime = Date.now();
        if ((this.keyboard.jump || this.fall) && !this.collisionY && this.alive) {
            this.soundWalking.pause();
                if (currentTime - this.lastFrameTime >= this.frameIntervalJump) {
                    this.playAnimation(currentTime, this.imagesJump)
                }
        }
    }

    checkWalkAnimationTime() {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameIntervalWalk) {
            this.playAnimation(currentTime, this.imagesWalk)
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
            this.posX = - 10;
        } else {
            this.posX = newPosition;
        }
    }

    playAnimation(currentTime, array) {
        let i = this.currentImage % array.length;
        let path = array[i];
        this.img = this.images[path];
        this.currentImage++;
        this.lastFrameTime = currentTime;
    }

    cameraX(versatz) {
        setInterval(() => {
            const newCameraX = -this.posX + versatz;
            if (newCameraX > 0) {
                this.world.cameraX = undefined;
            } else if (newCameraX <= -2157) {
                this.world.cameraX = -2157;
            } else {
                this.world.cameraX = newCameraX;
            }
        }, 100);
    }

    jump() {
        this.speedY = 5.8;

    }
}