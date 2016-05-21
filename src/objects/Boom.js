class Boom extends Phaser.Sprite {

	constructor(game, x, y, key = 'boom', callback = () => {}) {
		super(game, x, y, key);

		this.anchor.setTo(0.5, 0.5);
		this.game.stage.addChild(this);

		this.animations.add('boom');
		this.play('boom', 30, false, true);

		this.animations.currentAnim.onComplete.add(callback);
	}
}

export default Boom;