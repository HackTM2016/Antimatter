import Controller from 'controllers/Over';
import { stats, size } from 'utils/index';


class OverState extends Phaser.State {

    create() {

        this.steps = this.game.add.sprite(this.game.world.centerX, size.height, 'playAgain');
        this.steps.anchor.setTo(0.5, 1);

        this.controller = new Controller(this);
    }

    shutdown() {
        this.controller.disconnect();
    }
}

export default OverState;
