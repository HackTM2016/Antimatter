import { size, angle } from 'utils/index';
import _ from 'lodash';



class Controller extends Leap.Controller {

    constructor(ship, shield) {
        super({ enableGestures: true });

        this.ship = ship;
        this.shield = shield;

        this.rotation = 0;
        this.direction = 'up';

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
                    if (hand.valid) {
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

            if (this.rotation <= -30) {
                this.ship.sideFire();

                if (this.direction !== 'left') {
                    this.direction = 'left';
                    this.ship.play('flyLeft');
                }

            } else if (this.rotation >= 30) {
                this.ship.sideFire(false);

                if (this.direction !== 'right') {
                    this.direction = 'right';
                    this.ship.play('flyRight');
                }

            } else {
                this.ship.frontFire();

                if(this.direction !== 'up') {
                    this.direction = 'up';
                    this.ship.frame = 0;
                }
            }
        }
    }


    handleMove(hand) {

        let screenPosition = hand.screenPosition();
        let [x, y, z] = screenPosition;
        let realZ = Math.abs(z).toFixed();

        this.rotation = Math.floor(hand.roll() * (180 / Math.PI));
        this.ship.x = x - size.width;
        this.shield.x = x - size.width;

        // activate shield
        if(hand.grabStrength >= .5 && !this.shield.active) {
            this.shield.activate();
        }
    }
}


export default Controller;
