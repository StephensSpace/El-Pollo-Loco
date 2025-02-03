class StartMenu extends DrawAbleObject {

    startBtn = new MenuButton('assets/menu/startBtn.png', 275, 179, 180, 50);
    soundBtn = new MenuButton('assets/menu/menuBtn.png', 275, 239, 180, 50);
    controllsBtn = new MenuButton('assets/menu/menuBtn.png', 275, 299, 180, 50);
    leftCursor = new MenuButton('assets/menu/left.png', 292.5, 284, 45, 45);
    upCursor = new MenuButton('assets/menu/jump.png', 337.5, 244, 45, 45);
    rightCursor = new MenuButton('assets/menu/right.png', 382.5, 284, 45, 45);
    spaceBar = new MenuButton('assets/menu/Spacebar.png', 283, 202, 155, 40);
    backBtn = new MenuButton('assets/menu/backBtn.png', 420, 130, 40, 40);
    startscreen;
    controls = false;

    constructor(ctx) {
        super().loadImage('assets/menu/menuBackground.png');
        this.ctx = ctx;
        this.buttons = ['Start', 'Sound On', 'Controls'];
        this.selectedButtonIndex = 0;
        this.updateSoundBtnText()
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.addEventListeners();
    }

    drawStartMenu() {
        const menuWidth = 250;
        const menuHeight = 300;
        const menuX = (this.ctx.canvas.width - menuWidth) / 2;
        const menuY = (this.ctx.canvas.height - menuHeight) / 2;
        this.ctx.drawImage(this.img, menuX, menuY, menuWidth, menuHeight);
        if (!this.controls) {
            this.drawMainMenu(menuX, menuY, menuWidth);
        } else {
            this.drawControlsMenu(menuY);
        }
        this.drawNavigationBox();
    }

    drawMainMenu(menuX, menuY, menuWidth) {
        this.startBtn.draw(this.ctx);
        this.soundBtn.draw(this.ctx);
        this.controllsBtn.draw(this.ctx);
        this.drawTitleText('El Pollo Loco', this.ctx.canvas.width / 2, menuY + 70, 28, 'gold');
        this.ctx.font = '24px Comic Sans MS';
        this.buttons.forEach((text, index) => {
            const buttonX = menuX + menuWidth / 2;
            const buttonY = menuY + 120 + index * 60;
            this.ctx.fillStyle = index === this.selectedButtonIndex ? 'red' : 'white';
            this.ctx.fillText(text, buttonX, buttonY);
        });
    }

    drawControlsMenu(menuY) {
        this.drawTitleText('Controls', this.ctx.canvas.width / 2 - 5, menuY + 70, 30, 'gold');
        this.leftCursor.draw(this.ctx);
        this.upCursor.draw(this.ctx);
        this.rightCursor.draw(this.ctx);
        this.spaceBar.draw(this.ctx);
        this.backBtn.draw(this.ctx);
        this.drawControlText('Pause - ESC', 360.5, 194);
        this.drawControlText('Go left', 316, 341);
        this.drawControlText('Jump', 362, 304);
        this.drawControlText('Go right', 405, 341);
        this.drawControlText('Throw - Space', 360.5, 224, 'white');
    }

    drawNavigationBox() {
        const boxX = 500;
        const boxY = 20;
        const boxWidth = 180;
        const boxHeight = 100;
        this.ctx.fillStyle = 'transparent';
        this.ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        this.drawTitleText(`Arrow Keys to Navigate`, boxX + boxWidth / 2, boxY + 25, 20, 'gold');
        this.drawTitleText('Enter    -   Confirm/Back', boxX + boxWidth / 2, boxY + 50, 20, 'gold');
        this.drawTitleText('F        -   Fullscreen', boxX + boxWidth / 2, boxY + 75, 20, 'gold');
    }

    drawTitleText(text, x, y, fontSize, color) {
        this.ctx.font = `${fontSize}px Comic Sans MS`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }

    drawControlText(text, x, y, color = 'gold') {
        this.ctx.font = '17px Comic Sans MS';
        this.ctx.fillStyle = color;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }

    addEventListeners() {
        if (isMobileDevice()) {
            canvas.addEventListener('touchstart', this.handleTouchStart);
        } else {
            window.addEventListener('keydown', this.handleKeyDown);
            canvas.addEventListener('mousedown', this.handleMouseClick);
            canvas.addEventListener('mousemove', this.handleMouseMove);
        }
    }
    
    removeEventListeners() {
        if (isMobileDevice()) {
            canvas.removeEventListener('touchstart', this.handleTouchStart);
        } else {
            window.removeEventListener('keydown', this.handleKeyDown);
            canvas.removeEventListener('mousedown', this.handleMouseClick);
            canvas.removeEventListener('mousemove', this.handleMouseMove);
        }
    }

    handleMouseMove(e) {
        let hoveredButton = this.getClickedButton(e.clientX, e.clientY);
        
        if (hoveredButton) {
            // Vergleiche mit der tatsächlichen Instanz des Buttons
            if (hoveredButton === this.startBtn) {
                this.selectedButtonIndex = 0;
            } else if (hoveredButton === this.soundBtn) {
                this.selectedButtonIndex = 1;
            } else if (hoveredButton === this.controllsBtn) {
                this.selectedButtonIndex = 2;
            } else if (hoveredButton === this.backBtn) {
                this.selectedButtonIndex = 3;
            }

        }
    }

    handleTouchStart(e) {
        e.preventDefault();
        let touch = e.touches ? e.touches[0] : e; // Falls Maus-Event, nehme direkt `e`
        let x = touch.clientX;
        let y = touch.clientY;
    
        let clickedButton = this.getClickedButton(x, y);
        if (clickedButton) {
            this.handleButtonClick(clickedButton);
        }
    }

    handleMouseClick(e) {
        this.handleTouchStart(e);
    }

    getClickedButton(x, y) {
        const { adjustedX, adjustedY } = this.getAdjustedCoordinates(x, y);
        let buttons = [this.startBtn, this.soundBtn, this.controllsBtn, this.backBtn];

        for (let button of buttons) {
            if (this.controls && button === this.backBtn) {
                if (this.adjustCalculationOne(adjustedX, adjustedY, button)) {
                    return button;
                }
            } else if (button !== this.backBtn) {
                if (this.adjustCalculationOne(adjustedX, adjustedY, button)) {
                    return button;
                }
            }
        } return null;
    }

    adjustCalculationOne(adjustedX, adjustedY, button) {
        return (adjustedX >= button.posX &&
            adjustedX <= button.posX + button.width &&
            adjustedY >= button.posY &&
            adjustedY <= button.posY + button.height)
    }

    handleKeyDown(e) {
        if (e.key === 'ArrowUp') {
            this.selectedButtonIndex =
                (this.selectedButtonIndex - 1 + this.buttons.length) % this.buttons.length;
        } else if (e.key === 'ArrowDown') {
            this.selectedButtonIndex = (this.selectedButtonIndex + 1) % this.buttons.length;
        } else if (e.key === 'Enter') {
            this.handleButtonClick();
        } else if (e.key === 'f' || e.key === 'F') {
            document.fullscreenElement ? document.exitFullscreen() : canvas.requestFullscreen();
        }
    }

    getAdjustedCoordinates(x, y) {
        const canvas = document.querySelector('canvas');
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
            adjustedX: (x - rect.left) * scaleX,
            adjustedY: (y - rect.top) * scaleY
        };
    }

    handleButtonClick(button = null) {
        if (this.controls) {
            this.controls = false;
        } else {
            let selectedButton = button ? button : this.buttons[this.selectedButtonIndex];
            if (selectedButton === 'Start' || button === this.startBtn) {
                this.caseStart();
            } else if (selectedButton === 'Sound On' || selectedButton === 'Sound Off' || button === this.soundBtn) {
                this.caseSound();
            } else if (selectedButton === 'Controls' || button === this.controllsBtn || button === this.backBtn) {
                this.controls = !this.controls;
            }
        }
    }

    caseStart() {
        this.stop();
        this.removeEventListeners();
        Gameinit();
    }

    caseSound() {
        this.toggleSound();
        this.updateSoundBtnText();
    }

    toggleSound() {
        SoundOn = !SoundOn; // Umschalten zwischen true und false

    }

    updateSoundBtnText() {
        this.buttons[1] = SoundOn ? 'Sound On' : 'Sound Off';
    }
}


