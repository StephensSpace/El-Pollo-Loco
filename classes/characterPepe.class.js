class CharacterPepe extends MovableObject {
    imagesIdle = [
        '../assets/2_character_pepe/1_idle/idle/I-1.png',
        '../assets/2_character_pepe/1_idle/idle/I-2.png',
        '../assets/2_character_pepe/1_idle/idle/I-3.png',
        '../assets/2_character_pepe/1_idle/idle/I-4.png',
        '../assets/2_character_pepe/1_idle/idle/I-5.png',
        '../assets/2_character_pepe/1_idle/idle/I-6.png'
    ]

    imagesWalk = [
        'assets/2_character_pepe/2_walk/W-21.png',
        'assets/2_character_pepe/2_walk/W-22.png',
        'assets/2_character_pepe/2_walk/W-23.png',
        'assets/2_character_pepe/2_walk/W-24.png',
        'assets/2_character_pepe/2_walk/W-25.png',
        'assets/2_character_pepe/2_walk/W-26.png'
    ]
    currentImageIdle = 0;
    currentImageWalk = 0;
    
    constructor() {
        super().loadImage('../assets/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.imagesIdle);
        this.loadImages(this.imagesWalk);
        this.animateWalk();
    }

    animate() {
        setInterval(() => {
            let i = this.currentImageIdle % this.imagesIdle.length;
            let path = this.imagesIdle[i];
            this.img = this.images[path]
            this.currentImageIdle++;
        }, 300);
    }

    animateWalk() {
        setInterval(() => {
            let i = this.currentImageWalk % this.imagesWalk.length;
            let path = this.imagesWalk[i];
            this.img = this.images[path]
            this.currentImageWalk++;
        }, 300);
    }

   
    jump() {

    }
}