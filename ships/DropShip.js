const { EnemyShip, EnemyStates } = require("./EnemyShip");
const Sprites = require("../sprites/Sprites");
const Sprite = require("../sprites/Sprite");

class DropShip extends EnemyShip {
    constructor(x, y, panel, sprite, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = "dropShip";
        this.humanToCapture = null;
        this.sprite = new Sprite(Sprites.enemies.dropShip.ship);
        this.explosionSprite = new Sprite(Sprites.enemies.dropShip.explosion);
        this.deactivationTimeout = 240;
    }

    tick(time) {
        super.tick(time);
        if (this.posY >= 58 && this.isAlive) {
            this.destroy();
        }
        if (this.humanToCapture !== null) {
            if (this.posY < 0 && this.state == EnemyStates.captured) {
                this.humanToCapture.destroy();
                this.destroy();
            }
        }

        for (let h = 0; h < this.simulation.humans.length; h++) {
            const human = this.simulation.humans[h];
            const humanPos = human.getPos();
            const enemyPos = this.getPos();
            const distanceY = humanPos.y - enemyPos.y;
            const distanceX = humanPos.x - enemyPos.x;

            if (distanceX < 10 && distanceX > -10 && this.isActive && human.isActive) {
                if (this.state == "free" && human.getState() == "free") {
                    if (human.capturing(this)) {
                        this.capturing(human);
                    }
                }
            }
        }
    }

    destroy() {
        this.setState(EnemyStates.dead);
        super.destroy();
    }

    move() {
        if (this.isAlive) {
            switch (this.state) {
                case EnemyStates.free:
                    this.setPos(this.posX, this.posY + this.speedY);
                    break;

                case EnemyStates.capturing:
                    this.setPos(this.posX, this.posY + this.speedY);
                    this.trackHuman();
                    break;

                case EnemyStates.captured:
                    this.setPos(this.posX, this.posY - this.speedY);
                    break;
            }
        }
    }

    trackHuman() {
        if (this.state == EnemyStates.capturing && this.isAlive && this.isActive) {
            const humanPos = this.humanToCapture.getPos();
            if (this.posX < humanPos.x) {
                this.setPos(this.posX + this.speedX, this.posY);
            }
            if (this.posX > humanPos.x) {
                this.setPos(this.posX - this.speedX, this.posY);
            }
        }
    }

    destroy() {
        if (this.isAlive) {
            super.destroy();
            this.release();
        }
    }

    capturing(human) {
        if (this.state !== EnemyStates.capturing && this.isAlive && this.isActive) {
            console.info("enemy | capturing");
            super.capturing(human);
            this.humanToCapture = human;
        }
    }

    capture(human) {
        if (this.state !== EnemyStates.captured && this.isAlive && this.isActive) {
            console.info("enemy | capture");
            super.capture(human);
            this.humanToCapture = human;
        }
    }

    release() {
        super.release();
        if (this.humanToCapture !== null) {
            console.info("enemy | release");
            this.humanToCapture.release();
            this.humanToCapture = null;
        }
    }

    setState(newState) {
        console.info(`${this.type} | setState | ${newState}`);
        super.setState(newState);
    }
}

module.exports = DropShip;
