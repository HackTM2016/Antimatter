import _ from 'lodash';
import {
    size,
    stats,
    angle,
    restartScore,
    updateScore,
    updateHealth
} from 'utils/index';



class Controller extends Leap.Controller {

    constructor(state) {
        super({ enableGestures: true });

        this.state = state;
        this.restart = false;

        this.connect();
        this.update();
    }

    update() {
        this.on('frame', (frame) => {

            if (!_.isEmpty(frame.hands) && frame.valid) {

                let hands = frame.hands;
                let gestures = frame.gestures;


                hands.forEach((hand, index) => {

                    if (hand.type === 'right') {

                        if (!_.isEmpty(gestures)) {

                            gestures.forEach((gesture) => {
                                if (gesture.type === 'circle' && !this.restart) {
                                    this.restart = true;
                                    restartScore();
                                    updateScore(stats.score);
                                    updateHealth(100);
                                    document.querySelector('.highscore').style.display = 'none';
                                    this.state.game.state.start('play');
                                }
                            });
                        }

                    }
                });
            }
        });
    }
}


export default Controller;
