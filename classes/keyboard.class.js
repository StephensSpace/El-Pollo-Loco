class Keyboard {
  links = false;
  rechts = false;
  jump = false;
  throw = false;
  pause = false;
  selectedButtonIndex = 0;
  buttons = ['Continue', 'Sound On', 'Exit'];
  endMenuButtons = ['Yes', 'No'];
  selectedEndMenuButtonIndex = 0;

  constructor(ctx, world) {
    this.ctx = ctx;
    this.world = world;
    this.controls = [
      { id: 'left', prop: 'links' },
      { id: 'right', prop: 'rechts' },
      { id: 'jump', prop: 'jump' },
      { id: 'throw', prop: 'throw' }
    ];
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addIngameListener();
  }

  addIngameListener() {
    if (isMobileDevice()) {
      this.addTouchControls();
      this.addSpecialControls();
    } else {
      window.addEventListener("keydown", this.keyDownHandler.bind(this));
      window.addEventListener("keyup", this.keyUpHandler.bind(this));
    }
  }

  addTouchControls() {
    this.controls.forEach(control => {
      const btn = document.getElementById(control.id);
      btn.addEventListener("touchstart", () => this[control.prop] = true);
      btn.addEventListener("touchend", () => this[control.prop] = false);
    });
  }

  addSpecialControls() {
    document.getElementById('pause').addEventListener("touchstart", () => {
      this.pause = !this.pause;
      this.toggleListeners();
    });

    document.getElementById('fullscreen').addEventListener("touchstart", () => canvas.requestFullscreen());
  }

  removeIngameListener() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }

  keyDownHandler(event) {
    switch (event.code) {
      case "ArrowLeft":
        this.links = true;
        break;
      case "ArrowRight":
        this.rechts = true;
        break;
      case "ArrowUp":
        this.jump = true;
        break;
      case "Space":
        this.throw = true;
        break;
      case "KeyF":
        canvas.requestFullscreen();
        break;
      case "Escape":
        this.pause = !this.pause;
        this.toggleListeners();
        break;
    }
  }

  keyUpHandler(event) {
    switch (event.code) {
      case "ArrowLeft":
        this.links = false;
        break;
      case "ArrowRight":
        this.rechts = false;
        break;
      case "ArrowUp":
        this.jump = false;
        break;
      case "Space":
        this.throw = false;
        break;
    }
  }

  toggleListeners() {
    if (this.pause || this.world.level.endboss.Won || this.world.character.Lost) {
      this.removeIngameListener();
      this.addPauseMenuListeners();
    } else {
      this.removePauseMenuListeners();
      this.addIngameListener();
    }
  }

  addPauseMenuListeners() {
    if (isMobileDevice()) {
      canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });  // Touch-Listener für mobile Geräte
    } else {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }

  removePauseMenuListeners() {
    if (isMobileDevice()) {
      canvas.removeEventListener('touchstart', this.handleTouchStart);
    } else {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  handleTouchStart(e) {
    e.preventDefault();  // Verhindert das Standardverhalten
    let touch = e.touches[0];  // Nimmt das erste Touch-Ereignis
    let x = touch.clientX;
    let y = touch.clientY;

    let clickedButton = this.getTouchedButton(x, y);
    if (clickedButton) {
      this.handleTouchButtonClick(clickedButton);
    }
  }

  handleTouchButtonClick(clickedButton) {
    if (this.pause) {
      if (clickedButton === 'Continue') {
        this.pause = false;
        this.removePauseMenuListeners();
        this.addIngameListener();
      } else if (clickedButton === 'Sound On' || clickedButton === 'Sound Off') {
        this.toggleSounds();
        this.world.sounds.playChickenSound();
        this.world.sounds.playBackgroundSound();
        this.world.updateSoundBtnText();
      } else if (clickedButton === 'Exit') {
        this.world.running = false;
        this.removePauseMenuListeners();
        init();
      }
    } else {
      if (clickedButton === 'Yes') {
        Gameinit();
      } else if (clickedButton === 'No') {
        init();
      }
    }
  }

  getTouchedButton(x, y) {
    const buttonAreas = [
        { text: 'Continue', x: 360, y: 210, width: 200, height: 40 },
        { text: 'Sound On', x: 360, y: 260, width: 200, height: 40 },
        { text: 'Exit', x: 360, y: 310, width: 200, height: 40 },
        { text: 'Yes', x: 360, y: 210, width: 200, height: 40 },  // end menu buttons
        { text: 'No', x: 360, y: 260, width: 200, height: 40 },
    ];
    for (let button of buttonAreas) {
        if (x >= button.x - button.width / 2 && x <= button.x + button.width / 2 &&
            y >= button.y - button.height / 2 && y <= button.y + button.height / 2) {
            return button.text;
        }
    } return null;
}

  handleKeyDown(e) {
    if (!this.pause) {
      if (e.key === 'ArrowLeft') {
        this.selectedEndMenuButtonIndex =
          (this.selectedEndMenuButtonIndex - 1 + this.endMenuButtons.length) % this.endMenuButtons.length;
      } else if (e.key === 'ArrowRight') {
        this.selectedEndMenuButtonIndex = (this.selectedEndMenuButtonIndex + 1) % this.endMenuButtons.length;
      } else if (e.key === 'Enter') {
        this.handleEndMenuButtonClick();
      } else if (e.key === 'f' || e.key === 'F') {
        canvas.requestFullscreen();
      }
    } else {
      if (e.key === 'ArrowUp') {
        this.selectedButtonIndex =
          (this.selectedButtonIndex - 1 + this.buttons.length) % this.buttons.length;
      } else if (e.key === 'ArrowDown') {
        this.selectedButtonIndex = (this.selectedButtonIndex + 1) % this.buttons.length;
      } else if (e.key === 'Enter') {
        this.handleButtonClick();
      } else if (e.key === 'f' || e.key === 'F') {
        canvas.requestFullscreen();
      }
    }
  }

  handleEndMenuButtonClick() {
    const selectedButton = this.endMenuButtons[this.selectedEndMenuButtonIndex];
    if (selectedButton === 'Yes') {
      Gameinit();
    } else if (selectedButton === 'No') {
      init();
    }
  }

  handleButtonClick() {
    const selectedButton = this.buttons[this.selectedButtonIndex];
    if (selectedButton === 'Continue') {
      this.pause = false;
      this.removePauseMenuListeners();
      this.addIngameListener();
    } else if (selectedButton === 'Sound On' || selectedButton === 'Sound Off') {
      this.toggleSounds();
      this.world.sounds.playChickenSound();
      this.world.sounds.playBackgroundSound();
      this.world.updateSoundBtnText();
    } else if (selectedButton === 'Exit') {
      this.world.running = false;
      this.removePauseMenuListeners();
      init();
    }
  }

  toggleSounds() {
    SoundOn = !SoundOn;
  }

  setButtons() {
    this.buttons.forEach((text, index) => {
      const buttonX = 360;
      const buttonY = 210 + index * 50;
      this.world.ctx.fillStyle = index === this.selectedButtonIndex ? 'red' : 'white';
      this.world.ctx.textAlign = 'center';
      this.world.ctx.fillText(text, buttonX, buttonY);
    });
  }


}