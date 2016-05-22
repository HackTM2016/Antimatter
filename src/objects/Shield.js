import Boom from './Boom';


class Shield extends Phaser.Sprite {

    constructor(game, x, y) {
        super(game, x, y, 'shield');

        this.active = false;
        this.time = 0;

        this.anchor.setTo(0.5, 0.5);

        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.collideWorldBounds = true;

        this.animations.add('activate', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 30);
        this.animations.add('deactivate', [9, , 8, 7, 6, 5, 4, 3, 2, 1, 0], 30);

        // add shield to stage
        this.game.world.addChild(this);

    }

    activate() {
        this.active = true;
        this.time = this.game.time.now;
        this.animations.play('activate');
        this.animations.currentAnim.onComplete.add(() => { this.active = true; });

    }

    deactivate() {
        this.active = false;
        this.animations.play('deactivate');
        this.animations.currentAnim.onComplete.add(() => { this.active = false });
    }

    hit() {
        let boom = new Boom(this.game, this.x, this.y - 35, 'boomSmall');
    }
}

export default Shield;
