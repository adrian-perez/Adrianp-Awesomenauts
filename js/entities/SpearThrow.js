game.SpearThrow = me.Entity.extend({
     init: function(x, y, settings){
          this._super(me.Entity, 'init', [x, y, {
                image: "creep1",
                width: 48,
                height: 48,
                spritewidth: "48",
                spriteheight: "48",
                getShape: function() {
                    return (new me.Rect(0, 0, 48, 48)).toPolygon();
                }
            }]);
        this.alwaysUpdate = true;
        this.body.setVelocity(8, 0);

        this.type = "spear";
     },
     
     
    update:  function(delta) {
        this.now = new Date().getTime();

        this.body.vel.x -= this.body.accel.x * me.timer.tick;

        me.collision.check(this, true, this.collisionHandler.bind(this), true);

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
 this.health = this.health - damage;

        return true;
         return true;
     }
});
