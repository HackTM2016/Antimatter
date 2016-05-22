import Boom from './Boom';
import { updateHealth } from 'utils/index';


class Ship extends Phaser.Sprite {

	constructor(game, x, y, frontgun, sidegun) {
		super(game, x, y, 'ship');

		this.anchor.setTo(0.5, 0.5);

		this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

		this.health = 100;
		this.bulletTime = 0;
		this.bulletSpeed = 400;
		this.bulletDelay = 200;

		this.animations.add('flyLeft', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
		this.animations.add('flyRight', [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);

		// add guns
		this.frontgun = frontgun;
		this.sidegun = sidegun;

		// add ship to stage
		this.game.world.addChild(this);
	}

	frontFire() {

		let bullet;

		if(this.game.time.now > this.bulletTime) {
			bullet = this.frontgun.getFirstExists(false);

			if(bullet) {
				bullet.reset(this.x + this.game.rnd.between(-10, 10), this.y);
				bullet.body.velocity.y = -this.bulletSpeed;
            	this.bulletTime = this.game.time.now + this.bulletDelay;
			}
		}
	}

	sideFire(leftHand = true) {

		let bullet;
		let bulletSpeed = leftHand ? -this.bulletSpeed : this.bulletSpeed;

		if(this.game.time.now > this.bulletTime && this.alive) {
			bullet = this.sidegun.getFirstExists(false);

			if(bullet) {
				bullet.reset(this.x, this.y + this.game.rnd.between(-10, 10));
				bullet.body.velocity.x = bulletSpeed;
				this.bulletTime = this.game.time.now + this.bulletDelay;
			}
		}
	}

	superFire() {

        let bullet;

        const bulletAngle = 12;
        const bulletSpeed = 800;
        const bulletsCount = 4;

        for (let i = 0; i < bulletsCount; i++) {

            bullet = this.sidegun.getFirstExists(false);

            if (bullet) {
                bullet.reset(this.x, this.y - 8);
                this.game.physics.arcade.velocityFromAngle(bulletAngle * i, bulletSpeed, bullet.body.velocity);
            }
        }
    }

	hit() {
		this.health -= 10;
		updateHealth(this.health);

		if(this.health > 0) {
			let boom = new Boom(this.game, this.x, this.y, 'boomSmall');
		}

		if(this.health <= 0) {
			this.kill();

			let boom = new Boom(this.game, this.x, this.y, 'boom', () => {
				this.game.state.start('gameover');
			});
		}
	}

}

export default Ship;