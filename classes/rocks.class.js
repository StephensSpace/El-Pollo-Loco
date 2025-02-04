//**Klasse für das statische Object Rock 
// auf das Pepe springen kann */
class Rocks extends MovableObject {
   

    images = {};
//** Constructor für Rocks, es wird 
// ein Bild geladen (durch path Variabel) */
    constructor(path, posX, posY = 90, width = 50, height = 50) {
        super().loadImage(path);
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.offsetY = 2;
        this.offsetX = 7;
        this.offsetLength = 12;
        this.offsetHeight = 5;
    }


}