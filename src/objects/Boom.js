class Boom extends Phaser.Sprite {

	constructor(game, x, y) {
		super(game, x, y, 'boom');

		this.anchor.setTo(0.5, 0.5);
		this.game.stage.addChild(this);

		this.animations.add('boom');
		this.play('boom', 30, false, true);
	}
}

export default Boom;