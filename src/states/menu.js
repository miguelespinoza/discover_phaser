import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    // Add a background image
    this.add.image(0, 0, 'background');

    // Display the name of the game
    var nameLabel = this.add.text(this.game.width/2, 80, 'Super Coin Box',
      {font: '50px Arial', fill: '#ffffff'});
    nameLabel.anchor.setTo(0.5, 0.5);

    // Show the score at the center of the screen
    var scoreLabel = this.add.text(this.game.width/2, this.game.height/2,
      `score: ${this.game.global.score}`,
      {font: '25px Arial', fill: '#ffffff'});
    scoreLabel.anchor.setTo(0.5, 0.5);

    // Explain how to start the game
    var startLabel = this.add.text(this.game.width/2, this.game.height-80,
      'press the up arrow key to start',
      {font: '25px Arial', fill: '#ffffff'});
    startLabel.anchor.setTo(0.5, 0.5);

    // Create the new Phaser keyboard variable: the up arrow key
    // When pressed, call the 'start'
    var upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.add(this.start, this);
  }

  start() {
    // State the actual game
    this.state.start('play');
  }
}