import Phaser from 'phaser';
import { assetImageLoad } from '../utils/utils';

export default class extends Phaser.State  {
  preload() {
    this.load.image('progressBar', assetImageLoad('progressBar.png'));
  }
  create() {
    this.stage.backgroundColor = '#3498db';
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.renderer.renderSession.roundPixels = true;

    this.state.start('load');
  }
};