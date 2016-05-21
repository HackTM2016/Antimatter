import Foe from './Foe';
import Boss from './Boss';
import { size, stats } from 'utils/index';


class Foes extends Phaser.Group {

    constructor(game, gun, ship) {
        super(game, undefined, 'foes');

        this.enableBody = true
        this.physicsBodyType = Phaser.Physics.ARCADE;

        // wave delay

        this.delay = Phaser.Timer.SECOND * 10;
        this.gun = gun;
        this.ship = ship;

        this.startTimer();
        this.addWave();
    }


    startTimer() {
        this.game.time.events.loop(this.delay, this.addWave, this).timer.start();
    }


    addWave() {
        console.log('add wave');

        stats.level++;
        this.createWave();
    }

    createWave() {
        for(let i of Array(stats.level*2)) {
            let foe = new Foe(this.game, this.gun, this.ship);
            this.add(foe);
        }
    }
}

export default Foes;
