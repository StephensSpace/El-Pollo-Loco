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
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.addIngameListener();
  }

  addIngameListener() {
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  }

  removeIngameListener() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }

  keyDownHandler(event) {
    switch (event.code) {
      case "ArrowLeft": // Linke Pfeiltaste
        this.links = true;
        break;
      case "ArrowRight": // Rechte Pfeiltaste
        this.rechts = true;
        break;
      case "ArrowUp": // Sprungtaste
        this.jump = true;
        break;
      case "Space": // Werfen
        this.throw = true;
        break;
      case "KeyF": // Werfen
        canvas.requestFullscreen();
        break;
      case "Escape": // Pause umschalten
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
    window.addEventListener('keydown', this.handleKeyDown);
  }

  removePauseMenuListeners() {
    window.removeEventListener('keydown', this.handleKeyDown);
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