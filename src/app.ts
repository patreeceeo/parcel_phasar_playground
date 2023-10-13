import * as Phaser from 'phaser';
import type { Types as PhaserTypes } from 'phaser';

if (module.hot) {
  module.hot.accept(() => {
  });
}

let ball: Phaser.Physics.Arcade.Sprite;
let paddle: Phaser.Physics.Arcade.Sprite;
let violetBricks: Phaser.Physics.Arcade.Group;
let yellowBricks: Phaser.Physics.Arcade.Group;
let cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
let gameStarted = false;
let randNum = 0;

class MyScene extends Phaser.Scene {
  preload () {
  this.load.image('ball', 'assets/images/ball_32_32.png');
  this.load.image('paddle', 'assets/images/paddle_128_32.png');
  this.load.image('brick1', 'assets/images/brick1_64_32.png');
  this.load.image('brick2', 'assets/images/brick2_64_32.png');
  this.load.image('brick3', 'assets/images/brick3_64_32.png');
  }
  create () {
    // create a sprite
    ball = this.physics.add.sprite(
      400, // x position
      565, // y position
      'ball' // key of image for the sprite
    );
    ball.setCollideWorldBounds(true);
    ball.setBounce(1)

    paddle = this.physics.add.sprite(
      400, // x position
      600, // y position
      'paddle' // key of image for the sprite
    );
    paddle.setCollideWorldBounds(true);
    paddle.setImmovable(true);
    // create a group
    violetBricks = this.physics.add.group({
      key: 'brick1',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 140,
        stepX: 70
      }
    });
    yellowBricks = this.physics.add.group({
      key: 'brick2',
      repeat: 9,
      immovable: true,
      setXY: {
        x: 80,
        y: 90,
        stepX: 70
      }
    });
    cursors = this.input.keyboard?.createCursorKeys();

    this.physics.add.collider(ball, violetBricks, hitBrick, undefined, this);
    this.physics.add.collider(ball, yellowBricks, hitBrick, undefined, this);
    this.physics.add.collider(ball, paddle, hitPlayer, null, this);
  }
  update () {
    // Check if the ball left the scene i.e. game over
    if (isGameOver(this.physics.world)) {
      // TODO: Show "Game over" message to the player
    } else if (isWon()) {
      // TODO: Show "You won!" message to the player
    } else {
      // Put this in so that the player stays still if no key is being pressed
      setVelocityX(paddle, 0)

      if (cursors?.left.isDown) {
        setVelocityX(paddle, -350)
      } else if (cursors?.right.isDown) {
        setVelocityX(paddle, 350)
      }
      if (!gameStarted) {
        ball.setX(paddle.x);

        if (cursors?.space.isDown) {
          gameStarted = true;
          ball.setVelocityY(-200);
        }
      }
    }
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO, // try WebGL, fallback to Canvas
  parent: 'game', // element ID
  width: 800,
  height: 640,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: MyScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {x: 0, y: 0},
    },
  }
});


function isGameOver(world: Phaser.Physics.Arcade.World) {
  return ball.body && ball.body.y > world.bounds.height;
}

function isWon() {
  return violetBricks.countActive() + yellowBricks.countActive() == 0;
}

function setVelocityX(sprite: Phaser.Physics.Arcade.Sprite, velocity: number) {
  if (sprite.body) {
    sprite.body.velocity.x = velocity;
  }
}
function getVelocityX(sprite: Phaser.Physics.Arcade.Sprite) {
  if (sprite.body) {
    return sprite.body.velocity.x
  } else {
    return 0
  }
}
function setVelocityY(sprite: Phaser.Physics.Arcade.Sprite, velocity: number) {
  if (sprite.body) {
    sprite.body.velocity.y = velocity;
  }
}
function getVelocityY(sprite: Phaser.Physics.Arcade.Sprite) {
  if (sprite.body) {
    return sprite.body.velocity.x
  } else {
    return 0
  }
}

const hitBrick: PhaserTypes.Physics.Arcade.ArcadePhysicsCallback = ((ball: Phaser.Physics.Arcade.Sprite, brick: Phaser.Physics.Arcade.Sprite) => {
  brick.disableBody(true, true);

  if (getVelocityX(ball) == 0) {
    randNum = Math.random();
    if (randNum >= 0.5) {
      setVelocityX(ball, 150);
    } else {
      setVelocityX(ball, -150);
    }
  }
}) as any;

function hitPlayer(ball: Phaser.Physics.Arcade.Sprite, player: Phaser.Physics.Arcade.Sprite) {
  // Increase the velocity of the ball after it bounces
  const ballVelocityY = getVelocityY(ball);
  ball.setVelocityY(ballVelocityY - 5)

  let newXVelocity = Math.abs(getVelocityX(ball) + 5);
  // If the ball is to the left of the player, ensure the X Velocity is negative
  if (ball.x < player.x) {
    ball.setVelocityX(-newXVelocity);
  } else {
    ball.setVelocityX(newXVelocity);
  }
}
