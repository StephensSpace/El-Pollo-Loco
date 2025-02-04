/**
 * Diese Klasse verwaltet alle Sounds im Spiel, einschließlich Hintergrundmusik, Geräuscheffekte und Interaktionen.
 * Sie ermöglicht das Abspielen, Stoppen und Steuern der Lautstärke der verschiedenen Sounds.
 */
class Sounds {
    /**
     * Erstellt eine Instanz der Sounds-Klasse und lädt die Audio-Dateien.
     * 
     * @description Alle Audio-Dateien werden im Konstruktor geladen und die Muted-Option wird standardmäßig auf `true` gesetzt.
     */
    constructor() {
        this.soundChicken = new Audio('audio/chickenSound.wav');
        this.soundChicken.muted = true;
        this.backgroundSound = new Audio('audio/backgroundSound.wav');
        this.backgroundSound.muted = true;
        this.coinSound = new Audio('audio/retro-coin.wav');
        this.bottle = new Audio('audio/collectBottle.mp3');
        this.bottleBreaking = new Audio('audio/bottleBreaking.wav');
        this.OuchSound = new Audio('audio/Ouch.wav');
        this.pepeDead = new Audio('audio/pepeDead.wav');
        this.endbossHurt = new Audio('audio/EndbossHurt.wav');
        this.endbossDead = new Audio('audio/EndbossDead.wav');
        this.chickenDead = new Audio('audio/chickenDead.wav');
    }

    /**
     * Startet alle Sounds, die beim Start des Spiels abgespielt werden sollen.
     * 
     * @description Diese Methode startet die Hintergrundmusik und das Geräusch für das Huhn.
     */
    startSounds() {
        this.playChickenSound();
        this.playBackgroundSound();
    }

    /**
     * Spielt den Hintergrundsound ab, wenn der Sound aktiv ist und die Bedingungen erfüllt sind.
     * 
     * @description Wenn der Hintergrundsound nicht pausiert ist und der Zustand der Audio-Datei korrekt ist,
     *              wird der Sound abgespielt und in einer Schleife wiederholt.
     */
    playBackgroundSound() {
        if (!SoundOn) {
            this.backgroundSound.pause();
            this.backgroundSound.currentTime = 0;
            return;
        }

        if (this.backgroundSound.paused && !this.backgroundSound.ended && this.backgroundSound.readyState >= 2) {
            this.backgroundSound.muted = false;
            this.backgroundSound.loop = true;
            this.backgroundSound.play().catch(err => console.warn("Playback Error:", err));
        }
    }

    /**
     * Spielt das Huhn-Geräusch ab, wenn der Sound aktiv ist.
     * 
     * @description Wenn das Huhn-Geräusch noch nicht abgespielt wurde, wird es abgespielt.
     */
    playChickenSound() {
        if (SoundOn) {
            if (this.soundChicken.paused) {
                this.soundChicken.muted = true;
                this.soundChicken.play().catch(err => console.warn("Playback Error:", err));
            }
        } else {
            this.soundChicken.pause();
            this.soundChicken.currentTime = 0;
        }
    }

    /**
     * Stoppt alle laufenden Sounds und setzt die Audio-Elemente zurück.
     * 
     * @description Diese Methode pausiert die aktuellen Sounds, setzt die Wiedergabezeit auf 0 und setzt die Audio-Objekte auf `null`.
     */
    stopSounds() {
        if (this.soundChicken instanceof HTMLAudioElement) {
            this.soundChicken.pause();
            this.soundChicken.currentTime = 0;
        }
        this.soundChicken = null;

        if (this.backgroundSound instanceof HTMLAudioElement) {
            this.backgroundSound.pause();
            this.backgroundSound.currentTime = 0;
        }
        this.backgroundSound = null;
    }
}