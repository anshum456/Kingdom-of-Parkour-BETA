function preload() {
  this.load.image("knight", "https://i.imgur.com/cnKW8ly.png")
  this.load.image("floor", "https://i.imgur.com/Vklqhtl.png")
  this.load.image("platformsThatGoUp", "https://i.imgur.com/M2WnWBM.png")
  this.load.image("platformsThatGoDown", "https://i.imgur.com/4vPjy3q.png")
  this.load.image("mudCrystal", "https://i.imgur.com/nboih5L.png")
  this.load.image("mudDrop", "https://i.imgur.com/5mCiDME.png")
  this.load.image("Mudom", "https://i.imgur.com/YRxysAd.png")
  this.load.image("mudBomb", "https://i.imgur.com/1Gd1OX7.png")
  this.load.image("mukPlatform", "https://i.imgur.com/7eENJbX.png")
  this.load.image("mukDownPlatform", "https://i.imgur.com/RzeN6bR.png")
  this.load.image("mukFloor", "https://i.imgur.com/kEtDfHK.png")
                  }

function create() {
  this.physics.world.setBounds(0, 0, 176000, 4000);
this.cameras.main.setBounds(0, 0, 176000, 4000);
  
  this.player = this.physics.add.sprite(50, 600, "knight").setScale(3)
  this.player.setCollideWorldBounds(true)
  this.player.health = 5
  
  this.player.body.setSize(18, 26); // Shrinks the physics box to ignore empty pixels
this.player.body.setOffset(7, 6);
  
  this.player.body.setMaxVelocity(800, 2000); // Prevents gravity from pushing him too deep on high falls
this.player.body.setFriction(0, 0);  
  
  this.cameras.main.startFollow(this.player);

  this.player.setBounce(0.1)
  
  this.floorGroup = this.physics.add.staticGroup();
  
  for (let i = 0; i < 3348; i++) {
    this.floorGroup
        .create(i * 64 + 16, 700, "floor")
        .setScale(3)
        .refreshBody();
}
  
  for (let platforms = 0; platforms < 484; platforms++) {
    let platform = this.physics.add.staticImage(
        1400 + platforms * 496,
        360,
        "platformsThatGoDown"
    ).setScale(3)
    platform.refreshBody()
    
    this.physics.add.collider(this.player, platform)
  }
  
  for (let upPlatforms = 0; upPlatforms < 484; upPlatforms++) {
    let platform7 = this.physics.add.staticImage(
         1600 + upPlatforms * 496,
         300,
         "platformsThatGoUp"
    ).setScale(3)
    platform7.refreshBody()
    
    this.physics.add.collider(this.player, platform7)
  }
  
  for (let mudCrystals = 0; mudCrystals < 144; mudCrystals++) {
    let mudCrystal1 = this.add.image(2000 + mudCrystals * 2000,
        610,
        "mudCrystal"
    ).setScale(2)
  }
  
  this.waterfall = this.add.tileSprite(7000, 250, 128, 500, 'mudDrop').setScale(2);
  this.waterfall.setTileScale(0.4, 0.4);
  
  

 this.mudom = this.physics.add.sprite(288000, 300, 'Mudom');
this.mudom.setScale(5);
this.mudom.setCollideWorldBounds(true);
this.mudom.health = 10;

 this.physics.add.collider(this.mudom, this.floorGroup);
  
  this.bossStarted = false;
  this.mudBombsThrown = 0;
this.mudBomb = null;
  
  this.mudom.setInteractive();

// 2. Set up the click counter on the boss
this.mudom.clicksTaken = 0;

// 3. Listen for pointer (mouse click or screen tap) events on Mudom
this.mudom.on('pointerdown', () => {
    // Only register hits if he is still alive
    if (this.mudom.health > 0) {
        this.mudom.clicksTaken++;
        
        // Take away half his health per click (2 blows total)
        this.mudom.health -= 5; 
        console.log(`Mudom was clicked! Health left: ${this.mudom.health}`);

        // Visual flash to show he took damage
        this.mudom.setTint(0xff5555);
        this.time.delayedCall(1500, () => {
            if (this.mudom && this.mudom.active) this.mudom.clearTint();
        });
      
      if (this.wallCollider) {
                this.physics.world.removeCollider(this.wallCollider);
                console.log("The massive wall has vanished! Path cleared.");
            }

            // 2. Clear out Mudom
            this.mudom.destroy();

        // Check if the 2 clicks killed him early
        if (this.mudom.clicksTaken >= 2 || this.mudom.health <= 0) {
            this.defeatMudom("Defeated by the Knight's blows!");
          
          
        }
      
      this.invisibleWall = this.physics.add.staticSprite(288200, 400, "floor");

// 2. Scale it vertically by 50x to make it completely un-jumpable!
this.invisibleWall.setScale(2, 50); 
this.invisibleWall.refreshBody();

// 3. Keep it hidden from the player
this.invisibleWall.setVisible(false);

// 4. Force the player to collide with it
this.wallCollider = this.physics.add.collider(this.player, this.invisibleWall);
    }
});


  
  this.physics.add.collider(this.player, this.floorGroup);
  
   this.mukFloorGroup = this.physics.add.staticGroup();
  
  for (let mukFloor = 0; mukFloor < 866; mukFloor++) {
    this.mukFloorGroup
        .create(83240 + (mukFloor * 64 + 16), 700, "mukFloor")
        .setScale(1)
        .refreshBody();
}
  
  for (let mukPlatforms = 0; mukPlatforms < 141; mukPlatforms++) {
    let mukPlatform = this.physics.add.staticImage(
        83240 + mukPlatforms * 496,
        360,
        "mukPlatform"
    ).setScale(1)
    mukPlatform.refreshBody()
    
    this.physics.add.collider(this.player, mukPlatform)
  }
  
  for (let downMukPlatforms = 0; downMukPlatforms < 140; downMukPlatforms++) {
    let mukPlatform7 = this.physics.add.staticImage(
         83440 + downMukPlatforms * 496,
         300,
         "mukDownPlatform"
    ).setScale(1)
    mukPlatform7.refreshBody()
  
    this.physics.add.collider(this.player, mukPlatform7)
  }
  this.physics.add.collider(this.player, this.mukFloorGroup)
  
  
  this.add.text(100, 200, "How to Play: use arrows or WASD and defeat bosses with clicks!", {
    fontFamily: "Comic Sans MS",
    fontSize: "32px",
    fill: "#ff3300"
  })
  
  this.add.text(200, 300, "KINGDOM OF PARKOUR: MUDDY HOLLOWS", {
    fontFamily: "Comic Sans MS",
    fontSize: "32px",
    fill: "#442200"
  })
  
   this.add.text(287000, 100, "BEWARE OF MUDOM, MUD BOMB THROWING MENANCE", {
    fontFamily: "AR CARTER",
    fontSize: "32px",
    fill: "#990001"
  })
  
  
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
   if (this.player.x >= 287930 && !this.bossStarted) {
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
    this.player.setVelocityX(160); 
} 
// Move Left using physics velocity
else if (this.cursors.left.isDown) {
    this.player.setVelocityX(-160); 
} 
// Stop instantly when you let go of the keys (No sliding!)
else {
    this.player.setVelocityX(0); 
}

 if (this.cursors.up.isDown && this.player.body.touching.down) {
    this.player.setVelocityY(-260); // 👈 This makes them jump cleanly!
}
  
  this.waterfall.tilePositionY -= 4; 
}

const config = {
  type: Phaser.AUTO,
  height: 4000,
  width: 1400,
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