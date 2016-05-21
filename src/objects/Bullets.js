class Bullets extends Phaser.Group {

    constructor(game, bulletType) {
        super(game, undefined, 'bullets', false);

        this.enableBody = true;
        this.physicsBodyType = Phaser.Physics.ARCADE;


        this.createMultiple(30, bulletType, 0);

        this.setAll('anchor.x', 0.5);
        this.setAll('anchor.y', 1);
        this.setAll('outOfBoundsKill', true);
        this.setAll('checkWorldBounds', true);

        this.callAll('animations.add', 'animations', 'fly', [0, 1, 2, 3], 20, true);
       	this.callAll('play', null, 'fly');
    }
}

export default Bullets;
