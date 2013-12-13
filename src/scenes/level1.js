Portato.Level = [];
Portato.Level[1] = function(game) {
};
Portato.Level[1].prototype = {
	preload:function(){
		// Load Sprites
		game.load.image('background', 'res/images/background.png');
		game.load.image('ground', 'res/images/platform.png');
		game.load.image('potato', 'res/images/potato.png');
		game.load.spritesheet('player', 'res/images/player.png', 32, 68);
		
		// Load Tiles
		game.load.tilemap('testMap', 'res/maps/Level1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tileset('tiles', 'res/images/tiles.png', 32, 32);
		
		// Load Songs
		game.load.audio('overworldSong', ['res/sounds/mp3/songs/overworld.mp3']);
		game.load.audio('mainmenuSong', ['res/sounds/mp3/songs/mainmenu.mp3']);
		game.load.audio('creditsSong', ['res/sounds/mp3/songs/credits.mp3']);
		
		// Load Sound Effects
		game.load.audio('jumpSound', ['res/sounds/mp3/sfx/jump.mp3']);
		game.load.audio('pickupSound', ['res/sounds/mp3/sfx/pickup.mp3']);
		
	},

	// Define Variables Here
	player:'',
	platforms:'',
	cursors:'',

	potatoes:'',
	music:'',
	score:0,
	scoreText:'',

	facingRight:true,
	jumping:false,

	map:'',
	tileset:'',
	layer:'',
	bg:'',
	
	create:function() {
		
		// Play Music
		//music = game.add.audio('overworldSong',1,true);
		//music.play('',0,1,true);
		
		// Temporary Background
			bg = game.add.sprite(0, 0, 'background');
			bg.fixedToCamera = true;
		
		// Tile sheets
			//game.stage.backgroundColor = '#000';
			map = game.add.tilemap('testMap');
			tileset = game.add.tileset('tiles');
			tileset.setCollisionRange(7, 8, true, true, true, true);
			tileset.setCollisionRange(12, 14, true, true, true, true);
			tileset.setCollisionRange(23, 24, true, true, true, true);
			tileset.setCollisionRange(32, 33, true, true, true, true);
			tileset.setCollisionRange(37, 39, true, true, true, true);
			tileset.setCollisionRange(48, 48, true, true, true, true);
			tileset.setCollisionRange(58, 58, true, true, true, true);
			tileset.setCollisionRange(68, 68, true, true, true, true);
			
			
			layer = {};
			layer[0] = game.add.tilemapLayer(0,0,1024,640, tileset, map, 0);
			layer[0].resizeWorld();
		
		// Player:
			player = game.add.sprite(256, game.world.height - 150, 'player');
			// Physics
			player.body.bounce.y = 0.0;
			player.body.gravity.y = 10;
			
			player.anchor.setTo(0.5, 0.5);
			player.body.collideWorldBounds = true;
			
			// Animations
			player.animations.add('right', [0,1,0,2], 7, true);
			player.animations.add('left', [9,8,9,7],7,true);
			player.animations.add('jumpRight',[3,4],1.5,false);
			player.animations.add('jumpLeft',[7,6],2,false);
		
		// Potatoes
			potatoes = game.add.group();
			
			for (var i = 0; i < 15; i++){
				var potato = potatoes.create(i * 70, 0, 'potato');
				potato.body.gravity.y = 6;
				potato.body.bounce.y = 0.2 + Math.random() * 0.2;
			}
		
			
			layer[1] = game.add.tilemapLayer(0,0,1024,640, tileset, map, 1);
			
		// Camera
			game.camera.follow(player);
		
		// Score
			var textGroup = game.add.group(null);
			scoreText = game.add.text(16,16,'Score NUMBER 2: 0', { fontSize: '32px', fill: '#000'});
			textGroup.add(scoreText);
			
			cursors = game.input.keyboard.createCursorKeys();
	},

	update:function() {
		
		// Collisions
		game.physics.collide(player, layer[0]);
		game.physics.collide(potatoes, layer[0]);
		
		// Overlaps
		game.physics.overlap(player, potatoes, this.collectPotato, null, this);
		
		// Reset player velocity
		player.body.velocity.x = 0;
		
		// Keyboard Controls AWD SPACE + Arrows Keys
		
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || game.input.keyboard.isDown(Phaser.Keyboard.A)){
			
			// Move Left
			player.body.velocity.x = -250;
			
			if (!jumping)
				player.animations.play('left');
			else
				player.animations.play('jumpLeft');
			this.facingRight = false;
			
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)){
			
			// Move Right
			player.body.velocity.x = 250;
			if(!jumping)
				player.animations.play('right');
			else
				player.animations.play('jumpRight');
			this.facingRight = true;
			
		}else{
			// Stand Still
			player.animations.stop();
			
			if (this.facingRight){
				player.frame = 0;
			}else{
				player.frame = 9;
			}
			
		}
		
		if (player.body.touching.down){
			jumping = false;
		}else{
			jumping = true;
		}
		
		// Jumping
		if ((game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.UP)) && !jumping){
			player.body.velocity.y = -450;
		}

	},
	collectPotato:function(player, potato) {
		potato.kill();
		this.score += 1;
		this.scoreText.content = 'Potatoes: ' + this.score;
	}
};
