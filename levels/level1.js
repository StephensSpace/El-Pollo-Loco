let level1;
//** Dise Funktion "lädt" die Arrays als
//  properytys ins Level so das diese 
// dann gezeichnet werden können */
function setLevel() {
//**Variable für das erste Level
//  */
    level1 = new Level(
        //**Array für Hintergrundobjekte
        //  */
        [
            new Air(),
            new Background('assets/5_background/layers/3_third_layer/1.png', 0),
            new Background('assets/5_background/layers/2_second_layer/1.png', 0),
            new Background('assets/5_background/layers/1_first_layer/1.png', 0),

            new Air(719),
            new Background('assets/5_background/layers/3_third_layer/2.png', 719),
            new Background('assets/5_background/layers/2_second_layer/2.png', 719),
            new Background('assets/5_background/layers/1_first_layer/2.png', 719),

            new Air(719 * 2),
            new Background('assets/5_background/layers/3_third_layer/1.png', 719 * 2),
            new Background('assets/5_background/layers/2_second_layer/1.png', 719 * 2),
            new Background('assets/5_background/layers/1_first_layer/1.png', 719 * 2),

            new Air(719 * 3),
            new Background('assets/5_background/layers/3_third_layer/2.png', 719 * 3),
            new Background('assets/5_background/layers/2_second_layer/2.png', 719 * 3),
            new Background('assets/5_background/layers/1_first_layer/2.png', 719 * 3),

            new Air(719 * 4),
            new Background('assets/5_background/layers/3_third_layer/1.png', 719 * 4),
            new Background('assets/5_background/layers/2_second_layer/1.png', 719 * 4),
            new Background('assets/5_background/layers/1_first_layer/1.png', 719 * 4),

        ],
        //**Array clouds für die Hintergrundwolken
        //  mit Daten wie speed positionen und pfaden 
        // zu den pictures 
        // */
        [
            { speed: 0.3, x: 0, y: undefined, width: undefined, height: undefined, src: undefined },
            { speed: undefined, x: 360, y: -10, src: 'assets/5_background/layers/4_clouds/2.png' },
            { speed: 0.3, x: 300, y: -20, width: 260, height: 270 },
            { speed: 0.3, x: 120, y: 30, src: 'assets/5_background/layers/4_clouds/2.png' },
            { speed: undefined, x: 800, y: 40 },
            { speed: undefined, x: 720, y: 0, src: 'assets/5_background/layers/4_clouds/2.png' },
        ],
        //**Enemy Arrays mit den Gegnern im Spiel 
        // und deren Positionen */
        [
            new Chicken(670),
            new Chicken(490),
            new Chicken(290),
            new Chicken(530, 100),
            new Chicken(1230),
            new Chicken(1050),
            new Chicken(1600),
            new Chicken(1900),
            new Chic(1700),
            new Chic(1230, 200),
            new Chic(1050, 200),
            new Chic(600),
            new Chic(400),
            new Bird(70, -10),
            new Bird(1460, -10),
            new Bird(1460, 85),
            new Bird(480, -10),
            new Bird(1040, -10),
            new Bird(1860, -10),
            new Flame(782, 355),
            new Flame(785, 355),
            new Flame(788, 355)
        ],
        2756, //level Endposition auf der x Achse
        //**Endboss des Levels
        //  */
        new Endboss(),
        //**Coin array mit positionen
        //  */
        [
            new Coins(200, -10),
            new Coins(300, -10),
            new Coins(250, -10),
            new Coins(500, 160),
            new Coins(550, 160),
            new Coins(600, 160),
            new Coins(1180, -10),
            new Coins(1230, -10),
            new Coins(1080, -10),
            new Coins(1130, -10),
            new Coins(2022, -20),
            new Coins(2072, -20),
            new Coins(1700, 150),
            new Coins(1750, 150),
            new Coins(825, 210),
            new Coins(875, 210),
            new Coins(925, 210),
            new Coins(1220, 330),
            new Coins(1170, 330),
            new Coins(1120, 330),
            new Coins(525, 280),
            new Coins(575, 280),
            new Coins(625, 280),
        ],
        //** salsaBottle Array mit positionen
        //  */
        [
            new Salsa('assets/6_salsa_bottle/1_salsa_bottle_on_ground.png', 570, 330),
            new Salsa('assets/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1050, 330),
            new Salsa('assets/6_salsa_bottle/1_salsa_bottle_on_ground.png', 970, 330),
            new Salsa('assets/6_salsa_bottle/1_salsa_bottle_on_ground.png', 520, 330),
            new Salsa('assets/6_salsa_bottle/1_salsa_bottle_on_ground.png', 620, 330),
            new Salsa('assets/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2020, 25),
            new Salsa('assets/6_salsa_bottle/1_salsa_bottle_on_ground.png', 2070, 25),

        ],
        //** statisches Object Rock array 
        // mit positionen auf der Map */
        [
            new Rocks('assets/10_rocks/Rock2.png', 50, 5),
            new Rocks('assets/10_rocks/Rock1shadow.png', 180, 360),
            new Rocks('assets/10_rocks/Rock2.png', 180, 315),
            new Rocks('assets/10_rocks/Rock1.png', 180, 270),
            new Rocks('assets/10_rocks/Rock1shadow.png', 220, 360),
            new Rocks('assets/10_rocks/Rock2.png', 220, 315),
            new Rocks('assets/10_rocks/Rock1.png', 220, 270),
            new Rocks('assets/10_rocks/Rock1.png', 460, 5),
            new Rocks('assets/10_rocks/Rock1.png', 460, 185),
            new Rocks('assets/10_rocks/Rock2.png', 460, 225),
            new Rocks('assets/10_rocks/Rock2.png', 500, 225),
            new Rocks('assets/10_rocks/Rock2.png', 540, 225),
            new Rocks('assets/10_rocks/Rock2.png', 580, 225),
            new Rocks('assets/10_rocks/Rock2.png', 620, 225),
            new Rocks('assets/10_rocks/Rock2.png', 660, 225),
            new Rocks('assets/10_rocks/Rock2.png', 700, 225),
            new Rocks('assets/10_rocks/Rock1.png', 700, 270),
            new Rocks('assets/10_rocks/Rock2.png', 700, 315),
            new Rocks('assets/10_rocks/Rock1shadow.png', 700, 360),

            new Rocks('assets/10_rocks/Rock1.png', 660, 90),
            new Rocks('assets/10_rocks/Rock1.png', 700, 90),
            new Rocks('assets/10_rocks/Rock1.png', 740, 90),
            new Rocks('assets/10_rocks/Rock1.png', 740, 135),
            new Rocks('assets/10_rocks/Rock2.png', 740, 180),
            new Rocks('assets/10_rocks/Rock1.png', 740, 225),
            new Rocks('assets/10_rocks/Rock1.png', 740, 270),
            new Rocks('assets/10_rocks/Rock2.png', 740, 315),
            new Rocks('assets/10_rocks/Rock1shadow.png', 740, 360),
            new Rocks('assets/10_rocks/Rock1.png', 0, -100),
            new Rocks('assets/10_rocks/Rock1.png', 40, -100),
            new Rocks('assets/10_rocks/Rock1.png', 80, -100),
            new Rocks('assets/10_rocks/Rock1.png', 120, -100),
            new Rocks('assets/10_rocks/Rock1.png', 160, -100),
            new Rocks('assets/10_rocks/Rock1.png', 200, -100),
            new Rocks('assets/10_rocks/Rock1.png', 240, -100),
            new Rocks('assets/10_rocks/Rock1.png', 280, -100),
            new Rocks('assets/10_rocks/Rock1.png', 320, -100),
            new Rocks('assets/10_rocks/Rock1.png', 360, -100),
            new Rocks('assets/10_rocks/Rock1.png', 400, -100),
            new Rocks('assets/10_rocks/Rock1.png', 440, -100),
            new Rocks('assets/10_rocks/Rock1.png', 480, -100),
            new Rocks('assets/10_rocks/Rock1.png', 520, -100),
            new Rocks('assets/10_rocks/Rock1.png', 560, -100),
            new Rocks('assets/10_rocks/Rock1.png', 600, -100),
            new Rocks('assets/10_rocks/Rock1.png', 640, -100),
            new Rocks('assets/10_rocks/Rock1.png', 680, -100),
            new Rocks('assets/10_rocks/Rock1.png', 720, -100),
            new Rocks('assets/10_rocks/Rock1.png', 760, -100),
            new Rocks('assets/10_rocks/Rock1.png', 800, -100),
            new Rocks('assets/10_rocks/Rock1.png', 840, -100),
            new Rocks('assets/10_rocks/Rock1.png', 880, -100),
            new Rocks('assets/10_rocks/Rock1.png', 920, -100),
            new Rocks('assets/10_rocks/Rock1.png', 960, -100),
            new Rocks('assets/10_rocks/Rock1.png', 1000, -100),
            new Rocks('assets/10_rocks/Rock1.png', 1040, -100),
            new Rocks('assets/10_rocks/Rock1.png', 1080, -100),
            new Rocks('assets/10_rocks/Rock1.png', 1120, -100),
            new Rocks('assets/10_rocks/Rock1.png', 1160, -100),
            new Rocks('assets/10_rocks/Rock1.png', 1200, -100),

            new Rocks('assets/10_rocks/Rock1.png', 860, 5),
            new Rocks('assets/10_rocks/Rock2.png', 860, 50),
            new Rocks('assets/10_rocks/Rock2.png', 860, 95),

            new Rocks('assets/10_rocks/Rock2.png', 900, 5),
            new Rocks('assets/10_rocks/Rock1.png', 900, 50),

            new Rocks('assets/10_rocks/Rock1.png', 940, 5),

            new Rocks('assets/10_rocks/Rock1.png', 980, 5),
            new Rocks('assets/10_rocks/Rock2.png', 1020, 5),

            new Rocks('assets/10_rocks/Rock2.png', 860, 275),
            new Rocks('assets/10_rocks/Rock1.png', 860, 320),
            new Rocks('assets/10_rocks/Rock2shadow.png', 860, 365),

            new Rocks('assets/10_rocks/Rock2.png', 900, 275),
            new Rocks('assets/10_rocks/Rock2.png', 900, 320),
            new Rocks('assets/10_rocks/Rock2shadow.png', 900, 365),

            new Rocks('assets/10_rocks/Rock2.png', 940, 275),
            new Rocks('assets/10_rocks/Rock2.png', 940, 320),
            new Rocks('assets/10_rocks/Rock2.png', 940, 365),
            new Rocks('assets/10_rocks/Rock2.png', 980, 230),

            new Rocks('assets/10_rocks/Rock2.png', 1020, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1020, 185),
            new Rocks('assets/10_rocks/Rock2.png', 1060, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1100, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1140, 230),
            new Rocks('assets/10_rocks/Rock2.png', 1180, 185),
            new Rocks('assets/10_rocks/Rock1.png', 1180, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1220, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1260, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1300, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1340, 230),
            new Rocks('assets/10_rocks/Rock1.png', 1340, 185),
            new Rocks('assets/10_rocks/Rock1.png', 1340, 5),

            new Rocks('assets/10_rocks/Rock1shadow.png', 1460, 365),
            new Rocks('assets/10_rocks/Rock1shadow.png', 1500, 365),

            new Rocks('assets/10_rocks/Rock1.png', 1700, 5),

            new Rocks('assets/10_rocks/Rock2.png', 1700, 230),
            new Rocks('assets/10_rocks/Rock2.png', 1740, 230),
            new Rocks('assets/10_rocks/Rock2.png', 1780, 230),

            new Rocks('assets/10_rocks/Rock2.png', 2020, 95),
            new Rocks('assets/10_rocks/Rock2.png', 2060, 95),
            new Rocks('assets/10_rocks/Rock2.png', 2100, 95),
            new Rocks('assets/10_rocks/Rock2.png', 2140, 5),
            new Rocks('assets/10_rocks/Rock2.png', 2140, 50),
            new Rocks('assets/10_rocks/Rock2.png', 2140, 95),
            new Rocks('assets/10_rocks/Rock2.png', 2140, -40),
            new Rocks('assets/10_rocks/Rock2.png', 2140, -85),
            new Rocks('assets/10_rocks/Rock2.png', 2140, -130),

            new Rocks('assets/10_rocks/Rock1shadow.png', 2100, 365),
            new Rocks('assets/10_rocks/Rock2shadow.png', 2140, 365),

            new Rocks('assets/10_rocks/Rock2.png', 2330, 230),
            new Rocks('assets/10_rocks/Rock2.png', 2370, 230),

        ]
    );
}

setLevel();
