class EndMenu extends DrawAbleObject {
    //startBtn = new MenuButton('../assets/menu/startBtn.png', 275, 179, 180, 50);
    Yes = new MenuButton('../assets/menu/menuBtn.png', 285, 229, 60, 40);
    No = new MenuButton('../assets/menu/menuBtn.png', 375, 229, 60, 40);

    constructor() {
        super().loadImage('../assets/menu/menuBackground.png');
        this.posX = 210;
        this.posY = 140;
        this.width = 300;
        this.height = 200;
        
    }
 
    drawMenu(ctx){
        this.startBtn.draw(ctx);
    }
}