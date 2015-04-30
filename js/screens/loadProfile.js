game.LoadProfile = me.ScreenObject.extend({
    /**	
     *  action to perform on state change
     */
    onResetEvent: function() {
        me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO
        document.getElementById("input").style.visibility = "visible";
        document.getElementById("load").style.visibility = "visible";

        me.input.unbindKey(me.input.KEY.B);
        // press B 
        me.input.unbindKey(me.input.KEY.Q);
        //press Q
        me.input.unbindKey(me.input.KEY.E);
        // press E
        me.input.unbindKey(me.input.KEY.W);
        // pess W
        me.input.unbindKey(me.input.KEY.A);
        //press A

        me.game.world.addChild(new (me.Renderable.extend({
            init: function() {
                this._super(me.Renderable, 'init', [270, 240, 300, 50]);
                this.font = new me.Font("Graffiti", 26, "white");
                // the font and color of text
            },
            draw: function(renderer) {
                this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD", this.pos.x, this.pos.y);
               // these words will appear on the screen

            }

        })));

   },
    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        document.getElementById("input").style.visibility = "hidden";
        document.getElementById("load").style.visibility = "hidden";

    }
});
