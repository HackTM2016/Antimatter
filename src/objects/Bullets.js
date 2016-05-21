class Bullets extends Phaser.Group {

	constructor(game, bulletType) {
		super(game, undefined, 'bullets', false);

		this.enableBody = true;
		this.physicsBodyType = Phaser.Physics.ARCADE;

		this.createMultiple(30, bulletType);

	    this.setAll('anchor.x', 0.5);
	    this.setAll('anchor.y', 1);
	    this.setAll('outOfBoundsKill', true);
	    this.setAll('checkWorldBounds', true);
	}
}

export default Bullets;