import { size, angle } from 'utils/index';
import _ from 'lodash';



class Controller extends Leap.Controller {

    constructor(ship) {
        super({ enableGestures: true });

        this.ship = ship;
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

            switch (true) {
                case this.rotation <= -30:
                    this.ship.sideFire();
                    if (this.direction !== 'left' && this.direction !== 'up') {
                        this.direction = 'left';
                        this.ship.play('flyLeft');
                    }
                    break;

                case this.rotation >= 30:
                    this.ship.sideFire(false);
                    if (this.direction !== 'right') {
                        this.direction = 'right';
                        this.ship.play('flyRight');
                    }
                    break;

                case this.rotation < 30:
                case this.rotation > -30:
                    this.ship.frontFire();
                    this.direction = 'up';
                    this.ship.frame = 0;
                    break;
            }
        }
    }


    handleMove(hand) {

        let screenPosition = hand.screenPosition();
        let [x, y, z] = screenPosition;
        let realZ = Math.abs(z).toFixed();

        this.rotation = Math.floor(hand.roll() * (180 / Math.PI));
        this.ship.x = x - size.width;
    }
}


export default Controller;
