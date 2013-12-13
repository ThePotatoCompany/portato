var game = new Phaser.Game(1024, 640, Phaser.AUTO, 'Game');

// Add the States
game.state.add('MainMenu', new Portato.MainMenu());
game.state.add('Level1', new Portato.Level[1]());	

//begin game
game.state.start('MainMenu');