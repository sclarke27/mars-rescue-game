const { EnemyStates } = require("../ships/EnemyShip");
const Sprites = require("../sprites/Sprites");
const GameObject = require("./GameObject");

const HumanStates = {
    free: "free",
    gettingCaptured: "gettingCaptured",
    captured: "captured",
    capturing: "capturing",
    falling: "falling",
    dead: "dead",
};

class Human extends GameObject {
    constructor(x, y, panel, sprite = Sprites.human, simulation) {
        super(x, y, panel, sprite, simulation);
        this.type = "human";
        this.speedX = 0.1;
        this.speedY = 1;
        this.facingForward = this.speedX < 0;
        this.isAlive = true;
        this.capturingShip = null;
        this.setState(HumanStates.free);
    }

    tick(time) {
        super.tick(time);
        switch (this.state) {
            case HumanStates.captured:
                const shipPos = this.capturingShip.getPos();
                this.setPos(shipPos.x + 1, shipPos.y + 4);
                break;
            case HumanStates.capturing:
            case HumanStates.free:
                this.walk();
                break;
            case HumanStates.falling:
                const nextY = this.posY + 2;
                // if (nextY > this.simulation.getGroundLevel() + this.sprite.frameHeight) {
                //     nextY = this.simulation.getGroundLevel() + this.sprite.frameHeight;
                // }
                this.setPos(this.posX, nextY);
                this.setState(HumanStates.free);
                break;
        }
    }

    destroy() {
        this.setState(HumanStates.dead);
        super.destroy();
    }

    walk() {
        // console.info('walk human');
        if (Math.random() > 0.99) {
            this.speedX = this.speedX * -1;
        }
        this.setPos(this.posX + this.speedX, this.posY);
    }

    capture(capturingShip) {
        if (this.state === HumanStates.capturing && this.isAlive) {
            console.info("human | capture");
            this.setState(HumanStates.captured);
            this.capturingShip = capturingShip;
        }
    }

    capturing(capturingShip) {
        if (this.state === HumanStates.free && this.isAlive) {
            console.info("human | capturing");
            this.setState(HumanStates.capturing);
            this.capturingShip = capturingShip;
            return true;
        } else {
            return false;
        }
    }

    release() {
        if (this.state !== HumanStates.free && this.isAlive) {
            console.info("human | release");
            this.setState(HumanStates.falling);
            this.capturingShip = null;
        }
    }

    handleCollisions(collisions) {
        super.handleCollisions(collisions);
        for (let i = 0; i < collisions.length; i++) {
            const collidingObject = collisions[i];
            if (collidingObject.isAlive) {
                switch (collidingObject.type) {
                    case "dropShip":
                        collidingObject.capture(this);
                        this.capture(collidingObject);
                        break;
                    case "bomb":
                        collidingObject.destroy();
                        this.destroy();
                        break;
                }
            }
        }
    }

    setState(newState) {
        console.info(`${this.type} | setState | ${newState}`);
        super.setState(newState);
    }
}

module.exports = Human;
