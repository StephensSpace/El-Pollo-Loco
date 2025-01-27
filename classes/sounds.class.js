class Sounds {
    soundChicken;
    backgroundSound;
    chickenSoundTimeout; // Zum Verwalten der Timeout-ID

    constructor() {
        this.soundChicken = new Audio('../audio/chickenSound.wav');
        this.backgroundSound = new Audio('../audio/backgroundSound.wav');
        this.playChickenSound();
        this.playBackgroundSound();
    }

    playChickenSound() {
        if (SoundOn) {
            const playWithRandomDelay = () => {
                this.soundChicken.play();

                // Berechne zufällige Verzögerung zwischen 5000ms und 8000ms
                const delay = 5000 + Math.random() * 3000;

                this.chickenSoundTimeout = setTimeout(playWithRandomDelay, delay);
            };

            playWithRandomDelay();
        } else {
            this.soundChicken.pause();
            clearTimeout(this.chickenSoundTimeout);
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
        // Stoppe alle Audio-Wiedergaben
        this.soundChicken.pause();
          // Setze den Sound auf den Anfang zurück

        this.backgroundSound.pause();
        

        // Stoppe das wiederholte Abspielen des Chicken Sounds
        
    }
}