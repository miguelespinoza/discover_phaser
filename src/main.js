import Phaser from 'phaser';

import SplashState from './states/splashState';

class Game extends Phaser.Game {
    constructor() {
      super(800, 600, Phaser.CANVAS, 'content', null);
      this.state.add('Splash', SplashState, false);
      this.state.start('Splash');
    }
}

window.game = new Game();