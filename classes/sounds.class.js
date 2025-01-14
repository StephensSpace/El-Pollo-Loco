class Sounds {
    soundChicken;
    backgroundSound;
    constructor() {
        this.soundChicken = new Audio('../audio/chickenSound.wav');
        this.backgroundSound = new Audio ('../audio/backgroundSound.wav')
        this.playChickenSound();
        
        
    }

    playChickenSound() {
        const playWithRandomDelay = () => {
            this.soundChicken.play();
            
            // Berechne zufällige Verzögerung zwischen 5000ms und 8000ms
            const delay = 5000 + Math.random() * 3000;
            
            setTimeout(playWithRandomDelay, delay);
        };
    
        playWithRandomDelay(); // Start der rekursiven Funktion
    }

    playBackgroundSound() {
        this.backgroundSound.addEventListener('ended', () => {
            setTimeout(() => {
                this.backgroundSound.play();
            }, 10000); 
        });
        this.backgroundSound.play();
    }

}

