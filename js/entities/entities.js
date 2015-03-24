game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "player",
                width: 64,
                height: 64,
                spritewidth: "64",
                spriteheight: "64",
                getShape: function() {
                    return(new me.Rect(0, 0, 64, 64)).toPolygon();
                }
            }]);

        this.body.setVelocity(5, 20);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        // the animation to walk
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 74], 80);
        //the animation to attack
        this.renderable.setCurrentAnimation("idle");

    },
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {

            // setting the position of X 
            //setVelocity is being mutiplied by me.timer.tick;
            //me.timer.tick is making the character move smoothly
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);

        } else if(me.input.isKeyPressed("left")) {
             this.body.vel.x -= this.body.accel.x * me.timer.tick;
             this.flipX(false);
        }else {
            this.body.vel.x = 0;
        }
        
        if(me.input.isKeyPressed("jump") && !this.jumping && !this.falling){
            this.jumping = true;
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
            
        }

 if (me.input.isKeyPressed("attack")) {
            console.log(!this.renderable.isCurrentAnimation("attack"));
            if (!this.renderable.isCurrentAnimation("attack")) {
                //this code is for the character to attack
                this.renderable.setCurrentAnimation("attack", "idle");
            // cuurent animation to attack
        //goes back to idle animation
        this.renderable.setAnimationFrame();
    }
 }   


      else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        } else {
            this.renderable.setCurrentAnimation("idle");
        }


        if (me.input.isKeyPressed("attack")) {
            console.log(!this.renderable.isCurrentAnimation("attack"));
            if (!this.renderable.isCurrentAnimation("attack")) {
                //this code is for the character to attack
                this.renderable.setCurrentAnimation("attack", "idle");
            }// cuurent animation to attack
        }//goes back to idle animation
        this.renderable.setAnimationFrame();

        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    }



});

game.PlayerBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        this.type = "PlayerBaseEntity";
        console.log("init");
        this.type = "PlayerBaseEntity";

        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");
    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {

    }

});

game.EnemyBaseEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                width: 100,
                height: 100,
                spritewidth: "100",
                spriteheight: "100",
                getShape: function() {
                    return (new me.Rect(0, 0, 100, 70)).toPolygon();
                }
            }]);
        this.broken = false;
        this.health = 10;
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        this.type = "EnemyBaseEntity";

        this.renderable.addAnimation("idle", [0]);
        this.renderable.addAnimation("broken", [1]);
        this.renderable.setCurrentAnimation("idle");


    },
    update: function(delta) {
        if (this.health <= 0) {
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        }
        this.body.update(delta);

        this._super(me.Entity, "update", [delta]);
        return true;
    },
    onCollision: function() {


    }

});
    