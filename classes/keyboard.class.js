class Keyboard {
    links = false;
    rechts = false;
    jump = false;

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
        case "Space": // Leertaste
          this.jump = true;
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
        case "Space":
          this.jump = false;
          break;
      }
    }
  }