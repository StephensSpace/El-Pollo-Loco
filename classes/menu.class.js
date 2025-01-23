class StartMenu extends DrawAbleObject {

    startBtn = new MenuButton('../assets/menu/startBtn.png', 275, 179, 180, 50);
    soundBtn = new MenuButton('../assets/menu/menuBtn.png', 275, 229, 180, 50);
    controllsBtn = new MenuButton('../assets/menu/menuBtn.png', 275, 279, 180, 50)
    startscreen;
    constructor(ctx) {
        super().loadImage('../assets/menu/menuBackground.png');
        this.ctx = ctx;
        this.buttons = ['Start', 'Sound On', 'Controls'];
        this.selectedButtonIndex = 0;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.addEventListeners();
    }

    drawMenu() {
        const menuWidth = 250;
        const menuHeight = 300;
        const menuX = (this.ctx.canvas.width - menuWidth) / 2;
        const menuY = (this.ctx.canvas.height - menuHeight) / 2;
        const startButtonX = menuX + (menuWidth - 150) / 2;
        const startButtonY = menuY + 80; // Y-Position des Start-Buttons

        // Bild zeichnen
        this.ctx.drawImage(this.img, menuX, menuY, menuWidth, menuHeight);
        this.startBtn.draw(this.ctx);
        this.soundBtn.draw(this.ctx);
        this.controllsBtn.draw(this.ctx);


        this.ctx.font = '30px Comic Sans MS';  // Comic Sans MS als Schriftart
        this.ctx.fillStyle = 'gold';  // Goldene Farbe
        this.ctx.textAlign = 'center';
        this.ctx.fillText('El Pollo Loco', this.ctx.canvas.width / 2, menuY + 70);  // Überschrift mittig ganz oben


        this.ctx.font = '24px Arial';
        this.buttons.forEach((text, index) => {
            const buttonX = menuX + menuWidth / 2;
            const buttonY = menuY + 120 + index * 50;

            // Button Textfarbe basierend auf der Auswahl
            this.ctx.fillStyle = index === this.selectedButtonIndex ? 'red' : 'white';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(text, buttonX, buttonY);
        });
    }

    addEventListeners() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowUp') {
            this.selectedButtonIndex =
                (this.selectedButtonIndex - 1 + this.buttons.length) % this.buttons.length;
        } else if (e.key === 'ArrowDown') {
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % this.buttons.length;
        } else if (e.key === 'Enter') {
            this.handleButtonClick();
        }
    }

    handleButtonClick() {
        const selectedButton = this.buttons[this.selectedButtonIndex];
        if (selectedButton === 'Start') {
            this.stop();  // Event-Listener vor Gameinit entfernen
            Gameinit();
        } else if (selectedButton === 'Sound On' || selectedButton === 'Sound Off') {
            this.toggleSound();
            this.updateSoundBtnText();
        } else if (selectedButton === 'Exit') {
            console.log('Spiel verlassen!');
        }
    }

    toggleSound() {
        SoundOn = !SoundOn; // Umschalten zwischen true und false
        
    }

    updateSoundBtnText() {
        this.buttons[1] = SoundOn ? 'Sound On' : 'Sound Off';
    }
}