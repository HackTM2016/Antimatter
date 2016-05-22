import Controller from 'controllers/Tutorial';


class TutorialState extends Phaser.State {

	create() {
		this.steps = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tutorial');
		this.steps.anchor.setTo(0.5, 0.5);
		this.controller = new Controller(this);
	}

	nextStep(step) {
		this.steps.frame = step;
	}

	shutdown() {
      this.controller.disconnect();
  }
}

export default TutorialState;
