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
        }// Start der rekursiven Funktion
    }

    playBackgroundSound() {
        if (SoundOn) {
            this.backgroundSound.addEventListener('ended', () => {
                setTimeout(() => {
                    this.backgroundSound.play();
                }, 10000);
            });
            this.backgroundSound.play();

        }
    }

    stopSounds() {
        // Stoppe alle Audio-Wiedergaben
        this.soundChicken.pause();
        this.soundChicken.currentTime = 0;  // Setze den Sound auf den Anfang zurück

        this.backgroundSound.pause();
        this.backgroundSound.currentTime = 0;

        // Stoppe das wiederholte Abspielen des Chicken Sounds
        clearTimeout(this.chickenSoundTimeout);
    }
}