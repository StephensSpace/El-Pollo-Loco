
/**
 * Manages keyboard and touch controls for game interaction, including event listeners for keyboard and touch inputs.
 */
class Keyboard {
  links = false;
  rechts = false;
  jump = false;
  throw = false;

  world;
  selectedButtonIndex = 0;
  buttons = ['Continue', 'Sound On', 'Exit'];
  endMenuButtons = ['Yes', 'No'];
  selectedEndMenuButtonIndex = 0;

  /**
     * Initializes the Keyboard class by setting up control mappings and event handlers.
     * The constructor binds the necessary methods for keyboard, mouse, and touch events.
     */
  constructor() {
    this.controls = [
      { id: 'left', prop: 'links' },
      { id: 'right', prop: 'rechts' },
      { id: 'jump', prop: 'jump' },
      { id: 'throw', prop: 'throw' }
    ];
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.lost = false;
    this.won = false;
    this.pause = false;
    this.addIngameListener();
  }

  /**
     * Adds event listeners for keyboard and touch controls during gameplay.
     * Checks if the device is mobile and sets up touch controls accordingly.
     */
  addIngameListener() {
    if (isMobileDevice()) {
      this.addTouchControls();
      this.addSpecialControls();
    }
    window.addEventListener("keydown", this.keyDownHandler);
    window.addEventListener("keyup", this.keyUpHandler);
  }

  /**
     * Adds touch control event listeners to each button defined in the `controls` array.
     * Each button has a 'touchstart' and 'touchend' event to toggle the corresponding action.
     */
  addTouchControls() {
    this.controls.forEach(control => {
      const btn = document.getElementById(control.id);
      btn.addEventListener("touchstart", (event) => {
        event.preventDefault();
        this[control.prop] = true;
      }, { passive: false });
      btn.addEventListener("touchend", (event) => {
        event.preventDefault();
        this[control.prop] = false;
      });
    });
  }

  /**
     * Adds special touch controls such as the pause button and fullscreen button.
     */
  addSpecialControls() {
    document.getElementById('pause').addEventListener("touchstart", () => {
      this.pause = !this.pause;
      this.toggleListeners();
    }, { passive: false });

    document.getElementById('fullscreen').addEventListener("touchstart", () => toggleFullscreen(), { passive: false });
  }

  /**
   * Removes the keyboard event listeners for gameplay.
   */
  removeIngameListener() {
    window.removeEventListener("keydown", this.keyDownHandler);
    window.removeEventListener("keyup", this.keyUpHandler);
  }

  /**
   * Removes all event listeners related to restarting the game.
   * This includes listeners for keyboard, mouse, and touch events.
   */
  removeEventListenersRestart() {
    window.removeEventListener('keydown', this.keyDownHandler);
    window.removeEventListener('keyup', this.keyUpHandler);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('touchstart', this.handleTouchStart);
  }

  /**
   * Handles mouse down events to detect which button was pressed in the menu.
   * Depending on whether the game is paused or not, it triggers the corresponding menu action.
   * @param {MouseEvent} e - The mouse down event.
   */
  handleMouseDown(e) {
    let x = e.clientX;
    let y = e.clientY;
    if (this.pause) {
      this.getMenuTouchedBtn(x, y);
    } else {
      this.getEndMenuTouchedBtn(x, y);
    }
  }

  /**
 * Handles the mouse movement events during gameplay or menu interactions.
 * It checks whether the game is paused and updates the selected button index accordingly.
 * 
 * @param {MouseEvent} e - The mouse move event.
 */
  handleMouseMove(e) {
    const { adjustedX, adjustedY } = this.getAdjustedCoordinates(e.clientX, e.clientY);
    if (this.pause) {
      const hoveredButtonIndex = this.getPauseMenuHoveredButtonIndex(adjustedX, adjustedY);
      if (hoveredButtonIndex !== this.selectedButtonIndex) {
        this.selectedButtonIndex = hoveredButtonIndex;
        this.setButtons();
      }
    } else {
      const hoveredButtonIndex = this.getEndMenuHoveredButtonIndex(adjustedX, adjustedY);
      if (hoveredButtonIndex !== this.selectedEndMenuButtonIndex) {
        this.selectedEndMenuButtonIndex = hoveredButtonIndex;
      }
    }
  }

  /**
  * Gets the index of the hovered button in the end menu based on the mouse coordinates.
  * 
  * @param {number} x - The adjusted x-coordinate of the mouse.
  * @param {number} y - The adjusted y-coordinate of the mouse.
  * @returns {number} - The index of the hovered button, or -1 if no button is hovered.
  */
  getEndMenuHoveredButtonIndex(x, y) {
    const buttonAreas = [
      { text: 'Yes', x: 285, y: 229, width: 60, height: 40 },
      { text: 'No', x: 375, y: 229, width: 60, height: 40 }
    ];
    return buttonAreas.findIndex(button =>
      x >= button.x &&
      x <= button.x + button.width &&
      y >= button.y &&
      y <= button.y + button.height
    );
  }

  /**
  * Gets the index of the hovered button in the pause menu based on the mouse coordinates.
  * 
  * @param {number} x - The adjusted x-coordinate of the mouse.
  * @param {number} y - The adjusted y-coordinate of the mouse.
  * @returns {number} - The index of the hovered button, or -1 if no button is hovered.
  */
  getPauseMenuHoveredButtonIndex(x, y) {
    const buttonAreas = [
      { text: 'Continue', x: 275, y: 179, width: 180, height: 50 },
      { text: 'Sound On', x: 275, y: 239, width: 180, height: 50 },
      { text: 'Exit', x: 275, y: 299, width: 180, height: 50 }
    ];
    return buttonAreas.findIndex(button =>
      x >= button.x &&
      x <= button.x + button.width &&
      y >= button.y &&
      y <= button.y + button.height
    );
  }

  /**
  * Handles the keydown events for game controls and special actions such as pausing and fullscreen.
  * 
  * @param {KeyboardEvent} event - The keydown event.
  */
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

  /**
  * Handles the keyup events for game controls to release actions such as movement and throwing.
  * 
  * @param {KeyboardEvent} event - The keyup event.
  */
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

  /**
  * Toggles the event listeners based on the current game state (paused, won, or lost).
  * If the game is paused or ended, it switches to pause menu listeners; otherwise, it switches to ingame listeners.
  */
  toggleListeners() {
    if (this.pause || this.won || this.lost) {
      this.removeIngameListener();
      this.addPauseMenuListeners();
    } else {
      this.removePauseMenuListeners();
      this.addIngameListener();
    }
  }

  /**
  * Adds event listeners specific to the pause menu, such as touch and mouse controls.
  */
  addPauseMenuListeners() {
    if (isMobileDevice()) {
      canvas.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    } else {
      canvas.addEventListener('mousedown', this.handleMouseDown);
      window.addEventListener('keydown', this.handleKeyDown);
      canvas.addEventListener('mousemove', this.handleMouseMove);
    }
  }

  /**
 * Removes the event listeners specific to the pause menu, based on whether the device is mobile or not.
 */
  removePauseMenuListeners() {
    if (isMobileDevice()) {
      canvas.removeEventListener('touchstart', this.handleTouchStart);
    } else {
      canvas.removeEventListener('mousedown', this.handleMouseDown);
      window.removeEventListener('keydown', this.handleKeyDown);
      canvas.removeEventListener('mousemove', this.handleMouseMove);
    }
  }

  /**
  * Handles the touchstart event to detect the touch position and invoke the appropriate menu interaction.
  * 
  * @param {TouchEvent} e - The touchstart event.
  */
  handleTouchStart(e) {
    e.preventDefault();
    let touch = e.touches[0];
    let x = touch.clientX;
    let y = touch.clientY;
    if (this.pause) {
      this.getMenuTouchedBtn(x, y);
    } else {
      this.getEndMenuTouchedBtn(x, y);
    }
  }

  /**
  * Determines if a button in the end menu was touched and handles the interaction.
  * 
  * @param {number} x - The x-coordinate of the touch event.
  * @param {number} y - The y-coordinate of the touch event.
  */
  getEndMenuTouchedBtn(x, y) {
    const clickedButton = this.getTouchedButtonEndMenu(x, y);
    if (clickedButton) {
      this.handleTouchButtonClick(clickedButton);
    }
  }

  /**
  * Determines if a button in the pause menu was touched and handles the interaction.
  * 
  * @param {number} x - The x-coordinate of the touch event.
  * @param {number} y - The y-coordinate of the touch event.
  */
  getMenuTouchedBtn(x, y) {
    const clickedButton = this.getTouchedButton(x, y);
    if (clickedButton) {
      this.handleTouchButtonClick(clickedButton);
    }
  }

  /**
  * Handles the touch button click action based on the button that was clicked.
  * 
  * @param {string} clickedButton - The name of the clicked button.
  */
  handleTouchButtonClick(clickedButton) {
    if (this.pause) {
      this.pauseMenuClicks(clickedButton);
    } else {
      this.endMenuClicks(clickedButton);
    }
  }

  /**
  * Handles the actions for buttons in the pause menu.
  * 
  * @param {string} clickedButton - The name of the clicked button.
  */
  pauseMenuClicks(clickedButton) {
    if (clickedButton === 'Continue') {
      this.caseContinue();
    } else if (clickedButton === 'Sound On' || clickedButton === 'Sound Off') {
      this.caseSound();
    } else if (clickedButton === 'Exit') {
      this.caseExit();
    }
  }

  /**
  * Handles the actions for buttons in the end menu.
  * 
  * @param {string} clickedButton - The name of the clicked button.
  */
  endMenuClicks(clickedButton) {
    if (clickedButton === 'Yes') {
      Gameinit();
    } else if (clickedButton === 'No') {
      this.caseExit();
    }
  }

  /**
 * Handles the "Continue" action when the continue button is clicked.
 * Resumes the game and removes pause menu listeners.
 */
  caseContinue() {
    this.pause = false;
    this.removePauseMenuListeners();
    this.addIngameListener();
  }

  /**
  * Handles the "Sound" action when the sound button is clicked.
  * Toggles the sound state and updates the sound button text.
  */
  caseSound() {
    this.toggleSounds();
    playSounds();
    this.world.updateSoundBtnText();
  }

  /**
  * Handles the "Exit" action when the exit button is clicked.
  * Resumes the game and resets the game state.
  */
  caseExit() {
    this.pause = false;
    this.removePauseMenuListeners();
    init();
  }

  /**
  * Gets the text of the button that was touched in the pause menu.
  * 
  * @param {number} x - The x-coordinate of the touch event.
  * @param {number} y - The y-coordinate of the touch event.
  * @returns {string|null} - The text of the button if touched, otherwise null.
  */
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

  /**
  * Gets the text of the button that was touched in the end menu.
  * 
  * @param {number} x - The x-coordinate of the touch event.
  * @param {number} y - The y-coordinate of the touch event.
  * @returns {string|null} - The text of the button if touched, otherwise null.
  */
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

  /**
  * Adjusts the coordinates of a touch event to match the canvas scale.
  * 
  * @param {number} x - The x-coordinate of the touch event.
  * @param {number} y - The y-coordinate of the touch event.
  * @returns {Object} - An object containing the adjusted x and y coordinates.
  */
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

  /**
  * Handles the keydown event when the game is either paused or not.
  * Calls the appropriate handler based on the pause state.
  * 
  * @param {KeyboardEvent} e - The keydown event.
  */
  handleKeyDown(e) {
    if (!this.pause) {
      this.notPaused(e);
    } else {
      this.paused(e)
    }
  }

  /**
  * Handles keydown events when the game is not paused.
  * Allows for navigation through the end menu and fullscreen toggle.
  * 
  * @param {KeyboardEvent} e - The keydown event.
  */
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

  /**
  * Handles the keydown event when the game is paused.
  * Allows navigation through the pause menu and fullscreen toggle.
  * 
  * @param {KeyboardEvent} e - The keydown event.
  */
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

  /**
  * Handles the click event for the end menu buttons (Yes/No).
  * Calls `Gameinit()` if "Yes" is selected, or `init()` if "No" is selected.
  */
  handleEndMenuButtonClick() {
    const selectedButton = this.endMenuButtons[this.selectedEndMenuButtonIndex];
    if (selectedButton === 'Yes') {
      Gameinit();
    } else if (selectedButton === 'No') {
      init();
    }
  }

  /**
  * Handles the click event for the pause menu buttons (Continue, Sound, Exit).
  * Calls the appropriate method for the selected button.
  */
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

  /**
  * Toggles the sound state between on and off.
  * Updates the global `SoundOn` variable.
  */
  toggleSounds() {
    SoundOn = !SoundOn;
  }

  /**
  * Sets the position and appearance of the buttons in the pause menu.
  * Highlights the selected button in red and positions them vertically.
  */
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