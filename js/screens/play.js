game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;
                
                me.levelDirector.loadLevel("Level01");
                // loads the level chosen
                this.resetPlayer(0, 420);
                
                var player = me.pool.pull("player", 0, 420, {});
                me.game.world.addChild(player, 5);
                
                var player = me.pool.pull("player", 0, 420, {});
                me.game.world.addChild(player, 5);
                
                var gameTimerManager = me.pool.pull("gameTimerManager", 0, 0, {});
                // a link to gametimermanager
                me.game.world.addChild(gameTimerManager, 0);
                
                var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
                // link to herodeathmanager
                me.game.world.addChild(heroDeathManager, 0);
                
                var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
                // link to experiencemanager
                me.game.world.addChild(experienceManager, 0);
                
                var SpendGold = me.pool.pull("SpendGold", 0, 0, {});
                // link to spendgold
                me.game.world.addChild(SpendGold, 0);
                
                me.input.bindKey(me.input.KEY.B, "buy");
                //press b to buy
                me.input.bindKey(me.input.KEY.Q, "skill1");
                // press Q to buy skill1
                me.input.bindKey(me.input.KEY.W, "skill2");
                // press W to buy skill2
                me.input.bindKey(me.input.KEY.E, "skill3");
                //press E to buy skill3
                me.input.bindKey(me.input.KEY.RIGHT, "right");
                //press RIGHT to move right
                me.input.bindKey(me.input.KEY.LEFT, "left");
                // press left to move left
                me.input.bindKey(me.input.KEY.SPACE, "jump");
                // press SPACE to jump
                me.input.bindKey(me.input.KEY.A, "attack");
                //press A to attack
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
        
        resetPlayer: function(x, y){
               game.data.player = me.pool.pull("player", x, y, {});
                me.game.world.addChild(game.data.player, 5);
        }
});
