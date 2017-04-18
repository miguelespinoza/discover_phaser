import Phaser from 'phaser';

export default class extends Phaser.State {
  create() {
    this.cursor = this.input.keyboard.createCursorKeys();

    this.player = this.add.sprite(this.game.width/2, this.game.height/2, 'player');
    this.player.anchor.setTo(0.5, 0.5);

    // Tell Phaser that the player will use the Arcade physics engine
    this.physics.arcade.enable(this.player);

    // Add vertical gravity to the player
    this.player.body.gravity.y = 500;

    this.createWorld();
    this.createPointSystem();
    this.createEnemies();

    this.game.global.score = 0;
  }

  update() {
    this.physics.arcade.collide(this.player, this.walls);
    this.physics.arcade.collide(this.enemies, this.walls);

    if (!this.player.inWorld) {
      this.playerDie();
    }

    this.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
    this.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);

    this.movePlayer();
  }

  createWorld() {
    // Create our group with Arcade physics
    this.walls = this.add.group();
    this.walls.enableBody = true;

    // Create the 10 walls in the group
    this.add.sprite(0, 0, 'wallV', 0, this.walls); // left
    this.add.sprite(480, 0, 'wallV', 0, this.walls); // right

    this.add.sprite(0, 0, 'wallH', 0, this.walls); // top left
    this.add.sprite(300, 0, 'wallH', 0, this.walls); // top right
    this.add.sprite(0, 320, 'wallH', 0, this.walls); // bottom left
    this.add.sprite(300, 320, 'wallH', 0, this.walls); // bottom right

    this.add.sprite(-100, 160, 'wallH', 0, this.walls); // middle left
    this.add.sprite(400, 160, 'wallH', 0, this.walls); // middle right

    var middleTop = this.add.sprite(100, 80, 'wallH', 0, this.walls);
    middleTop.scale.setTo(1.5, 1);
    var middleBottom = this.add.sprite(100, 240, 'wallH', 0, this.walls);
    middleBottom.scale.setTo(1.5, 1);

    // Set all the walls to be immovable
    this.walls.setAll('body.immovable', true);
  }

  createPointSystem() {
    // Display the coin
    this.coin = this.add.sprite(60, 140, 'coin');

    // Add Arcade physics to the coin
    this.physics.arcade.enable(this.coin);

    // Set the anchor point to its center
    this.coin.anchor.setTo(0.5, 0.5);

    // Display the score
    this.scoreLabel = this.add.text(30, 30, 'score: 0',
      { font: '18px Arial', fill: '#ffffff' });

    // Initialize the score variable
    this.game.global.score = 0;
  }

  createEnemies() {
    // Create an enemy group with Arcade physics
    this.enemies = this.add.group();
    this.enemies.enableBody = true;

    // Create 10 enemies in the group with the 'enemy' image
    // Enemies are "dead" by default so they hare not visible in the game
    this.enemies.createMultiple(10, 'enemy');

    // Call 'addEnemy' every 2.2 seconds
    this.time.events.loop(2200, this.addEnemy, this);
  }

  addEnemy() {
    // Get the first dead enemy of the group
    var enemy = this.enemies.getFirstDead();

    // If there isn't any dead enemy, do nothing
    if (!enemy) {
      return;
    }

    // Initialize the enemy

    // Set the anchor point centered at the bottom
    enemy.anchor.setTo(0.5, 1);

    // Put the enemy above the top hole
    enemy.reset(this.game.width/2, 0);

    // Add gravity to see it fall
    enemy.body.gravity.y = 500;

    // makes the enemy move left or right
    enemy.body.velocity.x = 100 * this.rnd.pick([-1, 1]);

    // on hitWall, move opposite direction
    enemy.body.bounce.x = 1;


    // when falling into bottom hole kill the sprite
    enemy.checkWorldBounds = true;
    enemy.outOfBoundsKill = true;
  }

  playerDie() {
    this.state.start('menu');
  }

  takeCoin() {
    // Update the score
    this.game.global.score += 5;
    this.scoreLabel.text = `score: ${this.game.global.score}`;

    // Change the coin position
    this.updateCoin();
  }

  updateCoin() {
    // Store all the possible coin positions in an array
    var coinPosition = [
      {x: 140, y: 60}, {x: 360, y: 60}, // Top row
      {x: 60, y: 140}, {x: 440, y: 140}, // Middle row {x: 130, y: 300}, {x: 370, y: 300} // Bottom row
    ];

    // Remove the current coin position from the array
    // Otherwise the coin could appear at the same spot twice in a row
    for (let i = 0; i < coinPosition.length; i++) {
      if (coinPosition[i].x == this.coin.x) {
        coinPosition.splice(i, 1);
      }
    }

    // Randomly select a position from the array with 'game.rnd.pick'
    let newPosition = this.rnd.pick(coinPosition);

    // Set the new position of the coin
    this.coin.reset(newPosition.x, newPosition.y);
  }

  movePlayer() {
    // left pressed
    if (this.cursor.left.isDown) {
      // Move the player to the left
      // The veolocity is in pixels per second
      this.player.body.velocity.x = -200;
    }

    // right pressed
    else if (this.cursor.right.isDown) {
      this.player.body.velocity.x = 200;
    }

    else {
      this.player.body.velocity.x = 0;
    }

    // up pressed, and player is on the ground
    if (this.cursor.up.isDown && this.player.body.touching.down) {
      // Move the player upward (jump)
      this.player.body.velocity.y = -320;
    }
  }
}