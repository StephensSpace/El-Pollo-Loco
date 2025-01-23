class Keyboard {
  links = false;
  rechts = false;
  jump = false;
  throw = false;

  constructor() {
    this.links = false; // Zustand der linken Pfeiltaste
    this.rechts = false; // Zustand der rechten Pfeiltaste
    this.jump = false; // Zustand der Leertaste

    // Event-Listener hinzufügen
    window.addEventListener("keydown", (event) => this.keyDownHandler(event));
    window.addEventListener("keyup", (event) => this.keyUpHandler(event));
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
      case "ArrowUp": // Leertaste
        this.jump = true;
        break;
      case "Space": // Rechte Strg-Taste losgelassen
        this.throw = true;
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
      case "Space": // Rechte Strg-Taste losgelassen
        this.throw = false;
        break;
    }
  }
}