import * as Phaser from 'phaser';

if (module.hot) {
  module.hot.accept(() => {
  });
}

let ball: Phaser.Physics.Arcade.Sprite;
let paddle: Phaser.Physics.Arcade.Sprite;
let violetBricks: Phaser.Physics.Arcade.Group;
let yellowBricks: Phaser.Physics.Arcade.Group;

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
    paddle = this.physics.add.sprite(
      400, // x position
      600, // y position
      'paddle' // key of image for the sprite
    );
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
  }
  update () {
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



