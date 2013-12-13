Portato.MainMenu = function(game){};
Portato.MainMenu.prototype = {
	preload:function(){
		game.load.image('potato', 'res/images/potato.png');
		game.load.image('background', 'res/images/background.png');
	},
	create:function(){
		game.add.sprite(0, 0, 'background');
		game.add.text(game.world.centerX-160,game.world.centerY-20,'MAIN MENU YAAAY', { fontSize: '32px', fill: '#000'});
		button = game.add.button(game.world.centerX-46, game.world.centerY+20, 'potato', function(){game.state.start('Level1');}, this);
	}
};