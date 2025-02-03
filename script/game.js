let canvas;
let world;
let SoundOn = true;

function init() {
    if (world) { 
        if (world.endMenu) world.endMenu = null;
        if (world.pauseMenu) world.pauseMenu = null;
        deleteWorld();
    }
    canvas = document.getElementById('canvas');
    startScreen = new Startscreen(canvas);
}

function Gameinit() {
    deleteStartScreen();
    if (world) { 
        if (world.endMenu) world.endMenu = null;
        if (world.pauseMenu) world.pauseMenu = null;
        deleteWorld();
    }
    if(isMobileDevice()) {
        document.getElementById('pauseImg').style.display = 'block';
    }
    world = new World(canvas);
}

function deleteStartScreen() {
    if (startScreen) {
        startScreen.stop();
        startScreen = null;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function deleteWorld() {
    if (world) {
        setWorldToNull();
        level1 = null;
        setLevel();
        world = null;
        clearCanvas();
    }
}

function setWorldToNull() {
    if (world.keyboard) {
        world.keyboard = null;
    }
    if (world.character) {
        world.character = null;
    }
    if (world.level) {
        world.level = null;
    }
    if (world.sounds) {
        world.sounds.stopSounds();
        world.sounds = null;
    }
}

function clearCanvas() {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Bildschirm löschen
}

