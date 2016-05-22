import Ship from 'objects/Ship';
import Foes from 'objects/Foes';
import Shield from 'objects/Shield';
import Bullets from 'objects/Bullets';
import Background from 'objects/Background';
import Controller from 'controllers/Play';

import {
    size,
    stats,
    handleFoeKill,
    handleShipHit,
    handleShieldHit,
    handleFoeShipCollision,
    handleBulletCollision,
    updateWaveTime,
    handleShield,
    handleShieldCollision
} from 'utils/index';



class PlayState extends Phaser.State {

    create() {
        console.log(`${this.game.time.now} - game started`);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.world._definedSize = true;

        // stars
        this.starfield = new Background(this.game, 'starfield', 2);
        this.nebula = new Background(this.game, 'nebula', 1);

        // gun
        this.shipFrontgun = new Bullets(this.game, 'shipFrontBullet');
        this.shipSidegun = new Bullets(this.game, 'shipSideBullet');
        this.foesGun = new Bullets(this.game, 'enemyBullet');

        // ship
        this.ship = new Ship(this.game, size.width/2, (size.height - 50), this.shipFrontgun, this.shipSidegun);

        // add shield
        this.shield = new Shield(this.game, this.ship.x, this.ship.y-35);

        // foes
        this.foes = new Foes(this.game, this.foesGun, this.ship);

        // add controller
        this.controller = new Controller(this.ship, this.shield);
    }

    update() {

        //this.ship.frontFire();

        updateWaveTime(this.game.time.events.duration);
        handleShield(this.shield, this.game.time.now);

        // check foe position
        this.foes.forEach((foe, index) => {
            foe.checkXY();
            foe.fire();
        });

        // update stars
        this.starfield.move();
        this.nebula.move();

        // collisions
        this.game.physics.arcade.overlap([this.shipFrontgun, this.shipSidegun], this.foes, handleFoeKill, null);
        //this.game.physics.arcade.overlap([this.shipFrontgun, this.shipSidegun], this.foesGun, handleBulletCollision, null);
        this.game.physics.arcade.overlap(this.foesGun, this.ship, handleShipHit, null);
        this.game.physics.arcade.overlap(this.foesGun, this.shield, handleShieldHit, null);
        this.game.physics.arcade.overlap(this.foes, this.shield, handleShieldCollision, null);
        this.game.physics.arcade.overlap(this.foes, this.ship, handleFoeShipCollision, null);
    }


    shutdown() {
        this.controller.disconnect();
    }

}

export default PlayState;
