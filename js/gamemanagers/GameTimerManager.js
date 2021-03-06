game.GameTimerManager = Object.extend({
    init: function(x, y, settings) {
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false;
        this.alwaysUpdate = true;
    },
    update: function() {
        this.now = new Date().getTime();
        this.goldTimerCheck();
        this.creepTimerCheck();

        return true;
    },
    goldTimerCheck: function() {
        if (Math.round(this.now / 1000) % 20 === 0 && ((this.now - this.lastCreep) >= 1000)) {
            game.data.gold += 1;
            console.log("Curret gold: " + game.data.gold);
            // console.log(this.now + " " + this.lastCreep);
        }
    },
    creepTimerCheck: function() {
        console.log("creepTimer");
        if (Math.round(this.now / 1000) % 10 === 0 && ((this.now - this.lastCreep) >= 1000)) {
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
            me.game.world.addChild(creepe, 5);
        }
    }
});

