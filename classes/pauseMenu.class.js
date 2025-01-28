class PauseMenu extends DrawAbleObject {
    startBtn = new MenuButton('../assets/menu/startBtn.png', 275, 179, 180, 50);
    soundBtn = new MenuButton('../assets/menu/menuBtn.png', 275, 229, 180, 50);
    controllsBtn = new MenuButton('../assets/menu/menuBtn.png', 275, 279, 180, 50);

    constructor() {
        super().loadImage('../assets/menu/menuBackground.png');
        this.posX = 235;
        this.posY = 90;
        this.width = 250;
        this.height = 300;
        
    }
 
    
}