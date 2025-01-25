class Keyboard {
  links = false;
  rechts = false;
  jump = false;
  throw = false;
  pause = false;
  selectedButtonIndex = 0;
  buttons = ['Continue', 'Sound On', 'Exit']

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

  // Methode für "Taste gedrückt"
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
      case "Escape": // Pause umschalten
        this.pause = !this.pause;
        this.toggleListeners();
        break;
    }
  }

  // Methode für "Taste losgelassen"
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
    console.log("Pause status:", this.pause);
    if (this.pause) {
      this.removeIngameListener();
      this.addPauseMenuListeners();
      console.log("Pause menu listeners added");
    } else {
      this.removePauseMenuListeners();
      this.addIngameListener();
      console.log("Ingame listeners added");
    }
  }

  
  addPauseMenuListeners() { 
    window.addEventListener('keydown', this.handleKeyDown);
  }
  
  removePauseMenuListeners() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    console.log("Taste gedrückt:", e.key); // Debugging
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
      if (selectedButton === 'Continue') {
        this.pause = false;
        this.removePauseMenuListeners();
        this.addIngameListener();
      } else if (selectedButton === 'Sound On' || selectedButton === 'Sound Off') {
        this.toggleSound();
        this.updateSoundBtnText();
      } else if (selectedButton === 'Exit') {
        this.world.running = false;
        this.removePauseMenuListeners();
        init();
      }

  }

 

  toggleSound() {
    SoundOn = !SoundOn; // Umschalten zwischen true und false

  }

  updateSoundBtnText() {
    this.buttons[1] = SoundOn ? 'Sound On' : 'Sound Off';
  }

}