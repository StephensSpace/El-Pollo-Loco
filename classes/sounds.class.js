class Sounds {
    soundChicken;
    backgroundSound;
    chickenSoundTimeout;
    coinSound;
    bottle

    constructor() {
        this.soundChicken = new Audio('../audio/chickenSound.wav');
        this.backgroundSound = new Audio('../audio/backgroundSound.wav');
        this.coinSound = new Audio('../audio/retro-coin.wav')
        this.bottle = new Audio('../audio/collectBottle.mp3')
        this.bottleBreaking = new Audio('../audio/bottleBreaking.wav')
        this.playChickenSound();
        this.playBackgroundSound();
    }

    playChickenSound() {
        if (SoundOn) {
            this.soundChicken.play();
        } else {
            this.soundChicken.pause();
        }
    }

    playBackgroundSound() {
        if (SoundOn) {
            this.backgroundSound.addEventListener('ended', () => {
                setTimeout(() => {
                    this.backgroundSound.play();
                }, 10000);
            });
            this.backgroundSound.play();

        } else {
            this.backgroundSound.pause();
        }
    }

    stopSounds() {
        if (this.soundChicken) {
            this.soundChicken.pause();
            this.soundChicken.currentTime = 0;
            this.soundChicken = null;
        }
    
        if (this.backgroundSound) {
            this.backgroundSound.pause();
            this.backgroundSound.currentTime = 0;
            this.backgroundSound = null;
        }
    }
}