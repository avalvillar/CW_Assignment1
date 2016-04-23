// JavaScript source code
function Doraemon(game) {
    this.animation = new Animation(ASSET_MANAGER.getAsset("./img/doraemon.png"), 0, 0, 34, 45, 1, 1, true, false);
    this.jumpAnimation = new Animation(ASSET_MANAGER.getAsset("./img/doraemon.png"), 140, 0, 37, 48, 1, 2, false, false);
    this.runAnimation = new Animation(ASSET_MANAGER.getAsset("./img/doraemon.png"), 75, 150, 40, 45, .1, 4, true, false)
    //this.shotAnimaton = new Animation(ASSET_MANAGER.getAsset("./img/doraemon.png"), 0, 90, 37, 45, 1, 2, false, false);
    this.downAnimation = new Animation(ASSET_MANAGER.getAsset("./img/doraemon.png"), 0, 110, 49.5, 45, 1, 2, true, false)
    this.jumping = false;
    this.running = false;
    this.radius = 100;
    this.ground = 400;
    this.speed = 300;
    Entity.call(this, game, 300, 400);
}

Doraemon.prototype = new Entity();
Doraemon.prototype.constructor = Doraemon;

Doraemon.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    //if (this.game.shot) this.shooting = true;
    if (this.game.running) {
        this.running = true;
    }
    if (this.jumping) {
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance = this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime;
        var totalHeight = 200;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;
        var height = totalHeight * (-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
    }
    if (this.shooting) {

    }
    if (this.running) {
        if (!this.game.running) {
            this.running = false;
        }
        if (this.game.right) {
            this.x += this.game.clockTick * this.speed;
            if (this.x > 800) this.x = -100;
        } 
    }
    Entity.prototype.update.call(this);
}

Doraemon.prototype.draw = function (ctx) {
    if (this.jumping) {
        this.jumpAnimation.drawFrame(this.game.clockTick, ctx, this.x - 20, this.y, 3);
    } else if (this.shooting) { /// Wanted to get shooting implemented at some point. 
        this.shotAnimaton.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    } else if (this.running) {
        if (this.game.right) {
            this.runAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        } else {
            this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
        }
    } else if (this.game.down) {
        this.downAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y + 23, 3);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y, 3);
    }
    Entity.prototype.draw.call(this);
}
