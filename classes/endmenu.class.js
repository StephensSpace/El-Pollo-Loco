class EndMenu extends DrawAbleObject {
    Yes = new MenuButton('assets/menu/menuBtn.png', 285, 229, 60, 40);
    No = new MenuButton('assets/menu/menuBtn.png', 375, 229, 60, 40);
    winText = { 
        text: 'You Won! Try Again?', 
        color: 'Gold', 
        font: '24px Comic Sans MS', 
        posX: 360, 
        posY: 210  
    };

    loseText = { 
        text: 'You Lost! Try Again?', 
        color: 'Gold', 
        font: '24px Comic Sans MS', 
        posX: 360, 
        posY: 210  
    };
    buttons = [];

    constructor() {
        super().loadImage('assets/menu/menuBackground.png');
        this.posX = 210;
        this.posY = 140;
        this.width = 300;
        this.height = 200;
        this.Yes = new MenuButton('assets/menu/menuBtn.png', 285, 229, 60, 40);
        this.No = new MenuButton('assets/menu/menuBtn.png', 375, 229, 60, 40);       
        this.buttons = [this.Yes, this.No];
        this.Yes.text = { text: 'Yes', color: 'red', font: '20px Comic Sans MS', posX: 315, posY: 255 };
        this.No.text = { text: 'No', color: 'white', font: '20px Comic Sans MS', posX: 405, posY: 255 };
    } 
}