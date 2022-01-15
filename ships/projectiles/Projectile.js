const GameObject = require("../../objects/GameObject");

class Projectile extends GameObject {
    constructor(x, y, panel, sprite, speedX = 0, speedY = 0, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = "projectile";
        this.speedX = speedX;
        this.speedY = speedY;
        this.created = Date.now();
        this.tickLife = 300;
        this.facingForward = this.speedX <= 0;
        this.isAlive = true;
    }

    setPos(x = 0, y = 0) {
        super.setPos(x, y);
    }

    tick(time) {
        super.tick(time);
        if (time - this.created > this.tickLife) {
            this.deactivate();
        }
        if (this.isActive) {
            this.move();
        }
    }

    move() {
        super.move();
    }
}

module.exports = Projectile;
