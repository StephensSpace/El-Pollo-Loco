class StartMenu extends DrawAbleObject {

    startBtn = new MenuButton('../assets/menu/startBtn.png', 275, 179, 180, 50);
    soundBtn = new MenuButton('../assets/menu/menuBtn.png', 275, 229, 180, 50);
    controllsBtn = new MenuButton('../assets/menu/menuBtn.png', 275, 279, 180, 50);
    leftCursor = new MenuButton('../assets/menu/left.png', 292.5, 284, 45, 45);
    upCursor = new MenuButton('../assets/menu/jump.png', 337.5, 244, 45, 45);
    rightCursor = new MenuButton('../assets/menu/right.png', 382.5, 284, 45, 45);
    spaceBar = new MenuButton('../assets/menu/Spacebar.png', 283, 202, 155, 40);
    backBtn = new MenuButton('../assets/menu/backBtn.png', 420, 130, 40, 40);
    startscreen;
    controls = false;
    constructor(ctx) {
        super().loadImage('../assets/menu/menuBackground.png');
        this.ctx = ctx;
        this.buttons = ['Start', 'Sound On', 'Controls'];
        this.selectedButtonIndex = 0;
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.addEventListeners();
    }

    drawStartMenu() {
        const menuWidth = 250;
        const menuHeight = 300;
        const menuX = (this.ctx.canvas.width - menuWidth) / 2;
        const menuY = (this.ctx.canvas.height - menuHeight) / 2;

        this.ctx.drawImage(this.img, menuX, menuY, menuWidth, menuHeight);
        if (!this.controls) {
            this.startBtn.draw(this.ctx);
            this.soundBtn.draw(this.ctx);
            this.controllsBtn.draw(this.ctx);

            this.ctx.font = '28px Comic Sans MS';  // Comic Sans MS als Schriftart
            this.ctx.fillStyle = 'gold';  // Goldene Farbe
            this.ctx.textAlign = 'center';
            this.ctx.fillText('El Pollo Loco', this.ctx.canvas.width / 2, menuY + 70);

            this.ctx.font = '24px Comic Sans MS';
            this.buttons.forEach((text, index) => {
                const buttonX = menuX + menuWidth / 2;
                const buttonY = menuY + 120 + index * 50;

                // Button Textfarbe basierend auf der Auswahl
                this.ctx.fillStyle = index === this.selectedButtonIndex ? 'red' : 'white';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(text, buttonX, buttonY);
            });
        } else {
            this.ctx.font = '30px Comic Sans MS';  // Comic Sans MS als Schriftart
            this.ctx.fillStyle = 'gold';  // Goldene Farbe
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Controls', this.ctx.canvas.width / 2 - 5, menuY + 70);

            this.leftCursor.draw(this.ctx);
            this.upCursor.draw(this.ctx);
            this.rightCursor.draw(this.ctx);
            this.spaceBar.draw(this.ctx);
            this.backBtn.draw(this.ctx);

            this.ctx.font = '16px Comic Sans MS';
            this.ctx.fillStyle = 'gold';
            this.ctx.fillText('Pause - Enter', 360.5, 194); // Kleinere Schrift für Button-Texte
            this.ctx.fillText('Go left', 316, 341);
            this.ctx.fillText('Jump', 362, 304);
            this.ctx.fillText('Go right', 405, 341);

            this.ctx.fillStyle = 'white';  // Weiße Schrift für Spacebar-Text
            this.ctx.fillText('Jump - Space', 360.5, 224);


        }
    }

    addEventListeners() {
        window.addEventListener('keydown', this.handleKeyDown);
        this.ctx.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.ctx.canvas.addEventListener('click', this.handleMouseClick.bind(this));
    }

    removeEventListeners() {
        window.removeEventListener('keydown', this.handleKeyDown);
        this.ctx.canvas.removeEventListener('mousemove', this.handleMouseMove);
        this.ctx.canvas.removeEventListener('click', this.handleMouseClick);
    }

    handleMouseMove(e) {
        const mousePos = this.getMousePosition(e);

        if (!this.controls) {
            this.checkButtonSelection(mousePos);
        } else {
            this.checkBackButton(mousePos);
        }
    }

    getMousePosition(e) {
        const rect = this.ctx.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        return { mouseX, mouseY };
    }

    checkButtonSelection({ mouseX, mouseY }) {
        this.buttons.forEach((_, index) => {
            const buttonX = 275;
            const buttonY = 179 + index * 50;
            const buttonWidth = 180;
            const buttonHeight = 50;

            if (this.isMouseOverButton(mouseX, mouseY, buttonX, buttonY, buttonWidth, buttonHeight)) {
                this.selectedButtonIndex = index;
            }
        });
    }

    isMouseOverButton(mouseX, mouseY, buttonX, buttonY, buttonWidth, buttonHeight) {
        return mouseX >= buttonX &&
            mouseX <= buttonX + buttonWidth &&
            mouseY >= buttonY &&
            mouseY <= buttonY + buttonHeight;
    }

    checkBackButton({ mouseX, mouseY }) {
        const backBtnX = 420;
        const backBtnY = 130;
        const backBtnWidth = 40;
        const backBtnHeight = 40;

        if (this.isMouseOverButton(mouseX, mouseY, backBtnX, backBtnY, backBtnWidth, backBtnHeight)) {
            this.controls = true;
        }
    }

    handleMouseClick(e) {
        this.handleButtonClick();  // Ein Klick entspricht einem Enter-Druck
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
        if (this.controls) {
            this.controls = false;  // Zurück zum Hauptmenü
        } else {
            const selectedButton = this.buttons[this.selectedButtonIndex];
            if (selectedButton === 'Start') {
                this.stop();
                this.removeEventListeners();  // Event-Listener vor Gameinit entfernen
                Gameinit();
            } else if (selectedButton === 'Sound On' || selectedButton === 'Sound Off') {
                this.toggleSound();
                this.updateSoundBtnText();
            } else if (selectedButton === 'Controls') {
                this.controls = true;
            }
        }
    }

    toggleSound() {
        SoundOn = !SoundOn; // Umschalten zwischen true und false

    }

    updateSoundBtnText() {
        this.buttons[1] = SoundOn ? 'Sound On' : 'Sound Off';
    }
}


