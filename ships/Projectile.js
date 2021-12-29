const GameObject = require('../objects/GameObject');

class Projectile extends GameObject {
    constructor(x, y, panel, sprite, speedX = 0, speedY = 0) {
        super(x, y, panel, sprite);
        this.type = 'projectile';
        this.speedX = speedX;
        this.speedY = speedY;
        this.created = Date.now();
        this.tickLife = 300;
        this.facingForward = this.speedX < 0;
        this.deactivationTimeout = 0;
        this.isAlive = true;
    }

    setPos(x = 0, y = 0) {
        this.posX = x <= 128 ? x : 0;
        this.posX = (this.posX < 0) ? 128 : this.posX;
        this.posY = y;
    }    

    tick(time) {
        super.tick(time);
        if(time - this.created > this.tickLife) {
            this.deactivate();
        } 
        if(this.isActive) {
            this.move();
        }
    }

    move() {
        this.setPos(this.posX + this.speedX, this.posY);
    }

}

module.exports = Projectile;