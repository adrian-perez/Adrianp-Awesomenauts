game.PlayerEntity = me.Entity.extend({
    init: function(x, y, settings) {
        this.setSuper(x, y);
        //this statement is referring to the the function instead of saying function all the time
        this.setPlayerTimers();
        this.setAttributes();
        this.type = "PlayerEntity";
        this.setFlags();

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        this.addAnimation();

        this.renderable.setCurrentAnimation("idle");
    },
    setSuper: function(x, y) {
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
    },
    setPlayerTimers: function() {
        this.now = new Date().getTime();
        this.lastHit = this.now;
        this.lastSpear = this.now;
        this.lastAttack = new Date().getTime();

    },
    setAttributes: function() {
        this.health = game.data.playerHealth;
        this.body.setVelocity(game.data.playerMoveSpeed, 20);
        this.attack = game.data.playerAttack;

    },
    setFlags: function() {
        // keeps track of the direction the chracter is going
        this.facing = "right";
        this.dead = false;
        this.attacking = false;
    },
    addAnimation: function() {
// adding the animation to walk
        this.renderable.addAnimation("idle", [78]);
        this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
        // the animation to walk
        this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
        //the animation to attack
    },
    update: function(delta) {
        // i have no idea what this line does.
        this.now = new Date().getTime();
        this.dead = this.checkIfDead();
        this.checkKeyPressesAndMove();
        this.checkAbilityKeys();
        this.setAnimation();
        me.collision.check(this, true, this.collideHandler.bind(this), true);
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    checkIfDead: function() {

        if (this.health <= 0) {
            //making the character die
            return true;
        }
        return false;
    },
    checkKeyPressesAndMove: function() {

        if (me.input.isKeyPressed("right")) {
            this.moveRight();
        } else if (me.input.isKeyPressed("left")) {
            this.moveLeft();
        } else {
            this.body.vel.x = 0;
        }

        if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
            // making the character jump.
            this.jump();

        }

        this.attacking = me.input.isKeyPressed("attack");
        // making the character attack
    },
    
    moveRight: function() {
        // setting the position of X 
        //setVelocity is being mutiplied by me.timer.tick;
        //me.timer.tick is making the character move smoothly
        this.body.vel.x += this.body.accel.x * me.timer.tick;
        // making him move right
        this.facing = "right";
        this.flipX(true);
    },
    
    moveLeft: function() {
        this.facing = "left";
        // making him move left
        this.body.vel.x -= this.body.accel.x * me.timer.tick;
        this.flipX(false);
    },
    
    jump: function() {
        this.jumping = true;
        // making him jump
        this.body.vel.y -= this.body.accel.y * me.timer.tick;
    },
    
    checkAbilityKeys: function(){
      if(me.input.isKeyPressed("skill1")){
         //this.speedBurst();
      }else if(me.input.isKeyPressed("skill2")){
          // making the buy menu say which the skill is
        //this.eatCreep();  
      } else if(me.input.isKeyPressed("skill3")){
         this.throwSpear();
      } 
    },
    
    throwSpear: function(){
        if((this.now-lastSpear) >= game.data.spearTimer*1000 && game.data.ability3 >= 0){
        this.lastCreep = this.now;
        // animation to throw the spear
        var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
        me.game.world.addChild(spear, 10);
    }
        },
    
    setAnimation: function() {
        if (this.attacking) {
            if (!this.renderable.isCurrentAnimation("attack")) {
                //this code is for the character to attack
                this.renderable.setCurrentAnimation("attack", "idle");
                
                // cuurent animation to attack
                //goes back to idle animation
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
            if (!this.renderable.isCurrentAnimation("walk"))
            {
                //making him walk
                this.renderable.setCurrentAnimation("walk");
            }
        } else if (!this.renderable.isCurrentAnimation("attack")) {
            this.renderable.setCurrentAnimation("idle");
        }
    },
    collideHandler: function(response) {
        if (response.b.type === 'EnemyBaseEntity') {
            this.collideWithEnemyBase(response);
        } else if (response.b.type === 'EnemyCreep') {
            this.collideWithEnemyCreep(response);
        }
    },
    collideWithEnemyBase: function(response) {
        var ydif = this.pos.y - response.b.pos.y;
        var xdif = this.pos.x - response.b.pos.x;
        // colliding with the enemy base

//            console.log("xdif " + xdif + "ydif " + ydif);
        console.log(xdif + this.facing);
        if (xdif > -35 && this.facing === 'right' && (xdif < 0)) {
            this.body.vel.x = 0;
        } else if (xdif < 70 && this.facing === 'left' && xdif > 0) {
            this.body.vel.x = 0;
        }

        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer) {
            this.lastHit = this.now;
            response.b.loseHealth(game.data.playerAttack);
        }
    },
    collideWithEnemyCreep: function(response) {
        var xdif = this.pos.x - response.b.pos.x;
        var ydif = this.pos.y - response.b.pos.y;

        this.stopMovement(xdif);

        if (this.checkAttack(xdif, ydif)) {
            this.hitCreep(response);
        }
        ;
    },
    stopMovement: function(xdif) {
        if (xdif > 0) {
            this.pos.x = this.pos.x + 1;
            if (this.facing === "left") {
                // left or right direction
                this.body.vel.x = 0;
            }
        } else {
            this.pos.x = this.pos.x - 1;
            if (this.facing === "right") {
                this.body.vel.x = 0;
            }
        }
    },
    checkAttack: function(xdif, ydif, response) {
        if (this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= game.data.playerAttackTimer
                && (Math.abs(ydif) <= 40) &&
                // checking the attack 
                (((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))
                ) {
            // checking if he moves left
            this.lastHit = this.now;
            // if the creep's health is less than our attack, execute code in if statement
            return true;
        }
        return false;
    },
    hitCreep: function(response) {
        if (response.b.health <= game.data.playerAttack) {
            // adds 1 gold for evvery creep killed 
            game.data.gold += 1;
            // checking the hitpoints on the enemy
            console.log("Current gold:: " + game.data.gold);
        }

        response.b.loseHealth(game.data.playerAttack);
    }
});


