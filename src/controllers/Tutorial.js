import { size, angle } from 'utils/index';
import _ from 'lodash';



class Controller extends Leap.Controller {

    constructor(state) {
        super({ enableGestures: true });

        this.state = state;
        this.step = 0;

        this.connect();
        this.update();
    }

    update() {
        this.on('frame', (frame) => {

            if (!_.isEmpty(frame.hands) && frame.valid) {

                let hands = frame.hands;
                let gestures = frame.gestures;


                if(hands.length === 2 && this.step === 0) {
                    this.step++;
                    this.state.nextStep(this.step);
                }

                hands.forEach((hand, index) => {

                    if(hand.type === 'left' && hand.grabStrength >= .8 && this.step === 1) {
                        this.step++;
                        this.state.nextStep(this.step);
                    }

                    if(hand.type === 'right') {
                         this.handleRightHand(gestures, hand);
                    }
                });
            }
        });
    }

    handleRightHand(gestures, hand) {
        if (!_.isEmpty(gestures)) {
            gestures.forEach((gesture) => {
                if(gesture.type === 'swipe' && this.step === 2) {
                    this.step++;
                    this.state.nextStep(this.step);
                }
            });
        }

        if(this.step === 3) {
            let rotation = Math.floor(hand.roll() * (180 / Math.PI));
            if(Math.abs(rotation) > 80) {
                this.step++;
                this.state.game.state.start('play');
            }
        }
    }
}


export default Controller;