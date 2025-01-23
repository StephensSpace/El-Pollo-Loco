let canvas;
let keyboard;
let world;
let SoundOn = true; 

function init() {
    canvas = document.getElementById('canvas');
    startScreen = new Startscreen(canvas); 
    

   

}
function Gameinit() {
    deleteStartScreen();
    keyboard = new Keyboard();
    let statusbar = new Statusbar();
    world = new World(canvas, keyboard, statusbar);
}

function deleteStartScreen() {
    if (startScreen) {
        startScreen.stop();  // Beende die Animation
        startScreen = null;  // Menü-Objekt löschen
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // Bildschirm löschen
    }
}