const Projectile = require("./Projectile");
const GameObject = require("../../objects/GameObject");

class Laser extends Projectile {
    constructor(x, y, panel, sprite, speedX = 0, speedY = 0, simulation) {
        super(x, y, panel, sprite, speedX, speedY, simulation);
        this.type = "laser";
        this.facingForward = this.speedX > 0;
    }

    tick(time) {
        super.tick(time);
    }

    move() {
        this.setPos(this.posX + this.speedX, this.posY);
    }

    handleCollisions(collisions) {
        super.handleCollisions(collisions);
        for (let i = 0; i < collisions.length; i++) {
            const collidingObject = collisions[i];
            if (collidingObject.isAlive) {
                switch (collidingObject.type) {
                    case "bomb":
                        collidingObject.destroy();
                        this.destroy();
                        break;
                }
            }
        }
    }
}

module.exports = Laser;
