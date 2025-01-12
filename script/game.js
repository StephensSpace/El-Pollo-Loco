let canvas;
let keyboard;
let world; 

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard); 
    console.log(world.character, world.enemies);
    

   

}