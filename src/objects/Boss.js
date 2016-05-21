import { size } from 'utils/index';

class Boss extends Phaser.Sprite {

    constructor(game, gun, ship) {
        const x = size.width / 2;
        const y = -75;

        super(game, x, y, 'boss');

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.checkWorldBounds = true;

        this.anchor.setTo(0.5, 0.5);

        this.speed = 100;
        this.bulletTime = 0;

        this.ship = ship;
        this.gun = gun;

        this.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
        this.body.velocity.y = this.speed;
    }

    checkXY() {

        if (this.body.x >= (size.width - this.body.width)) {
            this.body.velocity.x = -this.speed;
            this.body.velocity.y = this.game.rnd.integerInRange(-this.speed, this.speed);
        }

        if (this.body.x <= 0) {
            this.body.velocity.x = this.speed;
            this.body.velocity.y = this.game.rnd.integerInRange(-this.speed, this.speed);
        }

        if (this.body.y > size.height / 5) {
            this.body.velocity.x = this.game.rnd.integerInRange(-this.speed, this.speed);
            this.body.velocity.y = -this.speed;

        }

        if (this.body.y < 0) {
            this.body.velocity.y = this.speed;
        }
    }

    fire() {

        let bullet;

        let bulletVelocity = this.game.rnd.integerInRange(50, 200);
        let bulletDelay = this.game.rnd.integerInRange(2000, 4000);
        let bulletSpeed = 500;
        let bulletsCount = 36;
        let bulletAngle = 20;


		if(this.game.time.now > this.bulletTime) {
	        for (let i = 0; i < bulletsCount; i++) {
	            bullet = this.gun.getFirstExists(false);

	            if (bullet) {
	                bullet.reset(this.x, this.y - 8);
	                this.game.physics.arcade.velocityFromAngle(bulletAngle * i, bulletSpeed, bullet.body.velocity);
	                this.bulletTime = this.game.time.now + bulletDelay;
	            }
	        }
    	}
    }
}

export default Boss;
