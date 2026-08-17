function preload() {
  this.load.image("knight", "https://i.imgur.com/cnKW8ly.png")
  this.load.image("floor", "https://i.imgur.com/Vklqhtl.png")
  this.load.image("platformsThatGoUp", "https://i.imgur.com/M2WnWBM.png")
  this.load.image("platformsThatGoDown", "https://i.imgur.com/4vPjy3q.png")
  this.load.image("mudCrystal", "https://i.imgur.com/nboih5L.png")
  this.load.image("mudDrop", "https://i.imgur.com/5mCiDME.png")
  this.load.image("Mudom", "https://i.imgur.com/YRxysAd.png")
  this.load.image("mudBomb", "https://i.imgur.com/1Gd1OX7.png")
                  }

function create() {
  this.physics.world.setBounds(0, 0, 176000, 4000);
this.cameras.main.setBounds(0, 0, 176000, 4000);
  
  this.player = this.physics.add.sprite(50, 600, "knight").setScale(3)
  this.player.setCollideWorldBounds(true)
  this.player.health = 5
  
  this.cameras.main.startFollow(this.player);

  this.player.setBounce(0.1)
  
  this.floorGroup = this.physics.add.staticGroup();
  
  for (let i = 0; i < 55472; i++) {
    this.floorGroup
        .create(i * 64 + 16, 700, "floor")
        .setScale(3)
        .refreshBody();
}
  
  for (let platforms = 0; platforms < 141; platforms++) {
    let platform = this.physics.add.staticImage(
        1400 + platforms * 496,
        360,
        "platformsThatGoDown"
    ).setScale(3)
    platform.refreshBody()
    
    this.physics.add.collider(this.player, platform)
  }
  
  for (let upPlatforms = 0; upPlatforms < 140; upPlatforms++) {
    let platform7 = this.physics.add.staticImage(
         1600 + upPlatforms * 496,
         300,
         "platformsThatGoUp"
    ).setScale(3)
    platform7.refreshBody()
    
    this.physics.add.collider(this.player, platform7)
  }
  
  for (let mudCrystals = 0; mudCrystals < 83; mudCrystals++) {
    let mudCrystal1 = this.add.image(2000 + mudCrystals * 2000,
        610,
        "mudCrystal"
    ).setScale(2)
  }
  
  this.waterfall = this.add.tileSprite(7000, 250, 128, 500, 'mudDrop').setScale(2);
  
  

 this.mudom = this.physics.add.sprite(166416, 300, 'Mudom');
this.mudom.setScale(5);
this.mudom.setCollideWorldBounds(true);
this.mudom.health = 10;

 this.physics.add.collider(this.mudom, this.floorGroup);
  
  this.bossStarted = false;
  this.mudBombsThrown = 0;
this.mudBomb = null;
  
  this.physics.add.collider(this.player, this.floorGroup);
  
  
  const platform1 = this.physics.add.staticImage(200, 600 ,"platformsThatGoUp").setScale(3)
  .refreshBody()
  const platform2 = this.physics.add.staticImage(400, 540, "platformsThatGoUp").setScale(3)
  .refreshBody()
  const platform3 = this.physics.add.staticImage(600, 480, "platformsThatGoUp").setScale(3)
  .refreshBody()
  const platform4 = this.physics.add.staticImage(800, 420, "platformsThatGoUp").setScale(3)
  .refreshBody()
  const platform5 = this.physics.add.staticImage(1000, 360, "platformsThatGoUp").setScale(3)
  .refreshBody()
  const platform6 = this.physics.add.staticImage(1200, 300, "platformsThatGoUp").setScale(3)
  .refreshBody()
  
  this.physics.add.collider(this.player, platform1)
  this.physics.add.collider(this.player, platform2)
  this.physics.add.collider(this.player, platform3)
  this.physics.add.collider(this.player, platform4)
  this.physics.add.collider(this.player, platform5)
  this.physics.add.collider(this.player, platform6)
  
  this.cursors = this.input.keyboard.createCursorKeys();
  
 
}

function update() {
   if (this.player.x >= 166416 && !this.bossStarted) {
    this.bossStarted = true;

    
    this.time.addEvent({
        delay: 1000,
        repeat: 4,
        callback: () => {
            const mudBomb = this.physics.add.sprite(
                this.mudom.x,
                this.mudom.y,
                'mudBomb'
            );

            const angle = Phaser.Math.Angle.Between(
                this.mudom.x,
                this.mudom.y,
                this.player.x,
                this.player.y
            );

            this.physics.velocityFromRotation(
                angle,
                100,
                mudBomb.body.velocity
            );

            this.mudBombsThrown++;
          
          this.physics.add.collider(this.player, mudBomb, (player, bomb) => {
            bomb.destroy(); // Remove the fireball instantly
            player.health -= 1; // Take away 1 health point
            
            if (player.health <= 0) {
                player.body.enable = false; // Stop the player
                this.time.delayedCall(1000, () => {
                    this.scene.restart(); // Restart level after 1 second
                });
            }
        });
      }
      });
}
  
  if (this.cursors.right.isDown) {
    this.player.x += 5;
  }

  if (this.cursors.left.isDown) {
    this.player.x -= 5;
  }

 if (this.cursors.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-320); // 👈 This makes them jump cleanly!
}
  
  this.waterfall.tilePositionY -= 4; 
}

const config = {
  type: Phaser.AUTO,
  height: 4000,
  width: 1000,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
  
  scene: {
    create,
    preload,
    update
  },
};
new Phaser.Game(config);