class Keyboard {
  links = false;
  rechts = false;
  jump = false;
  throw = false;
  pause = false;
  world;
  selectedButtonIndex = 0;
  buttons = ['Continue', 'Sound On', 'Exit'];
  endMenuButtons = ['Yes', 'No'];
  selectedEndMenuButtonIndex = 0;

  constructor(ctx) {
    this.ctx = ctx;
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
      btn.addEventListener("touchstart", (event) => {
        event.preventDefault();
        this[control.prop] = true;
      });
      btn.addEventListener("touchend", (event) => {
        event.preventDefault();
        this[control.prop] = false;
      });
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
      canvas.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: false });  // Touch-Listener für mobile Geräte
    } else {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }

  removePauseMenuListeners() {
    if (isMobileDevice()) {
      canvas.removeEventListener('touchstart', this.handleTouchStart.bind(this));
    } else {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  handleTouchStart(e) {
    e.preventDefault();
    let touch = e.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    if (this.world.character.Lost || this.world.level.endboss.Won) {
      this.getEndMenuTouchedBtn(x, y)
    } else {
      this.getMenuTouchedBtn(x, y)
    }
  }

  getEndMenuTouchedBtn(x, y) {
    const clickedButton = this.getTouchedButtonEndMenu(x, y);
    if (clickedButton) {
      this.handleTouchButtonClick(clickedButton);
    }
  }

  getMenuTouchedBtn(x, y) {
    const clickedButton = this.getTouchedButton(x, y);
    if (clickedButton) {
      this.handleTouchButtonClick(clickedButton);
    }
  }

  handleTouchButtonClick(clickedButton) {
    if (this.pause) {
      this.pauseMenuClicks(clickedButton)
    } else {
      this.endMenuClicks(clickedButton)
    }
  }

  pauseMenuClicks(clickedButton) {
    if (clickedButton === 'Continue') {
      this.caseContinue()
    } else if (clickedButton === 'Sound On' || clickedButton === 'Sound Off') {
      this.caseSound()
    } else if (clickedButton === 'Exit') {
      this.caseExit()
    }
  }

  endMenuClicks(clickedButton) {
    if (clickedButton === 'Yes') {
      Gameinit();
    } else if (clickedButton === 'No') {
      init();
    }
  }

  caseContinue() {
    this.pause = false;
    this.removePauseMenuListeners();
    this.addIngameListener();
  }

  caseSound() {
    this.toggleSounds();
    this.world.sounds.playChickenSound();
    this.world.sounds.playBackgroundSound();
    this.world.updateSoundBtnText();
  }

  caseExit() {
    this.world.running = false;
    this.removePauseMenuListeners();
    this.pause = false;
    init();
  }

  getTouchedButton(x, y) {
    const { adjustedX, adjustedY } = this.getAdjustedCoordinates(x, y);

    const buttonAreas = [
      { text: 'Continue', x: 275, y: 179, width: 180, height: 50 },
      { text: 'Sound On', x: 275, y: 239, width: 180, height: 50 },
      { text: 'Exit', x: 275, y: 299, width: 180, height: 50 }
    ];

    return buttonAreas.find(button =>
      adjustedX >= button.x &&
      adjustedX <= button.x + button.width &&
      adjustedY >= button.y &&
      adjustedY <= button.y + button.height
    )?.text || null;
  }

  getTouchedButtonEndMenu(x, y) {
    const { adjustedX, adjustedY } = this.getAdjustedCoordinates(x, y);

    const buttonAreas2 = [
      { text: 'Yes', x: 285, y: 229, width: 60, height: 40 },
      { text: 'No', x: 375, y: 229, width: 60, height: 40 }
    ];

    return buttonAreas2.find(button2 =>
      adjustedX >= button2.x &&
      adjustedX <= button2.x + button2.width &&
      adjustedY >= button2.y &&
      adjustedY <= button2.y + button2.height
    )?.text || null;
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

  handleKeyDown(e) {
    if (!this.pause) {
      this.notPaused(e);
    } else {
      this.paused(e)
    }
  }

  notPaused(e) {
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
  }

  paused(e) {
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
      this.caseContinue();
    } else if (selectedButton === 'Sound On' || selectedButton === 'Sound Off') {
      this.caseSound();
    } else if (selectedButton === 'Exit') {
      this.caseExit();
    }
  }

  toggleSounds() {
    SoundOn = !SoundOn;
  }

  setButtons() {
    this.buttons.forEach((text, index) => {
      const buttonX = 360;
      const buttonY = 210 + index * 60;
      this.world.ctx.fillStyle = index === this.selectedButtonIndex ? 'red' : 'white';
      this.world.ctx.textAlign = 'center';
      this.world.ctx.fillText(text, buttonX, buttonY);
    });
  }


}