game.SpendEXP = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

        me.input.bindKey(me.input.KEY.F1, "F1");
        // the F1 button can buy something
        me.input.bindKey(me.input.KEY.F2, "F2");
        // the F2 button can buy something
        me.input.bindKey(me.input.KEY.F3, "F3");
        // the F3 button can buy something
        me.input.bindKey(me.input.KEY.F4, "F4");
        // the F4 button can buy something
        me.input.bindKey(me.input.KEY.F5, "F5");
        // the F5 button can buy something
        var exp1cost = ((Number(game.data.exp1) + 1) * 10);

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Graffiti", 26, "white");
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
                // pressing the F1-F5 will do different actions
                this.font.draw(renderer.getContext(), "CURRENT EXP: ", this.pos.x, this.pos.y + 50);
                // the current exp 
                this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
                // increaes gold production
                this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD", this.pos.x, this.pos.y + 150);
                // adds starting gold
                this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE: ", this.pos.x, this.pos.y + 200);
                //to buy the increase attack damage
                this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH", this.pos.x, this.pos.y + 250);
                //to buy the increase starting healtth
            }

        })));

        this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
            if (action === "F1") {

            } else if (action === "F2") {

            } else if (action === "F3") {

            } else if (action === "F4") {

            } else if (action === "F5") {
                
                me.state.change(me.state.PLAY);
            }
        });

   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.F1, "F1");
        me.input.unbindKey(me.input.KEY.F2, "F2");
        me.input.unbindKey(me.input.KEY.F3, "F3");
        me.input.unbindKey(me.input.KEY.F4, "F4");
        me.input.unbindKey(me.input.KEY.F5, "F5");
        me.event.unsubscribe(this.handler);
    }
});



