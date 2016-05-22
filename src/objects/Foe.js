import Boom from 'objects/Boom';
import { size, stats, updateScore } from 'utils/index';


class Foe extends Phaser.Sprite {

    constructor(game, gun, ship) {

        // generate some random foes
        let foes = ['foe', 'foeSecond'];
        let foe = foes[game.rnd.between(0, 1)];

        const x = game.rnd.integerInRange(0, size.width);
        const y = game.rnd.integerInRange(-300, 0);

        super(game, x, y, foe);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.checkWorldBounds = true;

        this.anchor.setTo(0.5, 0.5);
        this.animations.add('fly', 0, 59, 20, true);
        this.animations.getAnimation('fly').delay = 50;
        this.play('fly')

        this.minSpeed = 100;
        this.maxSpeed = 200;
        this.bulletTime = 0;
        this.canFire = false;

        this.ship = ship;
        this.gun = gun;

        this.body.velocity.x = this.game.rnd.integerInRange(-100, 100);
        this.body.velocity.y = this.game.rnd.integerInRange(this.minSpeed, this.maxSpeed);

        this.events.onEnterBounds.add(this.handleOnEnterBounds, this);

    }


    checkXY() {
        if (this.body.x >= (size.width - this.body.width)) {
            this.body.velocity.x = this.game.rnd.integerInRange(-200, -100);
        }

        if (this.body.x <= 0) {
            this.body.velocity.x = this.game.rnd.integerInRange(200, 100);
        }
    }


    handleOnEnterBounds() {

        const handleOutOfBounds = () => {
            this.destroy();
            stats.score -= 100;
            // update score
            updateScore();
        }

        this.events.onOutOfBounds.add(handleOutOfBounds, this);
    }


    die() {
        let boom = new Boom(this.game, this.x, this.y);
        this.destroy();

        updateScore();
    }


    fire() {

        let bullet;

        let bulletVelocity = this.game.rnd.integerInRange(50, 200);
        let bulletDelay = this.game.rnd.integerInRange(3000, 6000);
        let bulletSpeed = this.game.rnd.integerInRange(2000, 3000);

        let offset = 200;


        if (this.body.y < size.height/2) {

            if (this.game.time.now > this.bulletTime) {

                bullet = this.gun.getFirstExists(false);

                if (bullet) {
                    bullet.reset(this.x, this.y);
                    this.game.physics.arcade.moveToObject(bullet, this.ship, 100, bulletSpeed);
                    this.bulletTime = this.game.time.now + bulletDelay;
                }
            }
        }
    }
}


export default Foe;
