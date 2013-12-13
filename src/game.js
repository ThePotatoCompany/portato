var game = new Phaser.Game(1024, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload(){
	
	// Load Sprites
	game.load.image('background', 'res/images/background.png');
	game.load.image('ground', 'res/images/platform.png');
	game.load.image('potato', 'res/images/potato.png');
	game.load.spritesheet('player', 'res/images/player.png', 32, 68);
	
	// Load Tiles
	game.load.tilemap('testMap', 'res/maps/test.json', null, Phaser.Tilemap.TILED_JSON);
	game.load.tileset('tiles', 'res/images/tiles.png', 32, 32);
	
	// Load Songs
	game.load.audio('overworldSong', ['res/sounds/mp3/songs/overworld.mp3']);
	game.load.audio('mainmenuSong', ['res/sounds/mp3/songs/mainmenu.mp3']);
	game.load.audio('creditsSong', ['res/sounds/mp3/songs/credits.mp3']);
	
	// Load Sound Effects
	game.load.audio('jumpSound', ['res/sounds/mp3/sfx/jump.mp3']);
	game.load.audio('pickupSound', ['res/sounds/mp3/sfx/pickup.mp3']);
	
}

// Define Variables Here
var player;
var platforms;
var cursors;

var potatoes;
var music;
var score = 0;
var scoreText;

var facingRight = true;
var jumping = false;

var map;
var tileset;
var layer;

function create() {
	
	// Keyboard input
	cursors = game.input.keyboard.createCursorKeys();
	
	// Play Music
	music = game.add.audio('overworldSong',1,true);
	//music.play('',0,1,true);
	
	// World Stuff
	//game.world.setBounds(0, 0, 1400, 640);
	
	// Temporary Background
		game.add.sprite(0, 0, 'background');
	
	// Tile sheets
		game.stage.backgroundColor = '#000';
		map = game.add.tilemap('testMap');
		tileset = game.add.tileset('tiles');
		tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
		
		layer = game.add.tilemapLayer(0,0,1440,640, tileset, map, 0);
		layer.resizeWorld();
		//layer.immovable = true;
	
	/* Platforms:
		platforms = game.add.group();
		var ground = platforms.create(0, game.world.height-64, 'ground');
		ground.scale.setTo(2,2);a
		ground.body.immovable = true;
		
		var ledge = platforms.create(600, 400, 'ground');
		ledge.body.immovable = true;
		ledge = platforms.create(-200, 250, 'ground');
		ledge.body.immovable = true;
	*/
	
	// Player:
		player = game.add.sprite(32, game.world.height - 150, 'player');
		// Physics
		player.body.bounce.y = 0.1;
		player.body.gravity.y = 10;
		//player.body.collideWorldBounds = true;
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
			potato.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
	
	// Camera
		game.camera.follow(player);
	
	// Score
		var textGroup = game.add.group(null);
		scoreText = game.add.text(16,16,'Score: 0', { fontSize: '32px', fill: '#000'});
		textGroup.add(scoreText);
}

function update() {
	
	// Collisions
	game.physics.collide(player, layer);
	game.physics.collide(potatoes, layer);
	
	// Overlaps
	game.physics.overlap(player, potatoes, collectPotato, null, this);
	
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
		facingRight = false;
		
	} else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || game.input.keyboard.isDown(Phaser.Keyboard.D)){
		
		// Move Right
		player.body.velocity.x = 250;
		if(!jumping)
			player.animations.play('right');
		else
			player.animations.play('jumpRight');
		facingRight = true;
		
	}else{
		// Stand Still
		player.animations.stop();
		
		if (facingRight){
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

}


function collectPotato(player, potato) {
	potato.kill();
	score += 1;
	scoreText.content = 'Potatoes: ' + score;
}
















