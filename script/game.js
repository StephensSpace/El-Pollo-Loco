/**
 * @file gameFunctions.js
 * @description Enthält zentrale Spielfunktionen wie Initialisierung, Start, Stop und Reset des Spiels.
 */

let canvas;
let world;
let SoundOn = true;

/**
 * Initialisiert das Spiel und zeigt den Startscreen an.
 */
function init() {
    if (world) {
        stopWorld();
    }
    canvas = document.getElementById('canvas');
    startScreen = new Startscreen(canvas);
    handleScreenOrientation();
}

/**
 * Prüft die Geräteausrichtung und startet das Spiel, wenn die Bedingungen erfüllt sind.
 */
function Gameinit() {
    startGame();
}

/**
 * Startet das Spiel und blendet den Startscreen aus.
 */
function startGame() {
    deleteStartScreen();
    stopWorld();
    if (isMobileDevice()) {
        document.getElementById('pauseImg').style.display = 'block';
    }
    canvas = document.getElementById('canvas');
    world = new World(canvas);
    handleScreenOrientation();
    setTimeout(() => {
        world.sounds.startSounds();
    }, 1000);
}

/**
 * Stoppt das Spiel und setzt das `world`-Objekt zurück.
 */
function stopWorld() {
    if (world) {
        if (world.sounds) world.sounds.stopSounds();
        if (world.endMenu) world.endMenu = null;
        if (world.pauseMenu) world.pauseMenu = null;
        deleteWorld();
    }
}

/**
 * Blendet das Overlay aus.
 */
function hideOverlay() {
    document.getElementById('overlay').style.display = 'none';
}

/**
 * Löscht den Startscreen und leert das Canvas.
 */
function deleteStartScreen() {
    if (startScreen) {
        startScreen.stop();
        startScreen = null;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Löscht die aktuelle Spielwelt und setzt sie zurück.
 */
function deleteWorld() {
    if (world) {
        setWorldToNull();
        level1 = null;
        setLevel();
        world = null;
        clearCanvas();
    }
}

/**
 * Setzt alle Referenzen innerhalb der `world` auf `null`, um Speicher freizugeben.
 */
function setWorldToNull() {
    if (world.keyboard) {
        world.keyboard.removeEventListenersRestart();
        world.keyboard.world = null;
        world.keyboard = null;
    }
    if (world.ctx) world.ctx = null;
    if (world.character) world.character = null;
    if (world.level) world.level = null;
    if (world.sounds) {
        world.sounds.stopSounds();
        world.sounds = null;
    }
}

/**
 * Löscht das Canvas.
 */
function clearCanvas() {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

/**
 * Spielt verschiedene Sounds im Spiel ab.
 */
function playSounds() {
    world.sounds.playChickenSound();
    world.sounds.playBackgroundSound();
}