/**
 * Repräsentiert den Endboss im Spiel, der sich bewegt, angreift, verletzt wird und stirbt.
 * Diese Klasse verwaltet die Animationen und das Verhalten des Endbosses.
 */
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

    /**
     * Erzeugt eine neue Instanz des Endbosses mit den angegebenen Parametern.
     * @param {number} posX - Die Start-X-Position des Endbosses.
     * @param {number} posY - Die Start-Y-Position des Endbosses.
     * @param {number} width - Die Breite des Endbosses.
     * @param {number} height - Die Höhe des Endbosses.
     */
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

     /**
     * Bewegt den Endboss nach links.
     * @returns {void}
     */
    moveChicken() {
        this.posX -= 1;
    }

     /**
     * Führt die Bewegungslogik des Endbosses aus, einschließlich Position und Angriffsbereitschaft.
     * @returns {void}
     */
    endbossFight() {
        this.updateEndbossPosition();
    }

    /**
     * Animiert den Endboss durch Schleifen der Bilder in einem Array.
     * @param {Array} array - Das Array der Animationsbilder.
     * @param {number} property - Der Index des aktuellen Animationsbilds.
     * @returns {number} Der aktualisierte Index des Animationsbilds.
     */
    animateEndboss(array, property) {
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime >= this.frameInterval) {
            let path = array[property]; 
            if (path) {
                this.img = this.images[path];
                property++;
            }
            if (property >= array.length) {
                property = 0;
            }
            this.lastFrameTime = currentTime;
        }
        return property; 
    }

    /**
     * Aktualisiert die Position des Endbosses basierend auf dessen Zustand.
     * @returns {void}
     */
    updateEndbossPosition() {
        if (this.dead) {
            this.handleDeadEndboss();
        } else if (this.movingLeft) {
            this.handleMovingLeft();
        } else {
            this.handleMovingRight();
        }
    }
    
    /**
     * Handhabt den Zustand, wenn der Endboss tot ist.
     * @returns {void}
     */
    handleDeadEndboss() {
        if (!this.deadAnimationDone) {
            this.playDeadAnimation();
            this.startDeadAnimationTimeouts();
        }
    }
    
    /**
     * Spielt die Animationssequenz für den toten Endboss ab.
     * @returns {void}
     */
    playDeadAnimation() {
        this.currentImageAttack = this.animateEndboss(this.endbossDead, this.currentImageAttack);
        if (SoundOn) {
            this.world.sounds.endbossDead.play();
        }
    }
    
    /**
     * Startet die Timeouts für die Animation des toten Endbosses und die anschließende Übergabe des Sieges.
     * @returns {void}
     */
    startDeadAnimationTimeouts() {
        if (!this.deadAnimationStarted) {
            setTimeout(() => {
                this.deadAnimationDone = true;
            }, 2000);
            setTimeout(() => {
                this.Won = true;
                this.world.keyboard.won = true;
                this.world.keyboard.toggleListeners();
            }, 6000);
            this.deadAnimationStarted = true;
        }
    }
    
    /**
     * Handhabt die Bewegung des Endbosses nach links.
     * @returns {void}
     */
    handleMovingLeft() {
        if (this.walking) {
            this.moveLeftAndAnimate();
        }
        if (this.posX < this.targetY && !this.attackDone) {
            this.prepareAttack();
        }
    }
    
    /**
     * Bewegt den Endboss nach links und animiert die entsprechende Bewegung.
     * @returns {void}
     */
    moveLeftAndAnimate() {
        this.posX -= this.speedLeft;
        if (!this.hurt) {
            this.currentImageWalking = this.animateEndboss(this.endbossWalking, this.currentImageWalking);
        } else {
            this.currentImageHurt = this.animateEndboss(this.endbossHurt, this.currentImageHurt);
            if (SoundOn) {
                this.world.sounds.endbossHurt.play();
            }
        }
    }
    
    /**
     * Bereitet den Angriff des Endbosses vor, indem die Bewegung gestoppt und die Angriff-Animation abgespielt wird.
     * @returns {void}
     */
    prepareAttack() {
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
    
    /**
     * Handhabt die Bewegung des Endbosses nach rechts, wenn er auf der rechten Seite des Spiels ist.
     * @returns {void}
     */
    handleMovingRight() {
        this.walking = true;
        if (!this.hurt) {
            this.currentImageWalking = this.animateEndboss(this.endbossWalking, this.currentImageWalking);
        } else {
            this.currentImageHurt = this.animateEndboss(this.endbossHurt, this.currentImageHurt);
        }
        this.posX += 1;
        if (this.posX >= this.targetY) {
            this.resetAttackState();
        }
    }
    
    /**
     * Setzt die Angriffs- und Bewegungszustände des Endbosses zurück.
     * @returns {void}
     */
    resetAttackState() {
        this.attackStarted = false;
        this.attackDone = false;
        this.targetY = this.getRandomTargetY(2150, 2300);
        this.movingLeft = true;
    }

    /**
     * Gibt eine zufällige Y-Position innerhalb des angegebenen Bereichs zurück.
     * @param {number} min - Der minimale Wert für die Y-Position.
     * @param {number} max - Der maximale Wert für die Y-Position.
     * @returns {number} Eine zufällige Y-Position.
     */
    getRandomTargetY(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Berechnet eine zufällige Geschwindigkeit für die Bewegung des Endbosses.
     * @returns {number} Eine zufällige Geschwindigkeit im Bereich von 1.0 bis 3.0.
     */
    calculateRandomSpeed() {
        return Math.random() * (3.0 - 1.0) + 1.0;
    }

}