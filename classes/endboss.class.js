class Endboss extends MovableObject {
    endbossWalking = [
        'assets/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    endbossAngry = [
        'assets/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/4_enemie_boss_chicken/2_alert/G12.png'
    ]

    endbossAttack = [
        'assets/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/4_enemie_boss_chicken/3_attack/G20.png',
    ]

    endbossHurt = [
        'assets/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    endbossDead = [
        'assets/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    currentImageWalking = 0;
    currentImageHurt = 0;
    currentImageAttack = 0;
    currentImageDead = 0;
    lastFrameTime = 0;
    frameInterval = 200;
    energy;
    world;
    dead = false;


    constructor(posX = 2700, posY = 120, width = 350, height = 350) {
        super().loadImage(this.endbossWalking[0]);
        this.loadImages(this.endbossWalking);
        this.loadImages(this.endbossAngry);
        this.loadImages(this.endbossAttack);
        this.loadImages(this.endbossHurt);
        this.loadImages(this.endbossDead);
        this.Won = false;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.offsetY = 55;
        this.offsetX = 20;
        this.offsetLength = 40;
        this.offsetHeight = 70;
        this.targetY = this.getRandomTargetY(2100, 2300);
        this.movingLeft = true;
        this.walking = true;
        this.hurt = false;
        this.speedLeft = 1.3;
        this.energy = 100;
        this.attackStarted = false;
        this.attackDone = false;
        this.deadAnimationDone = false;


    }

    moveChicken() {
        this.posX -= 1;
    }

    endbossFight() {
        this.updateEndbossPosition();
    }

    animateEndboss(array, property) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameInterval) {
            let path = array[property]; // Direktes Zugreifen auf das Array mit dem Property
            if (path) { // Sicherstellen, dass das Bild existiert
                this.img = this.images[path];
                property++; // Nur hochzählen, wenn das Bild existiert
            }
            if (property >= array.length) { // Rücksetzen, wenn das Ende erreicht ist
                property = 0;
            }
            this.lastFrameTime = currentTime;
        }
        return property; // Den neuen Wert von Property zurückgeben
    }

    updateEndbossPosition() {
        if (this.movingLeft && !this.dead) {
            if (this.walking) {
                this.posX -= this.speedLeft;
                if (!this.hurt) {
                    this.currentImageWalking = this.animateEndboss(this.endbossWalking, this.currentImageWalking);
                } else {
                    this.currentImageHurt = this.animateEndboss(this.endbossHurt, this.currentImageHurt);
                    if(SoundOn) {
                        this.world.sounds.endbossHurt.play();
                        }
                }
            }
            if (this.posX < this.targetY && !this.attackDone) {
                this.walking = false;
                this.currentImageAttack = this.animateEndboss(this.endbossAttack, this.currentImageAttack);
                if (!this.attackStarted) {
                    setTimeout(() => {
                        this.targetY = this.getRandomTargetY(2400, 2500);
                        this.movingLeft = false;
                        this.attackDone = true;
                    }, 1500);
                    this.attackStarted = true;
                }
                this.speedLeft = this.calculateRandomSpeed();
            }
        } else if (!this.dead) {
            if (!this.hurt) {
                this.currentImageWalking = this.animateEndboss(this.endbossWalking, this.currentImageWalking);
            } else {
                this.currentImageHurt = this.animateEndboss(this.endbossHurt, this.currentImageHurt);
            }
            this.walking = true;
            this.posX += 1;
            if (this.posX >= this.targetY) {
                this.attackStarted = false;
                this.attackDone = false;
                this.targetY = this.getRandomTargetY(2150, 2300);
                this.movingLeft = true;
            }
        } else if (this.dead) {
            if (!this.deadAnimationDone) {
                this.currentImageAttack = this.animateEndboss(this.endbossDead, this.currentImageAttack);
                if(SoundOn) {
                    this.world.sounds.endbossDead.play();
                    }
                if (!this.deadAnimationStarted) {
                    setTimeout(() => {
                        this.deadAnimationDone = true;
                    }, 2000);
                    setTimeout(() => {
                        this.Won = true;
                        this.world.keyboard.toggleListeners();
                    }, 6000);
                    this.deadAnimationStarted = true;
                }
            }
        }
    }

    getRandomTargetY(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    calculateRandomSpeed() {
        return Math.random() * (3.0 - 1.0) + 1.0;
    }

}