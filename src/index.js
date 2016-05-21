import Stats from 'stats.js';

import LoadState from 'states/LoadState';
import PlayState from 'states/PlayState';
import OverState from 'states/OverState';
import TutorialState from 'states/TutorialState';

import { size } from 'utils/index';


class Game extends Phaser.Game {

	constructor() {
		super(size.width, size.height, Phaser.AUTO, 'game', null);

		this.state.add('load', LoadState, false);
		this.state.add('play', PlayState, false);
		this.state.add('tutorial', TutorialState, false);
		this.state.add('gameover', OverState, false);

		this.state.start('load');
	}

}

const game = new Game();


// @mrdoob Stat.js

// const stats = new Stats();
// stats.showPanel(0);

// document.body.appendChild(stats.dom);

// const animate = () => {
//     stats.begin();
//     stats.end();
//     requestAnimationFrame(animate);
// }

// requestAnimationFrame(animate);
