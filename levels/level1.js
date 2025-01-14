const level1 = new Level(
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
    [
        { speed: 0.3, x: 0, y: undefined, width: undefined, height: undefined, src: undefined },
        { speed: undefined, x: 360, y: -10, src: 'assets/5_background/layers/4_clouds/2.png' },
        { speed: 0.3, x: 300, y: -20, width: 260, height: 270 },
        { speed: 0.3, x: 120, y: 30, src: 'assets/5_background/layers/4_clouds/2.png' },
        { speed: undefined, x: 800, y: 40 },
        { speed: undefined, x: 720, y: 0, src: 'assets/5_background/layers/4_clouds/2.png' },
    ],
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ], 
    2756,
    new Endboss() 
);