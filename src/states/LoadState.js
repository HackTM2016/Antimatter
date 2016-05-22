class LoadState extends Phaser.State {

    create() {
        console.log(`${this.game.time.now} - start game`);

        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5, 0.5);

        this.timeout = setTimeout(() => { this.game.state.start('tutorial') }, Phaser.Timer.SECOND * 2);
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
        this.game.load.image('playAgain', 'img/play-again.png');
        this.game.load.image('logo', 'img/logo.png');
        this.game.load.spritesheet('shield', 'img/shield.png', 100, 53);
        this.game.load.spritesheet('tutorial', 'img/tutorial.png', 500, 500, 4);
        this.game.load.spritesheet('shipFrontBullet', 'img/ship-front-bullet.png', 15, 52, 5);
        this.game.load.spritesheet('shipSideBullet', 'img/ship-side-bullet.png', 20, 20, 5);
        this.game.load.spritesheet('ship', 'img/ship.png', 80, 80);
        this.game.load.spritesheet('foe', 'img/foe.png', 60, 60, 59);
        this.game.load.spritesheet('foeSecond', 'img/foe-second.png', 100, 100, 59);
        this.game.load.spritesheet('enemyBullet', 'img/foe-bullet.png', 20, 20);
        this.game.load.spritesheet('boom', 'img/boom.png', 250, 230);
        this.game.load.spritesheet('boomSmall', 'img/boom-small.png', 250, 230, 22);
    }


    shutdown() {
        clearTimeout(this.timeout);
    }

}

export default LoadState;
