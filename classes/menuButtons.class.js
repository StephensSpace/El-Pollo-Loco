//** Allgemeine Klasse für das erstellen von menü Buttons
// */
class MenuButton extends DrawAbleObject {

    //**Constructor für menü Buttons mit
    //  variablem Pfad fürd as Laden der
    //  Bilder um verschiedene Buttons zu laden */
    constructor(path, posX, posY, width, height) {
        super().loadImage(path);
        this.width = 160;
        this.height = 40;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
    }




}