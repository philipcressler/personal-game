/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y , settings]);

        // set gravity to 0
        this.gravity = 0;

        // set the default horizontal and vertical speed
        this.body.setVelocity(0, 0);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // ensure the player is updated even when outside of the viewport
        this.alwaysUpdate = true;


    },

    /**
     * update the entity
     */
    update : function (dt) {

        if(me.input.isKeyPressed('left')){
            this.renderable.flipX(true);
            this.vel.x -= 1;
        } else if (me.input.isKeyPressed('right')) {
            this.renderable.flipX(false);
            this.vel.x += 1;
        } else if (me.input.isKeyPressed('down')) {
            this.body.vel.y += this.body.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('up')) {
            this.body.vel.y -= this.body.accel.y * me.timer.tick;
        } else {
            this.body.vel.x = 0;
            this.body.vel.y = 0;
        }
        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

   /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision : function (response, other) {
        // Make all other objects solid
        return true;
    }
});
