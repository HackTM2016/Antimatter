import { size, angle } from 'utils/index';
import _ from 'lodash';



class Controller extends Leap.Controller {

    constructor(ship) {
        super({ enableGestures: true });

        this.ship = ship;
        this.rotation = 0;

        this.connect();

        this.normalize();
        this.update();
    }


    normalize() {
        this.use('screenPosition', {
            scale: 1
        });
    }


    update() {
        this.on('frame', (frame) => {

            if (!_.isEmpty(frame.hands) && frame.valid) {

                let hands = frame.hands;
                let gestures = frame.gestures;

                hands.forEach(hand => {
                    if(hand.valid) {
                        if (hand.type === 'right') {
                            this.handleMove(hand);
                        }

                        if (hand.type === 'left') {
                            this.handleFire(hand);
                        }
                    }
                });
            }
        });
    }


    handleFire(hand) {

        if (hand.grabStrength >= .5) {

            if(this.rotation <= -30) {
                this.ship.sideFire();
            }

            if(this.rotatation > -30 || this.rotation < 30) {
                this.ship.frontFire();
            }

            if(this.rotation >= 30) {
                this.ship.sideFire(false);
            }

        }

    }


    handleMove(hand) {

        let screenPosition = hand.screenPosition();
        let [ x, y, z ] = screenPosition;
        let realZ = Math.abs(z).toFixed();

        this.rotation = Math.floor(hand.roll() * (180 / Math.PI));
        this.ship.x = x - (size.width/2);
    }
}


export default Controller;
