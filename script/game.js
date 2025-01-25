let canvas;
let world;
let SoundOn = true; 

function init() {
    deleteWorld();
    canvas = document.getElementById('canvas');
    startScreen = new Startscreen(canvas); 
    

   

}
function Gameinit() {
    deleteStartScreen(); 
    let statusbar = new Statusbar();
    world = new World(canvas, statusbar);
}

function deleteStartScreen() {
    if (startScreen) {
        startScreen.stop();  // Beende die Animation
        startScreen = null;  // Menü-Objekt löschen
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Bildschirm löschen
    }
}

function deleteWorld() {
    if (world) {
        // Setze alle inneren Objekte zurück
        if (world.keyboard) {
            world.keyboard = null;  // Setzt das Keyboard zurück
        }
        if (world.character) {
            world.character = null;  // Setzt das Character-Objekt zurück
        }
        if (world.level) {
            world.level = null;  // Setzt das Level zurück
        }
        if (world.sounds) {
            world.sounds.stopSounds();  // Hier wird die Methode zum Stoppen aufgerufen
            world.sounds = null;
        }

        level1 = null;
        setLevel();
        // Setze das World-Objekt selbst zurück
        world = null;

        // Lösche den Canvas
        clearCanvas();
    }
}

function clearCanvas() {
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Bildschirm löschen
}