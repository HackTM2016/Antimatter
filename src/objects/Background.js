import { size } from 'utils/index';


class Background extends Phaser.TileSprite {

	constructor(game, key, speed) {
		super(game, 0, 0, size.width, size.height, key);

		this.speed = speed;
		this.game.world.addChild(this);
	}

	move() {
		this.tilePosition.y += this.speed;
	}
}

export default Background;