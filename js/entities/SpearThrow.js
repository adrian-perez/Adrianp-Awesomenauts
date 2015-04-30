game.SpearThrow = me.Entity.extend({
    // the action to throw your spear
init: function(x, y, settings, facing) {
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
    this.attack = game.data.ability3*3;
    this.type = "spear";
    //help throwing the spear
    this.facing = facing;
},
        update: function(delta) {
            if(this.facing === "left"){
                // facing leftt 
            //this.now = new Date().getTime();
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }else{
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
        }
        
            me.collision.check(this, true, this.collisionHandler.bind(this), true);
            
            this.body.update(delta);
           
            this._super(me.Entity, "update", [delta]);
            //this.health = this.health - damage;
            return true;
        },
        collisionHandler: function(response) {
            if (response.b.type === 'EnemyBase' || response.b.type==='EnemyCreep') {
                // spear hurts enemies
                response.b.loseHealth(this.attack);
                me.game.world.removeChild(this);
            }
        }
});
