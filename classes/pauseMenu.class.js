//**Klasse für das Pausemenü das bei 
// pausiertem Spiel angezeigt wird 
// */

class PauseMenu extends DrawAbleObject {

    //**Buttons die im Pausemenü angezeigt werden
    //  */
    startBtn = new MenuButton('assets/menu/startBtn.png', 275, 179, 180, 50);
    soundBtn = new MenuButton('assets/menu/menuBtn.png', 275, 239, 180, 50);
    controllsBtn = new MenuButton('assets/menu/menuBtn.png', 275, 299, 180, 50);

    //** Constructor für das Pause menü 
    // mit positionierung und geladenem Bild */
    constructor() {
        super().loadImage('assets/menu/menuBackground.png');
        this.posX = 235;
        this.posY = 90;
        this.width = 250;
        this.height = 300;
        
    }
 
    
}