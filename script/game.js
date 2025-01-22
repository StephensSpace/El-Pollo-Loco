let canvas;
let keyboard;
let world; 

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    let statusbar = new Statusbar();
    world = new World(canvas, keyboard, statusbar); 
    console.log(world.character, world.enemies);
    

   

}