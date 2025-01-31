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
    e.preventDefault();  // Verhindert das Standardverhalten
    let clickedButton
    let touch = e.touches[0];  // Nimmt das erste Touch-Ereignis
    let x = touch.clientX;
    let y = touch.clientY;
    if (this.world.character.Lost || this.world.level.endboss.Won) {
      clickedButton = this.getTouchedButtonEndMenu(x, y);
      if (clickedButton) {
        this.handleTouchButtonClick(clickedButton);
      }
    } else {
      clickedButton = this.getTouchedButton(x, y);
      if (clickedButton) {
        this.handleTouchButtonClick(clickedButton);
      }
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
        this.pause = false;
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
      { text: 'Continue', x: 275, y: 179, width: 180, height: 50 },
      { text: 'Sound On', x: 275, y: 239, width: 180, height: 50 },
      { text: 'Exit', x: 275, y: 299, width: 180, height: 50 }
    ];
    for (let button of buttonAreas) {

      if (
        x >= button.x - 30 &&
        x <= button.x + button.width &&
        y >= button.y - 60 &&
        y <= button.y - 60 + button.height
      ) {
        return button.text;
      }
    }
    return null;
  }

  getTouchedButtonEndMenu(x, y) {
    const buttonAreas2 = [
      { text: 'Yes', x: 270, y: 185, width: 60, height: 40 },  // Endmenü-Buttons
      { text: 'No', x: 375, y: 185, width: 60, height: 40 }
    ];
  
    let clickedButton = null;  // Variable, um den gefundenen Button zu speichern
    buttonAreas2.forEach(button2 => {
      console.log(button2); // Debugging, um sicherzustellen, dass die Werte korrekt sind
      if (
        x >= button2.x &&
        x <= button2.x + button2.width &&
        y >= button2.y &&
        y <= button2.y + button2.height
      ) {
        console.log("Button wurde berührt:", button2.text);
        clickedButton = button2.text;  // Speichern des Texts des berührten Buttons
      }
    });
    return clickedButton;  // Rückgabe des Texts des berührten Buttons (oder null, wenn keiner berührt wurde)
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
      const buttonY = 210 + index * 60;
      this.world.ctx.fillStyle = index === this.selectedButtonIndex ? 'red' : 'white';
      this.world.ctx.textAlign = 'center';
      this.world.ctx.fillText(text, buttonX, buttonY);
    });
  }


}