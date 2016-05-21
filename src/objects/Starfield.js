import { size } from 'utils/index';


class Starfield extends Phaser.TileSprite {

	constructor(game) {
		super(game, 0, 0, size.width, size.height, 'starfield');

		this.speed = 2;
		this.game.world.addChild(this);
	}

	move() {
		this.tilePosition.y += this.speed;
	}
}

export default Starfield;