class CharacterPepe extends MovableObject {
    imagesIdle = [
        'assets/2_character_pepe/1_idle/idle/I-1.png',
        'assets/2_character_pepe/1_idle/idle/I-2.png',
        'assets/2_character_pepe/1_idle/idle/I-3.png',
        'assets/2_character_pepe/1_idle/idle/I-4.png',
        'assets/2_character_pepe/1_idle/idle/I-5.png',
        'assets/2_character_pepe/1_idle/idle/I-6.png'
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
        'assets/2_character_pepe/3_jump/J-31.png',
        'assets/2_character_pepe/3_jump/J-32.png',
        'assets/2_character_pepe/3_jump/J-33.png',
        'assets/2_character_pepe/3_jump/J-34.png',
        'assets/2_character_pepe/3_jump/J-35.png',
        'assets/2_character_pepe/3_jump/J-36.png',
        'assets/2_character_pepe/3_jump/J-37.png',
        'assets/2_character_pepe/3_jump/J-38.png',
        'assets/2_character_pepe/3_jump/J-39.png',
    ];

    imagesDeath = [
        'assets/2_character_pepe/5_dead/D-51.png',
        'assets/2_character_pepe/5_dead/D-52.png',
        'assets/2_character_pepe/5_dead/D-53.png',
        'assets/2_character_pepe/5_dead/D-54.png',
        'assets/2_character_pepe/5_dead/D-55.png',
        'assets/2_character_pepe/5_dead/D-56.png',
        'assets/2_character_pepe/5_dead/D-57.png',
    ]

    imagesHurt = [
        'assets/2_character_pepe/4_hurt/H-41.png',
        'assets/2_character_pepe/4_hurt/H-42.png',
        'assets/2_character_pepe/4_hurt/H-43.png',
    ]

    soundWalking = new Audio('audio/pepeRunning.wav')
    images = {};
    world;
    inAir = false;
    speed = 3;
    posY = 200;
    lastFrameTime = 0;
    frameInterval = 100;
    alive = true;
    firstThrow = true;
    fall = false;
    lastThrowTime = 0;
    coinCounter = 0;
    bottleCounter = 10;
    Bottles = []
    currentImageWalk = 0;
    currentImageIdle = 0;
    currentImageJump = 0;
    currentImageDeath = 0;
    currentImageHurt = 0;



    constructor(keyboard, world) {
        super().loadImage('assets/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesWalk);
        this.loadImages(this.imagesJump);
        this.loadImages(this.imagesDeath);
        this.loadImages(this.imagesHurt);
        this.Lost = false;
        this.world = world;
        this.posX = 20;
        this.offsetY = 110;
        this.offsetX = 57;
        this.offsetLength = 120;
        this.offsetHeight = 122;
        this.keyboard = keyboard
        this.timeoutStarted = false;

    }

    checkCharacterPosX() {
        if (!(this.posX >= 2070) && !this.world.cameraDriveDone) {
            this.characterMovements();
        }
        this.world.checkEndbossTrigger();
        if (this.world.angerDone) {
            this.characterMovements();
            this.world.level.endboss.endbossFight();
        }
    }

    characterMovements() {
        if (!this.world.level.endboss.dead) {
            this.startThrow();
            this.animateIdle();
        }
        this.animateMovement();
        this.applyGravity();
        this.animateJump();
    }

    checkCollisionsBlock() {
        this.world.level.rocks.forEach(rock => {
            this.isCollidingBlock(rock);

            if (this.Bottles.length > 0) {
                this.Bottles.forEach(bottle => {
                    bottle.isCollidingBlock(rock, bottle);
                });
            }
            this.world.level.enemies.forEach(enemy => {
                enemy.isCollidingBlock(rock);
            });
        });
    }

    checkCollisionsEnemy() {
        let collisionDetected = false;
        this.world.level.enemies.forEach(enemy => {
            if (this.isColliding(enemy) && this.energy > 0 && !enemy.dead) {
                collisionDetected = true;
                this.hurt = true;
                this.energy -= 0.5;
                if(SoundOn) {
                    this.world.sounds.OuchSound.play();
                    }
                if (this.energy >= 10) {
                    this.animateHurt();
                }
            }
        });
        if (this.isColliding(this.world.level.endboss)) {
            collisionDetected = true;
            this.hurt = true;
            if (this.energy >= 0 && !this.world.level.endboss.dead) {
                this.energy -= 0.8;
            }
            if (this.energy >= 5) {
                this.animateHurt();
                if(SoundOn) {
                    this.world.sounds.OuchSound.play();
                    }
            }
        }
        if (!collisionDetected) {
            this.hurt = false;
            this.world.sounds.OuchSound.pause()
        }
    }

    animateIdle() {
        if (this.alive && !this.hurt && !this.fall) {
            if (!this.keyboard.rechts && !this.keyboard.links && !this.keyboard.jump) {
                if (SoundOn) { this.soundWalking.pause(); }
                this.currentImageIdle = this.animatePepe(this.imagesIdle, this.currentImageIdle);
            }
        }
    }

    animateHurt() {
        if (this.hurt && this.alive) {
            this.currentImageHurt = this.animatePepe(this.imagesHurt, this.currentImageHurt);
        }
    }

    animatePepe(array, imageCounter) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameInterval) {
            let path = array[imageCounter]; // Direktes Zugreifen auf das Array mit dem Counter
            if (path) { // Sicherstellen, dass das Bild existiert
                this.img = this.images[path];
                imageCounter++; // Hochzählen
            }
            if (imageCounter >= array.length) { // Rücksetzen, wenn das Ende erreicht ist
                imageCounter = 0;
            }
            this.lastFrameTime = currentTime;
        }
        return imageCounter; // Den neuen Wert des Counters zurückgeben
    }

    checkDeath() {
        if (this.energy <= 0 && this.alive) {       
            this.currentImageDeath = this.animatePepe(this.imagesDeath, this.currentImageDeath);
            if(SoundOn) {
                this.world.sounds.pepeDead.play();
                }
            if (!this.Lost && !this.timeoutStarted) {
                this.timeoutStarted = true;           
                setTimeout(() => {
                    this.world.sounds.pepeDead.pause()
                    this.alive = false;            
                    setTimeout(() => {
                        this.Lost = true;
                        this.world.keyboard.toggleListeners();
                    }, 1500);    
                }, 2000);
            }
        }
    }

    animateMovement() {
        if (!this.fall) {
            this.speedY = 0;
        }
        if (!this.timeoutStarted) {
            if (this.keyboard.rechts && !this.world.level.endboss.dead) {
                this.handleWalk(this.walkRight());
                this.speed = 3;
            }
            if (this.keyboard.links && !this.world.level.endboss.dead) {
                this.handleWalk(this.walkLeft());
                this.speed = 3;
            }
            if (this.shouldJump()) {
                this.collisionY = false;
                this.jump();
            }
        }
    }

    shouldJump() {
        const jumpingCondition = this.keyboard.jump && !this.fall;
        const blockCondition = this.collisionY && this.keyboard.jump && this.fallOnBlock && this.speedY === 0;
        const endBossCondition = this.world.level.endboss.dead && this.speedY === 0;

        return jumpingCondition || blockCondition || endBossCondition;
    }

    startThrow() {
        const currentTime = Date.now();
        if (this.canThrowBottle(currentTime)) {
            if (!this.otherDirection) {
                const directionRight = true;
                this.Bottles.push(new BottleThrown(this, directionRight, false));
                this.lastThrowTime = currentTime;
                this.bottleCounter--;
            } else {
                const directionRight = false;
                this.Bottles.push(new BottleThrown(this, directionRight, false));
                this.lastThrowTime = currentTime;
                this.bottleCounter--;
            }
        }
    }

    canThrowBottle(currentTime) {
        return this.keyboard.throw &&
            (currentTime - this.lastThrowTime >= 1000) &&
            this.alive &&
            this.bottleCounter > 0;
    }

    handleWalk(funct) {
        funct;
        if (!this.hurt && !this.fall) {
            this.currentImageWalk = this.animatePepe(this.imagesWalk, this.currentImageWalk);
            if (SoundOn) { this.soundWalking.play(); }
        }
    }

    animateJump() {
        const currentTime = Date.now();
        if (((this.keyboard.jump || this.fall) && !this.collisionY && this.alive) || this.world.level.endboss.dead) {
            this.soundWalking.pause();
            if (currentTime - this.lastFrameTime >= this.frameInterval) {
                this.currentImageJump = this.animatePepe(this.imagesJump, this.currentImageJump);
            }
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
        } else if (this.world.cameraDriveDone && (newPosition <= 2121)) {
            this.posX = 2121;
        }
        else {
            this.posX = newPosition;
        }
    }

    cameraX(versatz) {
        const newCameraX = -this.posX + versatz;
        if (newCameraX > 0) {
            this.world.cameraX = undefined;
        } else if (newCameraX <= -2157) {
            this.world.cameraX = -2157;
        } else if (newCameraX <= -1775) {
            this.cameraDrive();
        } else {
            this.world.cameraX = newCameraX;
        }

    }

    setCamera() {
        if (this.posX >= 295) {
            this.cameraX(295);
        }
    }

    cameraDrive() {
        const smoothScroll = setInterval(() => {
            if (this.world.cameraX > -2157 && !this.world.cameraDriveDone) {
                this.world.cameraX -= 0.1;
            } else if (!this.world.cameraDriveDone) {
                this.world.cameraX = -2157;
                this.posX = 2150;
                this.posY = 200;
                this.world.cameraDriveDone = true;
                clearInterval(smoothScroll);  // Stoppe das Bewegungstimer
            }
        }, 50);  // Geschwindigkeit der Bewegung
    }

    jump() {
        this.speedY = 5.8;

    }
}