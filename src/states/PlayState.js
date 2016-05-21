import Ship from 'objects/Ship';
import Foes from 'objects/Foes';
import Bullets from 'objects/Bullets';
import Starfield from 'objects/Starfield';
import Controller from 'controllers/Controller';

import {
    size,
    stats,
    handleFoeKill,
    handleShipHit,
    handleFoeShipCollision,
    handleBulletCollision,
    updateWaveTime
} from 'utils/index';



class PlayState extends Phaser.State {

    create() {
        console.log(`${this.game.time.now} - game started`);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.game.world._definedSize = true;

        // stars
        this.starfield = new Starfield(this.game);

        // gun
        this.shipFrontgun = new Bullets(this.game, 'bullet');
        this.shipSidegun = new Bullets(this.game, 'enemyBullet');
        this.foesGun = new Bullets(this.game, 'enemyBullet');

        // ship
        this.ship = new Ship(this.game, size.width/2, (size.height - 50), this.shipFrontgun, this.shipSidegun);

        // foes
        this.foes = new Foes(this.game, this.foesGun, this.ship);

        // add controller
        this.controller = new Controller(this.ship);
    }

    update() {


		console.debug(`childrens: ${this.foes.children.length}`, `score: ${stats.score}`);

        updateWaveTime(this.game.time.events.duration);

        // check foe position
        this.foes.forEach((foe, index) => {
            foe.checkXY();
            foe.fire();
        });

        // update stars
        this.starfield.move();

        // collisions
        this.game.physics.arcade.overlap([this.shipFrontgun, this.shipSidegun], this.foes, handleFoeKill, null);
        this.game.physics.arcade.overlap([this.shipFrontgun, this.shipSidegun], this.foesGun, handleBulletCollision, null);
        this.game.physics.arcade.overlap(this.foesGun, this.ship, handleShipHit, null);
        this.game.physics.arcade.overlap(this.foes, this.ship, handleFoeShipCollision, null);
    }

}

export default PlayState;
