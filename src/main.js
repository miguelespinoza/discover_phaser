// We create our only state
var mainState = {

  // Here we add all the functions we need for our state
  // For this project we will just have 3

  preload: function() {
    // Load the player
    game.load.image('player', this.assetImageLoad('player.png'));
    game.load.image('wallV', this.assetImageLoad('wallVertical.png'));
    game.load.image('wallH', this.assetImageLoad('wallHorizontal.png'));
  },

  create: function() {
    this.cursor = game.input.keyboard.createCursorKeys();
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.renderer.renderSession.roundPixels = true;
    game.stage.backgroundColor = '#3498db';

    this.player = game.add.sprite(game.width/2, game.height/2, 'player');
    this.player.anchor.setTo(0.5, 0.5);

    // Tell Phaser that the player will use the Arcade physics engine
    game.physics.arcade.enable(this.player);

    // Add vertical gravity to the player
    this.player.body.gravity.y = 500;

    this.createWorld();
  },

  update: function() {
    game.physics.arcade.collide(this.player, this.walls);

    if (!this.player.inWorld) {
      this.playerDie();
    }

    this.movePlayer();
  },

  createWorld() {
    // Create our group with Arcade physics
    this.walls = game.add.group();
    this.walls.enableBody = true;

    // Create the 10 walls in the group
    game.add.sprite(0, 0, 'wallV', 0, this.walls); // left
    game.add.sprite(480, 0, 'wallV', 0, this.walls); // right

    game.add.sprite(0, 0, 'wallH', 0, this.walls); // top left
    game.add.sprite(300, 0, 'wallH', 0, this.walls); // top right
    game.add.sprite(0, 320, 'wallH', 0, this.walls); // bottom left
    game.add.sprite(300, 320, 'wallH', 0, this.walls); // bottom right

    game.add.sprite(-100, 160, 'wallH', 0, this.walls); // middle left
    game.add.sprite(400, 160, 'wallH', 0, this.walls); // middle right

    var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
    middleTop.scale.setTo(1.5, 1);
    var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
    middleBottom.scale.setTo(1.5, 1);

    // Set all the walls to be immovable
    this.walls.setAll('body.immovable', true);
  },

  playerDie() {
    game.state.start('main');
  },

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
  },

  assetImageLoad(file) {
    return `../assets/image/${file}`
  }
};

// We initialize Phaser
var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

// And we tell Phaser to add and start our 'main' state
game.state.add('main', mainState);
game.state.start('main');