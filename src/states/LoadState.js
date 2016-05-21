class LoadState extends Phaser.State {

	create() {
		console.log(`${this.game.time.now} - start game`);

		this.game.state.start('play');
	}

	preload() {
		console.log(`${this.game.time.now} - loading assets`);

		/**
		 * preload all assets
		 * @Andrew this.game.load.image('nume-sprite', 'path-spre-sprite');
		 */

		this.game.load.image('bullet', 'img/bullet.png');
		this.game.load.image('enemyBullet', 'img/enemy-bullet.png');
		this.game.load.image('starfield', 'img/starfield.png');
		this.game.load.image('boss', 'img/boss.png');
		this.game.load.spritesheet('ship', 'img/ship.png', 100, 91);
		this.game.load.spritesheet('foe', 'img/foe.png', 100, 100, 59);
		this.game.load.spritesheet('boom', 'img/boom.png', 250, 230);
	}

}

export default LoadState;