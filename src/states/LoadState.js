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

		this.game.load.image('starfield', 'img/starfield.png');
		this.game.load.image('nebula', 'img/nebula.png');
		this.game.load.image('boss', 'img/boss.png');
		this.game.load.spritesheet('shipFrontBullet', 'img/ship-front-bullet.png', 15, 52, 5);
		this.game.load.spritesheet('shipSideBullet', 'img/ship-side-bullet.png', 20, 20, 5);
		this.game.load.spritesheet('ship', 'img/ship.png', 80, 80);
		this.game.load.spritesheet('foe', 'img/foe.png', 60, 60, 59);
		this.game.load.spritesheet('foeSecond', 'img/foe-second.png', 100, 100, 59);
		this.game.load.spritesheet('enemyBullet', 'img/foe-bullet.png', 20, 20);
		this.game.load.spritesheet('boom', 'img/boom.png', 250, 230);
		this.game.load.spritesheet('boomSmall', 'img/boom-small.png', 250, 230, 22);
	}

}

export default LoadState;