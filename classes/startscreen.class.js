class Startscreen extends DrawAbleObject {
    posX = 0;
    posY = 0;
    img;
    width = 720;
    height = 480;
    menu;
    canvas;
    ctx;
      // Variable zur Steuerung der Animation

    constructor(canvas) {
        super().loadImage('../assets/9_intro_outro_screens/start/startscreen_1.png');
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.menu = new StartMenu(this.ctx);  // Menü als separates Objekt übergeben
        this.draw();
    }

    draw() {
        if (!this.running) return;  // Beende die Zeichenfunktion, wenn running auf false ist
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, this.posX, this.posY, this.width, this.height);
        this.menu.drawMenu();

        requestAnimationFrame(() => this.draw());
    }

    
}