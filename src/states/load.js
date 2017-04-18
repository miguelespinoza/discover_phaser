import Phaser from 'phaser';
import { assetImageLoad } from '../utils/utils';

export default class extends Phaser.State {
  preload() {
    // Add a 'loading...' label on the screen
    var loadingLabel = this.add.text(this.game.width/2, 150, 'loading...',
      {font: '30px Arial', fill: '#ffffff'});
    loadingLabel.anchor.setTo(0.5, 0.5);

    // Display the progress bar
    var progressBar = this.add.sprite(this.game.width/2, 200, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(progressBar);

    // Load all our assets
    this.load.image('coin', assetImageLoad('coin.png'));
    this.load.image('enemy', assetImageLoad('enemy.png'));
    this.load.image('player', assetImageLoad('player.png'));
    this.load.image('wallV', assetImageLoad('wallVertical.png'));
    this.load.image('wallH', assetImageLoad('wallHorizontal.png'));

    // Load a new asset that we will use in the menu state
    this.load.image('background', assetImageLoad('background.png'));
  }
  
  create() {
    this.state.start('menu');
  }
};