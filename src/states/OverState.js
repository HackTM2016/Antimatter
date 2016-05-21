import { stats } from 'utils/index';


class OverState extends Phaser.State {

    create() {

        console.log(`${this.game.time.now} - game over`, stats)

        const style = { font: '65px Helvetica', fill: '#ffffff', align: 'center' };
        const x = this.game.world.centerX;
        const y = this.game.world.centerY;

        const { level, score } = stats;


        const text = [`You died!!!`,
            `Waves: ${level}`,
            `Score: ${score}`
        ].join('\n');0


        this.game.add.text(x, y, text, style).anchor.set(0.5);
    }
}

export default OverState;
