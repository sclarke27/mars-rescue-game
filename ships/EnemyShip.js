const BaseShip = require("./BaseShip");

const EnemyStates = {
    free: "free",
    capturing: "capturing",
    captured: "captured",
    dead: "dead",
};

class EnemyShip extends BaseShip {
    constructor(x, y, panel, sprite, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = "enemyShip";
        this.speedX = 0.05;
        this.speedY = 0.05;
        this.setState(EnemyStates.free);
    }

    create() {
        super.create();
    }

    tick(time) {
        super.tick(time);
        if (this.posY >= 58 && this.isAlive) {
            this.destroy();
        }
    }

    setPos(x = 0, y = 0) {
        this.posX = x <= this.screenSize.width ? x : 0;
        this.posY = y;
    }

    capturing(object) {
        if (this.isActive) {
            this.setState(EnemyStates.capturing);
        }
    }

    capture(object) {
        if (this.isActive) {
            this.setState(EnemyStates.captured);
        }
    }

    release() {
        this.setState(EnemyStates.free);
    }

    handleCollisions(collisions) {
        super.handleCollisions(collisions);
        for (let i = 0; i < collisions.length; i++) {
            const collidingObject = collisions[i];
            if (collidingObject.isAlive) {
                switch (collidingObject.type) {
                    case "laser":
                        collidingObject.destroy();
                        this.destroy();
                        break;
                    case "playerShip":
                        collidingObject.destroy();
                        break;
                }
            }
        }
    }
}

module.exports = { EnemyShip, EnemyStates };
